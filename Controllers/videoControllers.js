import Video from "../Models/video";
import Comment from "../Models/comment";

export const getVideoUpload = (req, res) => {
    return res.render("videoUpload.pug", { pageTitle: "Video Upload"})
}

export const postVideoUpload = async (req, res) => {
    const { path: fileUrl } = req.file;
    const { title, description } = req.body;
    try {
        await Video.create({
            title: title,
            description: description,
            fileUrl: fileUrl,
        });
        return res.redirect("/");
    } catch(error) {
        return res.redirect("/upload", { pageTitle: "Upload", errorMessage: error});
    }
}

export const getVideoDetail = async (req, res) => {
    const videoId = req.params.id;
    const video = await Video.findById({ _id: videoId }).populate("comments");
    console.log(video);
    return res.render("videoDetail.pug", { pageTitle: "Video Detail", video} )
}

export const getEditVideo = async (req, res) => {
    const videoId = req.params.id;
    const video = await Video.findById({ _id: videoId });
    return res.render("editVideo.pug", { pageTitle: "Edit Video", video});
}

export const postEditVideo = async (req, res) => {
    const videoId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    const video = await Video.exists({ _id: videoId });
    if(!video){
        return res.render("editVideo.pug", { pageTitle: "Edit Video", errorMessage:"Error! video could not found ",video});
    }

    console.log("Video exist : ", video);
    console.log("change title:", title);
    console.log("change desc:", description);

    await Video.findByIdAndUpdate(videoId, {
        title: title,
        description: description,
    });

    
    return res.redirect(`/videos/${videoId}`);
}

export async function getSearch(req, res){
    const searchKeyword = req.query.searchKeyword;
    let videos = [];
    if(searchKeyword){
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${searchKeyword}`, "i"),
            },
        })
        return res.render("search.pug", { pageTitle: "Search Video", videos })
    };
    return res.render("search.pug", { pageTitle: "Search Video", videos })
} 


export const createComment = async (req, res) => {
    const videoId = req.params.id;
    const commentText = req.body.comment;
    const user = req.session.user;

    const video = await Video.findById(videoId);
    if(!video){
        return res.sendStatus(404);
    }

    const comment = await Comment.create({
        text: commentText,
        writer: user,
        correspondingVideo: videoId,
    })
    video.comments.push(comment._id);
    video.save();

    return res.sendStatus(201);
}