import express from "express";
import { get, merge } from "lodash";
import keys from "../config/keys";

import { getUserBySessionToken } from "../db/users";

export const isAdmin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const currentUserRoles = get(req, "identity.roles") as
            | string[]
            | undefined;

        if (!currentUserRoles?.includes("admin")) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string | undefined;

        if (!currentUserId) {
            return res.sendStatus(403);
        }

        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const sessionToken = req.cookies[keys.authCookieKey];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isEmailVerified = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const isEmailVerified = req.cookies[keys.verifyEmailCookieKey];

        if (!isEmailVerified) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
