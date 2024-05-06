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
            .limit(pageSize + 1);

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
                "_id,createdAt,_user,leaveType,totalDay,startDate,endDate,updatedAt,__v"
            );
        }

        const leaves = await leavesQuery.exec();

        if (!leaves || leaves.length === 0) {
            return res.sendStatus(403);
        }

        let response;

        if (stats) {
            const stat = generateStats(leaves);
            response = { ...stat };
        } else {
            response = leaves;
        }

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

const getStatusQuery = (status: string) => {
    switch (status) {
        case "pending":
            return { field: "hodStatus", value: "pending" };
        case "approved":
            return { field: "hodStatus", value: "approved" };
        case "rejected":
            return { field: "hodStatus", value: "rejected" };
        default:
            return null;
    }
};

const generateStats = (leaves: any[]) => {
    const stat = {
        total: leaves.length,
        rejected: leaves.filter((leaf) => leaf.hodStatus === "rejected").length,
        approved: leaves.filter(
            (leaf) =>
                leaf.hodStatus === "approved" || leaf.adminStatus === "approved"
        ).length,
        pending: leaves.filter(
            (leaf) =>
                leaf.hodStatus === "pending" || leaf.adminStatus === "pending"
        ).length,
    };
    return stat;
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

export const getLeaveStats = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { userId } = req.query;

        const selectQuery =
            "_id,createdAt,_user,leaveType,totalDay,startDate,endDate,updatedAt";

        const stats = {
            total: 0,
            rejected: 0,
            approved: 0,
            pending: 0,
        };

        let leavesQuery = getLeaves().select(selectQuery);

        if (userId) {
            leavesQuery = leavesQuery.where("_user").equals(userId);
        }

        const stat = await leavesQuery.exec();

        return res.status(200).json(stat);
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
