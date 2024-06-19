import express from "express";

import {
    getAllUsers,
    getUsersByIds,
    getUser,
    addUser,
    deleteUser,
    updateUser,
} from "../controllers/users";
import { isAuthenticated, isAdmin } from "../middlewares";

export default (router: express.Router) => {
    router.get("/users/byIds", isAuthenticated, isAdmin, getUsersByIds);
    router.get("/users", isAuthenticated, isAdmin, getAllUsers);
    router.get("/users/:id", isAuthenticated, getUser);
    router.post("/users", isAuthenticated, isAdmin, addUser);
    router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser);
    router.patch("/users/:id", isAuthenticated, isAdmin, updateUser);
};
