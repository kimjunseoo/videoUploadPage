import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true },
})



userSchema.pre("save", async function(){
    //password save, after encrypt
    this.password = await bcrypt.hash(this.password, 5);
    console.log(this.password);
})

const User = mongoose.model("User", userSchema);

export default User;
