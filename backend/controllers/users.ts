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
        const { page = 1, pageSize = 5, byRole }: PaginationProps = req.query;

        let usersQuery = getUsers()
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        if (byRole) {
            const roles = byRole.split(",");
            usersQuery = usersQuery.where("roles").in(roles);
        }

        const users = await usersQuery.exec();

        let hasMore = false;
        if (users.length > pageSize) {
            hasMore = true;
            users.pop();
        }

        const totalUsersCount = await getUsers().countDocuments();

        let totalPages = Math.ceil(users.length / pageSize);
        if (hasMore) {
            totalPages++;
        }

        while (users.length < pageSize) {
            const additionalUsers = await getUsers()
                .skip(users.length)
                .limit(pageSize - users.length)
                .exec();
            users.push(...additionalUsers);
        }

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        let selectQuery = "";

        if (req.query.fields) {
            const requestedFields = req.query.fields.toString();

            selectQuery = requestedFields
                .split(",")
                .map((field) => `-${field.trim()}`)
                .join(" ");
        }

        const user = await getUserById(id).select(selectQuery);

        if (!user) {
            res.sendStatus(400);
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getUsersByIds = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { ids } = req.query;

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
