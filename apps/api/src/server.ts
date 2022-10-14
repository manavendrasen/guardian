import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import setConfig from "./config/config";

import errorHandler from "./middlewares/error.middleware";

import {
    AUTH_ROUTE,
    BASE_ROUTE,
    CONFIG_ROUTE,
    PROJECT_ROUTE,
    SECRET_ROUTE,
    USER_ROUTE,
} from "./constants/routes";

import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import configRouter from "./routes/config.route";
import projectRouter from "./routes/project.route";
import secretRouter from "./routes/secret.route";

dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const config = setConfig(process.env.NODE_ENV || "DEVELOPMENT");

const HOST = config.HOST || "localhost";
const PORT = config.PORT || 5000;

// app
const app = express();

app.use(function (req, res, next) {
    console.log("Requested path: %s", req.path);
    next();
});

// Body parser
app.use(express.json());

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

app.use(`${BASE_ROUTE}${AUTH_ROUTE}`, authRouter);
app.use(`${BASE_ROUTE}${USER_ROUTE}`, userRouter);
app.use(`${BASE_ROUTE}${CONFIG_ROUTE}`, configRouter);
app.use(`${BASE_ROUTE}${PROJECT_ROUTE}`, projectRouter);
app.use(`${BASE_ROUTE}${SECRET_ROUTE}`, secretRouter);

// Test
app.get(`${BASE_ROUTE}`, (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the API V1",
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${HOST}:${PORT}`
    );
});
// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    // server.close(() => process.exit(1));
});
