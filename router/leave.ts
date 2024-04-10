import express from "express";

import {
    getAllLeaves,
    getLeave,
    addLeave,
    deleteLeave,
    updateLeave,
} from "../controllers/leave";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get("/leaves", isAuthenticated, getAllLeaves);
    router.get("/leaves/:id", isAuthenticated, getLeave);
    router.post("/leaves", isAuthenticated, addLeave);
    router.delete("/leaves/:id", isAuthenticated, deleteLeave);
    router.patch("/leaves/:id", isAuthenticated, updateLeave);
};
