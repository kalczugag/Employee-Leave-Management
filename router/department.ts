import express from "express";

import {
    getAllDepartments,
    getDepartment,
    addDepartment,
    updateDepartment,
    deleteDepartment,
} from "../controllers/departments";
import { isAdmin, isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get("/departments", isAuthenticated, getAllDepartments);
    router.get("/departments/:id", isAuthenticated, getDepartment);
    router.post("/departments", isAuthenticated, isAdmin, addDepartment);
    router.delete(
        "/departments/:id",
        isAuthenticated,
        isAdmin,
        deleteDepartment
    );
    router.patch(
        "/departments/:id",
        isAuthenticated,
        isAdmin,
        updateDepartment
    );
};
