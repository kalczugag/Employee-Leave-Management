import express from "express";

import { register, login, getUser } from "../controllers/authentication";

export default (router: express.Router) => {
    router.get("/auth/current_user", getUser);
    router.post("/auth/register", register);
    router.post("/auth/login", login);
};
