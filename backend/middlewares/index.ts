import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isAdmin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { byRole } = req.query;

        const safeOperations = ["/api/users"];
        const isSafeOperation = safeOperations.includes(req.path);

        if (byRole || isSafeOperation) {
            return next();
        }

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
        const sessionToken = req.cookies[process.env.AUTH_COOKIE_KEY!];

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
        const isEmailVerified =
            req.cookies[process.env.VERIFY_EMAIL_COOKIE_KEY!];

        if (!isEmailVerified) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
