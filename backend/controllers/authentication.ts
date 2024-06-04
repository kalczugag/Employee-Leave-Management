import express from "express";
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

        res.cookie(
            process.env.AUTH_COOKIE_KEY!,
            user.authentication.sessionToken,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000,
            }
        );

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
        const sessionToken = req.cookies[process.env.AUTH_COOKIE_KEY!];

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

        if (!cookies[process.env.AUTH_COOKIE_KEY!]) {
            return res.sendStatus(403);
        }

        res.clearCookie(process.env.AUTH_COOKIE_KEY!);

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

        res.cookie(process.env.VERIFY_EMAIL_COOKIE_KEY!, hashedEmail, {
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

        if (!cookies[process.env.VERIFY_EMAIL_COOKIE_KEY!]) {
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

        res.clearCookie(process.env.VERIFY_EMAIL_COOKIE_KEY!);

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

// this is for profile/settings to change own password by authenticated user
export const changePassword = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const sessionToken = req.cookies[process.env.AUTH_COOKIE_KEY!];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: "Fields can't be empty" });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Password doesn't match" });
        }

        if (currentPassword === newPassword) {
            return res
                .status(400)
                .json({ message: "Current password and new are the same" });
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
            return res.status(403).json({ message: "Wrong current password" });
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
