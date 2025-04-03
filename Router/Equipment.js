import { Router } from "express";
import { createEquipments, getEquipmentById } from "../Controller/Equipments/index.js";
import { verifyAdmin } from "../Middleware/auth.js";


const equipmentRouter=Router()

equipmentRouter.post("/",verifyAdmin,createEquipments)

equipmentRouter.get("/",verifyAdmin,getEquipmentById)


export default equipmentRouter