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
        const { page = 0, pageSize = 5 }: PaginationProps = req.query;
        let selectQuery = "";

        if (req.query.fields) {
            const requestedFields = req.query.fields.toString();

            selectQuery = requestedFields
                .split(",")
                .map((field) => `-${field.trim()}`)
                .join(" ");
        }

        let leaveTypesQuery = getLeaveTypes()
            .select(selectQuery)
            .skip(page * pageSize)
            .limit(pageSize);

        const [leaveTypes, totalLeaveTypesCount] = await Promise.all([
            leaveTypesQuery.exec(),
            getLeaveTypes().countDocuments(),
        ]);

        if (!leaveTypes || leaveTypes.length === 0) {
            return res.status(403).json({ msg: "No data" });
        }

        return res
            .status(200)
            .json({ ...{ leaveTypes }, totalLeaveTypesCount });
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

        if (!id) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        const leaveType = await getLeaveTypeById(id);

        if (!leaveType) {
            return res.status(404).json({ msg: "Leave type not found" });
        }

        return res.status(200).json(leaveType);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
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
