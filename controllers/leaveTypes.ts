import express from "express";

import {
    getLeaveTypes,
    createLeaveType,
    getLeaveTypeById,
    deleteLeaveTypeById,
} from "../db/leaveType";

export const getAllLeaveTypes = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const leaveTypes = await getLeaveTypes();

        return res.status(200).json(leaveTypes);
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

        if (!name || !shortName || !details || !active) {
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

        const deletedDepartment = await deleteLeaveTypeById(id);

        return res.json(deletedDepartment);
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

        if (!name || !shortName || !details || !active) {
            return res.sendStatus(400);
        }

        const department = await getLeaveTypeById(id);

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
