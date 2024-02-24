import express from "express";

import { getAllUsers, deleteUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
    router.get("/users", isAuthenticated, getAllUsers);
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
};
