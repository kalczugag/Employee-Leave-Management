import express from "express";

import {
    getLeaveTypes,
    createLeaveType,
    getLeaveTypeById,
    deleteLeaveTypeById,
} from "../db/leaveType";

interface PaginationProps {
    page?: number;
    pageSize?: number;
}

export const getAllLeaveTypes = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { page = 1, pageSize = 5 }: PaginationProps = req.query;
        let selectQuery = "";

        if (req.query.fields) {
            const requestedFields = req.query.fields.toString();

            selectQuery = requestedFields
                .split(",")
                .map((field) => `-${field.trim()}`)
                .join(" ");
        }

        const leaveTypes = await getLeaveTypes()
            .select(selectQuery)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        return res.status(200).json(leaveTypes);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getLeaveType = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;

        const leaveType = await getLeaveTypeById(id);

        return res.status(200).json(leaveType);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const addLeaveType = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { name, shortName, details, active } = req.body;

        if (!name) {
            return res.sendStatus(400);
        }

        const leaveType = await createLeaveType({
            name,
            shortName,
            details,
            active,
        });

        return res.status(200).json(leaveType);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteLeaveType = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;

        const deletedLeaveType = await deleteLeaveTypeById(id);

        return res.json(deletedLeaveType);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateLeaveType = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const { name, shortName, details, active } = req.body;

        const leaveType = await getLeaveTypeById(id);

        if (!leaveType) {
            return res.sendStatus(400);
        }

        leaveType!.set("name", name);
        leaveType!.set("shortName", shortName);
        leaveType!.set("details", details);
        leaveType!.set("active", active);
        await leaveType!.save();

        return res.status(200).json(leaveType).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
