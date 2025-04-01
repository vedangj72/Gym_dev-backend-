import mongoose from "mongoose";
import { user_uuid } from "../Utils/general.js";
import { getCurrentUnix } from "../Utils/unix.js";

const BranchesModelSchema= new mongoose.Schema({
    _id:{
        type:String,
        trim:true,
        default:user_uuid
    },
    branch_name:{
        type:String,
        required:true,
        trim:true,
    },
    branch_location:{
        type:String,
        required: true,
        trim: true
    },
    admin_id:{
        type:String,
        required:true,
        trim:true,
    },
    created_at:{
        type:String,
        required:true,
        default:getCurrentUnix()
    }
})

const BranchModel= mongoose.model("Branch",BranchesModelSchema)
export default BranchModel