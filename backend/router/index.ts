import express from "express";

import authentication from "./authentication";
import users from "./users";
import department from "./department";
import leaveType from "./leaveType";
import leave from "./leave";
import email from "./email";
import statistics from "./statistics";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    department(router);
    leaveType(router);
    leave(router);
    email(router);
    statistics(router);

    return router;
};
