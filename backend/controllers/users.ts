import express from "express";
import mongoose from "mongoose";

import {
    deleteUserById,
    getUserById,
    getUsers,
    createUser,
    updateUserById,
} from "../db/users";
import { random, authentication } from "../helpers";

interface PaginationProps {
    page?: number;
    pageSize?: number;
    byRole?: string;
}

export const getAllUsers = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { page = 0, pageSize = 5, byRole }: PaginationProps = req.query;

        let usersQuery = getUsers()
            .skip(page * pageSize)
            .limit(pageSize);

        if (byRole) {
            const roles = byRole.split(",");
            usersQuery = usersQuery.where("roles").in(roles);
        }

        const [users, totalUsersCount] = await Promise.all([
            usersQuery.exec(),
            getUsers().countDocuments(),
        ]);

        if (!users || users.length === 0) {
            return res.status(403).json({ msg: "No data" });
        }

        return res.status(200).json({ ...{ users }, totalUsersCount });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        let selectQuery = "";

        if (req.query.fields) {
            const requestedFields = req.query.fields.toString();

            selectQuery = requestedFields
                .split(",")
                .map((field) => `-${field.trim()}`)
                .join(" ");
        }

        const user = await getUserById(id).select(selectQuery);

        console.log("xd", user);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getUsersByIds = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { ids: idsString } = req.query;

        let ids: string[] = [];

        if (typeof idsString === "string") {
            ids = idsString!.split(",");
        }

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: "IDs array is required" });
        }

        let selectQuery = "";

        if (req.query.fields) {
            const requestedFields = req.query.fields.toString();
            selectQuery = requestedFields
                .split(",")
                .map((field) => `-${field.trim()}`)
                .join(" ");
        }

        const uniqueIds = await getUsers().distinct("_id", {
            _id: { $in: ids },
        });

        const users = await getUsers()
            .select(selectQuery)
            .find({ _id: { $in: uniqueIds } });

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const addUser = async (req: express.Request, res: express.Response) => {
    try {
        const data = req.body;

        if (
            !data.firstName ||
            !data.lastName ||
            !data.birthDate ||
            !data.email ||
            !data.password
        ) {
            res.sendStatus(400);
        }

        const salt = random();
        const newUser = await createUser({
            ...data,
            authentication: {
                password: authentication(salt, data.password),
            },
        });

        console.log(newUser);

        return res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);
        console.log(deletedUser?.toObject());

        return res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const values = req.body;

        const updatedUser = await updateUserById(id, values);
        console.log(updateUser);

        return res.status(200).json(updatedUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
