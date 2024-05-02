import express from "express";
import { get } from "lodash";

import {
    getLeaves,
    createLeave,
    getLeaveById,
    deleteLeaveById,
} from "../db/leave";

interface PaginationProps {
    page?: number;
    pageSize?: number;
    status?: "pending" | "approved" | "rejected";
    userId?: string;
}

export const getAllLeaves = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const {
            page = 1,
            pageSize = 5,
            status,
            userId,
        }: PaginationProps = req.query;
        let selectQuery = "";
        console.log(status, userId);

        if (req.query.fields) {
            const requestedFields = req.query.fields.toString();

            selectQuery = requestedFields
                .split(",")
                .map((field) => `-${field.trim()}`)
                .join(" ");
        }

        let leavesQuery = getLeaves()
            .select(selectQuery)
            .skip(page * pageSize)
            .limit(pageSize + 1);

        if (userId) {
            leavesQuery = leavesQuery.where("_user").equals(userId);
        }

        if (status === "pending") {
            leavesQuery = leavesQuery.where("hodStatus").equals("pending");
        } else if (status === "approved") {
            leavesQuery = leavesQuery.where("hodStatus").equals("approved");
        } else if (status === "rejected") {
            leavesQuery = leavesQuery.where("hodStatus").equals("rejected");
        }

        const leaves = await leavesQuery.exec();

        return res.status(200).json(leaves);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getLeave = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const leaves = await getLeaveById(id);

        return res.status(200).json(leaves);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const addLeave = async (req: express.Request, res: express.Response) => {
    try {
        const {
            leaveType,
            totalDay,
            startDate,
            endDate,
            hodStatus,
            adminStatus,
        } = req.body;

        if (!leaveType || !totalDay || !startDate || !endDate) {
            return res.sendStatus(400);
        }

        const currentUserId = get(req, "identity._id") as string | undefined;

        if (!currentUserId) {
            return res.sendStatus(403);
        }

        const leave = await createLeave({
            _user: currentUserId,
            leaveType,
            totalDay,
            startDate,
            endDate,
            hodStatus,
            adminStatus,
        });

        return res.status(200).json(leave);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteLeave = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;

        const deletedLeave = await deleteLeaveById(id);

        return res.json(deletedLeave);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateLeave = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const {
            leaveType,
            totalDay,
            startDate,
            endDate,
            hodStatus,
            adminStatus,
        } = req.body;

        const leave = await getLeaveById(id);

        if (!leave) {
            return res.sendStatus(400);
        }

        leave!.set("leaveType", leaveType);
        leave!.set("totalDay", totalDay);
        leave!.set("startDate", startDate);
        leave!.set("endDate", endDate);
        leave!.set("hodStatus", hodStatus);
        leave!.set("hodStatus", hodStatus);
        leave!.set("adminStatus", adminStatus);
        await leave!.save();

        return res.status(200).json(leave).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
