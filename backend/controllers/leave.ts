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
    stats?: boolean;
    extended?: boolean;
}

export const getAllLeaves = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const {
            page = 0,
            pageSize = 5,
            status,
            userId,
            stats,
        }: PaginationProps = req.query;

        let selectQuery = "";

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
            .limit(pageSize);

        if (userId) {
            leavesQuery = leavesQuery.where("_user").equals(userId);
        }

        if (status) {
            const statusQuery = getStatusQuery(status);
            if (statusQuery) {
                leavesQuery = leavesQuery
                    .where(statusQuery.field)
                    .equals(statusQuery.value);
            }
        }

        if (stats) {
            leavesQuery = leavesQuery.select(
                "-_id -createdAt -_user -leaveType -totalDay -startDate -endDate -updatedAt"
            );
        }

        const [leaves, totalLeavesCount] = await Promise.all([
            leavesQuery.exec(),
            getLeaves().countDocuments(),
        ]);

        if (!leaves || leaves.length === 0) {
            return res.status(403).json({ msg: "No data" });
        }

        let response;

        if (stats) {
            const stat = generateStats(leaves);
            response = { ...stat };
        } else {
            response = { leaves };
        }

        return res.status(200).json({ ...response, totalLeavesCount });
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};

const getStatusQuery = (status: string) => {
    switch (status) {
        case "pending":
            return { field: "status", value: "pending" };
        case "approved":
            return { field: "status", value: "approved" };
        case "rejected":
            return { field: "status", value: "rejected" };
        default:
            return null;
    }
};

const generateStats = (leaves: any[]) => {
    const stat = {
        total: leaves.length,
        rejected: leaves.filter((leaf) => leaf.status === "rejected").length,
        approved: leaves.filter((leaf) => leaf.status === "approved").length,
        pending: leaves.filter((leaf) => leaf.status === "pending").length,
    };
    return stat;
};

export const getLeave = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        const leave = await getLeaveById(id);

        if (!leave) {
            return res.status(404).json({ msg: "Leave not found" });
        }

        return res.status(200).json(leave);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const addLeave = async (req: express.Request, res: express.Response) => {
    try {
        const { leaveType, totalDay, startDate, endDate, status } = req.body;

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
            status,
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
        const { leaveType, totalDay, startDate, endDate, status } = req.body;

        const leave = await getLeaveById(id);

        if (!leave) {
            return res.sendStatus(400);
        }

        leave!.set("leaveType", leaveType);
        leave!.set("totalDay", totalDay);
        leave!.set("startDate", startDate);
        leave!.set("endDate", endDate);
        leave!.set("status", status);
        await leave!.save();

        return res.status(200).json(leave).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
