import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    writer: { type: String, required: true, default: "Unknown" },
    correspondingVideo : { type: mongoose.Schema.Types.ObjectId, required: true, ref: "videos"},
    createdAt: { type: Date, required: true, default: Date.now()}
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;