import express from "express";

import {
    register,
    login,
    getUser,
    logout,
    verifyEmail,
    resetPassword,
} from "../controllers/authentication";

export default (router: express.Router) => {
    router.get("/auth/current_user", getUser);
    router.get("/auth/logout", logout);
    router.post("/auth/register", register);
    router.post("/auth/login", login);
    router.post("/auth/verify", verifyEmail);
    router.post("/auth/reset", resetPassword);
};
