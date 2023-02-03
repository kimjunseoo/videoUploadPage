import "./db.js";
import express from "express";
import morgan from "morgan";
import globalRouter from "./Routers/globalRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { loginCheck } from "./middlewares.js";
import multer from "multer";
import apiRouter from "./Routers/apiRouter.js";

const app = express();

const logger = morgan("dev");


app.set("view engine", "pug");
app.set("views", process.cwd() + "/Views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: "nobodymustdontknow",
        resave:false,
        saveUninitialized:false,
        store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/youtubeClone" }),
        cookie:{maxAge:(3.6e+6)*24}
    })
);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use(loginCheck);
app.use("default", morgan);
app.use("/", globalRouter);
app.use("/api", apiRouter);

app.listen(3000, () => { console.log("***** Server On *****")});