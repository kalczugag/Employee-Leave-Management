import express from "express";
import keys from "../config/keys";

import {
    getUserByEmail,
    createUser,
    getUserBySessionToken,
    updateUserById,
} from "../db/users";
import { random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select(
            "+authentication.salt +authentication.password"
        );

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(
            user.authentication?.salt ?? "",
            password
        );

        if (user.authentication?.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(
            salt,
            user._id.toString()
        );

        await user.save();

        const userObject = user.toObject();

        res.cookie(keys.authCookieKey, user.authentication.sessionToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res
            .status(200)
            .json({ user: userObject, isAuthenticated: true })
            .end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, firstName, lastName, birthDate } = req.body;

        if (!email || !password || !firstName || !lastName || !birthDate) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            firstName,
            lastName,
            birthDate,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json({ user, isAuthenticated: true }).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies[keys.authCookieKey];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const user = await getUserBySessionToken(sessionToken);

        if (!user) {
            return res.sendStatus(403);
        }

        const userObject = user.toObject();

        return res
            .status(200)
            .json({ user: userObject, isAuthenticated: true })
            .end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const logout = (req: express.Request, res: express.Response) => {
    try {
        const cookies = req.cookies;

        if (!cookies[keys.authCookieKey]) {
            return res.sendStatus(403);
        }

        res.clearCookie(keys.authCookieKey);

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const verifyEmail = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        const salt = random();
        const hashedEmail = authentication(salt, email);

        res.cookie(keys.verifyEmailCookieKey, hashedEmail, {
            maxAge: 900000,
        });

        if (!existingUser) {
            return res.sendStatus(400);
        }

        return res.status(200).json(email);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

// this is for sign in page using OTP (not existing now)
export const resetPassword = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.sendStatus(400);
        }

        const cookies = req.cookies;

        if (!cookies[keys.verifyEmailCookieKey]) {
            return res.sendStatus(403);
        }

        const salt = random();
        const hashedPassword = authentication(salt, password);

        await updateUserById(user._id.toString(), {
            authentication: {
                salt,
                password: hashedPassword,
            },
        });

        res.clearCookie(keys.verifyEmailCookieKey);

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

// this is for profile/settings to chagne own password by authenticated user
export const changePassword = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const sessionToken = req.cookies[keys.authCookieKey];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).send("Fields can't be empty");
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).send("Password doesn't match");
        }

        if (currentPassword === newPassword) {
            return res
                .status(400)
                .send("Current password and new are the same");
        }

        const user = await getUserBySessionToken(sessionToken).select(
            "+authentication.salt +authentication.password"
        );

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(
            user.authentication?.salt ?? "",
            currentPassword
        );

        if (expectedHash !== user.authentication?.password) {
            return res.status(403).send("Wrong current password");
        }

        const salt = random();
        const hashedPassword = authentication(salt, newPassword);

        await updateUserById(user!._id.toString(), {
            authentication: {
                salt,
                password: hashedPassword,
            },
        });

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
