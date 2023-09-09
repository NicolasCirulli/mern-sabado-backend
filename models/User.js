import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    image: { type: String },
    password: { type: String, required: true },
    country: { type: String }
})

const User = mongoose.model( 'User', userSchema )

export default User
