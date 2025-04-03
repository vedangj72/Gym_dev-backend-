import mongoose from "mongoose";
import { user_uuid } from "../Utils/general.js";
import { getCurrentUnix } from "../Utils/unix.js";

const UserModelSchema = new mongoose.Schema({
    _id: {
        type: String,
        trim: true,
        default: user_uuid
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    gym_name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    branches: [{
        type:String,
        required:true
    }],
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    created_at: {
        type: String,
        trim: true,
        default: getCurrentUnix()
    }
})

const AdminModel = mongoose.model("Admin", UserModelSchema)
export default AdminModel