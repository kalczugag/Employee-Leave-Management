import express from "express";
import path from "path";

const app = express();

if (process.env.NODE_ENV === "production") {
    const clientBuildPath = path.join(__dirname, "../client/build");

    app.use(
        express.static(clientBuildPath, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    );

    app.get("*", (req, res) => {
        res.sendFile(path.join(clientBuildPath, "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
