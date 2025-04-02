import { Router } from "express";
import { createEquipments, getEquipmentById } from "../Controller/Equipments/index.js";
import { verifyAdmin } from "../Middleware/auth.js";


const equipmentRouter=Router()

equipmentRouter.post("/:admin_id",verifyAdmin,createEquipments)

equipmentRouter.get("/:admin_id",verifyAdmin,getEquipmentById)


export default equipmentRouter