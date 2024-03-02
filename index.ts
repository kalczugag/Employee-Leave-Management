import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import keys from "./config/keys";

import router from "./router";

const app = express();

app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});

mongoose.Promise = Promise;
mongoose.connect(keys.mongoURI);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/api", router());

if (process.env.NODE_ENV === "production") {
    const clientBuildPath = path.join(__dirname, "../client/build");

    app.use(
        express.static(clientBuildPath, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    );

    app.get("*", (req, res) => {
        res.sendFile(path.join(clientBuildPath, "index.html"));
    });
}
