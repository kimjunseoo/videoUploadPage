import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, maxLength: 100 },
    createdAt: { type: Date, required: true, default: Date.now },
    fileUrl: { type: String, required: true},
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Comment"
    }]
});

const Video = mongoose.model("Video", videoSchema);
//if error, change => const Video = mongoose.model("videos", videoSchema);
export default Video;