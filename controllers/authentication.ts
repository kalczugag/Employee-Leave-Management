import express from "express";
import keys from "../config/keys";

import { getUserByEmail, createUser, getUserBySessionToken } from "../db/users";
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
            domain: keys.defaultDomain,
            path: "/",
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
