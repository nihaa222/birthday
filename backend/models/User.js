import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: String, required: true},
    message: {type: String, required: true},
    identity: {type: String, required: true},
});

const User = mongoose.model("User", userSchema);
export default User;