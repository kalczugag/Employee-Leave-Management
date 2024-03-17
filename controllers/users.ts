import express from "express";

import { deleteUserById, getUserById, getUsers, createUser } from "../db/users";
import { random, authentication } from "../helpers";

export const getAllUsers = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const users = await getUsers();

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
        //add more data to update
        const { id } = req.params;
        const { firstName, lastName } = req.body;

        if (!firstName || lastName) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        user!.set("firstName", firstName);
        user!.set("lastName", lastName);
        await user!.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
