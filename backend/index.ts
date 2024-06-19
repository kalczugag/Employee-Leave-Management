import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import router from "./router";

const app = express();

app.use(
    cors({
        credentials: true,
    })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "500kb" }));

if (!process.env.DATABASE) {
    throw new Error("DATABASE environment variable is not set");
}
const mongo_url = process.env.DATABASE;
mongoose.Promise = Promise;
mongoose.connect(mongo_url);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/api", router());

if (process.env.NODE_ENV === "production") {
    const clientBuildPath = path.join(__dirname, "../../frontend/build");

    app.use(
        express.static(clientBuildPath, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    );

    app.get("*", (req, res) => {
        res.sendFile(path.join(clientBuildPath, "index.html"));
    });
}

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
