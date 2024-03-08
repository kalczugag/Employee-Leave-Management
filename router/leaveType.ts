import express from "express";

import {
    getAllLeaveTypes,
    getLeaveType,
    addLeaveType,
    deleteLeaveType,
    updateLeaveType,
} from "../controllers/leaveTypes";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get("/leave-types", isAuthenticated, getAllLeaveTypes);
    router.get("/leave-types/:id", isAuthenticated, getLeaveType);
    router.post("/leave-types", isAuthenticated, addLeaveType);
    //add isAdmin middleware to protect routes below
    router.delete("/leave-types/:id", isAuthenticated, deleteLeaveType);
    router.patch("/leave-types/:id", isAuthenticated, updateLeaveType);
};
