import express from "express";

import {
    getAllLeaveTypes,
    getLeaveType,
    addLeaveType,
    deleteLeaveType,
    updateLeaveType,
} from "../controllers/leaveTypes";
import { isAuthenticated, isAdmin } from "../middlewares";

export default (router: express.Router) => {
    router.get("/leave-types", isAuthenticated, getAllLeaveTypes);
    router.get("/leave-types/:id", isAuthenticated, getLeaveType);
    router.post("/leave-types", isAuthenticated, isAdmin, addLeaveType);
    router.delete(
        "/leave-types/:id",
        isAuthenticated,
        isAdmin,
        deleteLeaveType
    );
    router.patch("/leave-types/:id", isAuthenticated, isAdmin, updateLeaveType);
};
