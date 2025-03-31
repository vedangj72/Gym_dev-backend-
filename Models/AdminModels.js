import mongoose from "mongoose";
import { user_uuid } from "../Utils/general.js";
import { getCurrentUnix } from "../Utils/unix.js";

const UserModelSchema=new mongoose.Schema({
    _id:{
        type:String,
        trim:true,
        default:user_uuid
    },
    name:{
        type :String ,
        trim:true,
        require:true
    },
    age:{
        type:String,
        trim:true,
        require:true
    },
    address:{
        type : String ,
        trim:true,
        require:true
    },
    gym_name:{
        type : String ,
        trim:true,
        require:true
    },
    phone:{
        type : String ,
        trim:true,
        require:true
    },
    email:{
        type : String ,
        trim:true,
        require:true,
        unique:true
    },
    password:{
        type : String ,
        trim:true,
        require:true
    },
    created_at:{
       type:String,
       trim:true,
       default:getCurrentUnix() 
    }
})

const AdminModel= mongoose.model("User",UserModelSchema)
export default AdminModel