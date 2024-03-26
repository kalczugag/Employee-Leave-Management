import express from "express";

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
}

export const getAllUsers = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { page = 1, pageSize = 5 }: PaginationProps = req.query;

        const users = await getUsers()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

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

        return res.status(200).json(updatedUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
