import express from "express";

import {
    getAllDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
} from "../controllers/departments";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get("/departments", isAuthenticated, getAllDepartments);
    router.post("/departments", isAuthenticated, addDepartment);
    //add isAdmin middleware to protect routes below
    router.delete("/departments/:id", isAuthenticated, deleteDepartment);
    router.patch("/departments/:id", isAuthenticated, updateDepartment);
};
