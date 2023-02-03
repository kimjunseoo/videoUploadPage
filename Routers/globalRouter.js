import express from "express";
import { getJoin, getLogin, getLogout, getProfile, postJoin, postLogin, postProfile } from "../Controllers/userControllers";
import { getEditVideo, getSearch, getVideoDetail, getVideoUpload, postEditVideo, postSearch, postVideoUpload } from "../Controllers/videoControllers";
import { videoUpload } from "../middlewares";
import Video from "../Models/video";

const globalRouter = express.Router();

const handleHome = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc"})
    return res.render("home.pug", { pageTitle: "Home", videos });
}

globalRouter.get("/", handleHome);
globalRouter.route("/videos/:id([0-9a-f]{24})").get(getVideoDetail);
globalRouter.route("/videos/:id([0-9a-f]{24})/edit").get(getEditVideo).post(postEditVideo)
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.route("/logout").get(getLogout);
globalRouter.route("/upload").get(getVideoUpload).post(videoUpload.single("videoFile"), postVideoUpload);
globalRouter.route("/my-profile").get(getProfile).post(postProfile);
globalRouter.route("/search").get(getSearch);


export default globalRouter;
