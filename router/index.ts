import express from "express";

import authentication from "./authentication";
import users from "./users";
import department from "./department";
import leaveType from "./leaveType";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    department(router);
    leaveType(router);

    return router;
};
