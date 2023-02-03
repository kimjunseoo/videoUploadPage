import multer from "multer";

export const loginCheck = (req, res, next) => {
    res.locals.loginState = Boolean(req.session.loginState);
    res.locals.user = req.session.user;
    next();
}

export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
        fieldSize: 999999999,
    },
})

