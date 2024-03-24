import express from "express";

import {
    getDepartments,
    createDepartment,
    getDepartmentById,
    deleteDepartmentById,
} from "../db/department";

export const getAllDepartments = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        let selectQuery = "";

        if (req.query.fields) {
            const requestedFields = req.query.fields.toString();

            selectQuery = requestedFields
                .split(",")
                .map((field) => `-${field.trim()}`)
                .join(" ");
        }

        const departments = await getDepartments().select(selectQuery);

        return res.status(200).json(departments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getDepartment = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;

        const department = await getDepartmentById(id);

        return res.status(200).json(department);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const addDepartment = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { name, shortName, details, active } = req.body;

        if (!name) {
            return res.sendStatus(400);
        }

        const department = await createDepartment({
            name,
            shortName,
            details,
            active,
        });

        return res.status(200).json(department);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteDepartment = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;

        const deletedDepartment = await deleteDepartmentById(id);

        return res.json(deletedDepartment);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateDepartment = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const { name, shortName, details, active } = req.body;

        const department = await getDepartmentById(id);

        if (!department) {
            return res.sendStatus(400);
        }

        department!.set("name", name);
        department!.set("shortName", shortName);
        department!.set("details", details);
        department!.set("active", active);
        await department!.save();

        return res.status(200).json(department).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
