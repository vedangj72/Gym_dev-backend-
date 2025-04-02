import mongoose from "mongoose";
import { user_uuid } from "../Utils/general.js";
import { getCurrentUnix } from "../Utils/unix.js";

const EquipmentModelSchema= new mongoose.Schema({
    _id:{
        type:String,
        trim:true,
        default:user_uuid
    },
    equipment_name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    equipment_description:{
        type:String,
        trim:true
    },
    // required the unix value from the frontend
    equipment_last_mantainance_date:{
        type:String,
        required: true,
        trim: true
    },
    admin_id:{
        type:String,
        required:true,
        trim:true,
    },
    branch_id:{
      type:String,
      trim:true
    },
    created_at:{
        type:String,
        required:true,
        default:getCurrentUnix()
    }
})

const EquipmentModel= mongoose.model("Equipment",EquipmentModelSchema)
export default EquipmentModel