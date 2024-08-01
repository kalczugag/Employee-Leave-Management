import express from "express";

import {
    getDepartments,
    createDepartment,
    getDepartmentById,
    deleteDepartmentById,
} from "../db/department";

interface PaginationProps {
    page?: number;
    pageSize?: number;
}

export const getAllDepartments = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { page = 0, pageSize = 5 }: PaginationProps = req.query;
        let selectQuery = "";

        if (req.query.fields) {
            const requestedFields = req.query.fields.toString();

            selectQuery = requestedFields
                .split(",")
                .map((field) => `-${field.trim()}`)
                .join(" ");
        }

        let departmentsQuery = getDepartments()
            .select(selectQuery)
            .skip(page * pageSize)
            .limit(pageSize);

        const [departments, totalDepartmentsCount] = await Promise.all([
            departmentsQuery.exec(),
            getDepartments().countDocuments(),
        ]);

        if (!departments || departments.length === 0) {
            return res.status(403).json({ msg: "No data" });
        }

        return res
            .status(200)
            .json({ ...{ departments }, totalDepartmentsCount });
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

        if (!id) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        const department = await getDepartmentById(id);

        if (!department) {
            return res.status(404).json({ msg: "Department type not found" });
        }

        return res.status(200).json(department);
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
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
        const { name, shortName, details, head, active } = req.body;

        const department = await getDepartmentById(id);

        if (!department) {
            return res.sendStatus(400);
        }

        department!.set("name", name);
        department!.set("shortName", shortName);
        department!.set("details", details);
        department!.set("head", head);
        department!.set("active", active);
        await department!.save();

        return res.status(200).json(department).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
