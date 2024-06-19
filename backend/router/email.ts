import express from "express";

import { sendMessage } from "../controllers/email";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.post("/message", isAuthenticated, sendMessage);
};
