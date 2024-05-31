import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { sendEmail } from "./services/nodemailer";
import { smtpConfig } from "./config/smtpConfig";

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
app.use(bodyParser.json({ limit: "500kb" }));

const server = http.createServer(app);
server.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});

const emailOptions = {
    from: "test <youremail@gmail.com>",
    to: "kalczugag@gmail.com",
    subject: "Nodemailer is unicode friendly ✔",
    text: "Hello to myself!",
    html: "<p><b>Hello</b> to myself!</p>",
};
sendEmail(emailOptions, smtpConfig).catch((err: any) => {
    console.error("Error sending email:", err);
});

mongoose.Promise = Promise;
mongoose.connect(keys.mongoURI);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/api", router());

if (process.env.NODE_ENV === "production") {
    const clientBuildPath = path.join(__dirname, "../../frontend");

    app.use(
        express.static(clientBuildPath, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    );

    app.get("*", (req, res) => {
        res.sendFile(path.join(clientBuildPath, "index.html"));
    });
}
