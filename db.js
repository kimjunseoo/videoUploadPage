import mongoose from "mongoose";

mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', false);

mongoose.connect("mongodb://127.0.0.1:27017/youtubeClone")

const db = mongoose.connection;

db.on("error", (error)=>{ console.log("DB on error" + error) });
db.once("open", ()=>{ console.log("*****Connect to DB*****")})