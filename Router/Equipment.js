import { Router } from "express";
import { createEquipments, deleteEquipmentById, deleteMultipleEquipments, getEquipmentById, updateEquipmentDetailsById } from "../Controller/Equipments/index.js";
import { verifyAdmin } from "../Middleware/auth.js";


const equipmentRouter=Router()

equipmentRouter.post("/:branch_id",verifyAdmin,createEquipments)

equipmentRouter.get("/:branch_id",verifyAdmin,getEquipmentById)

equipmentRouter.delete("/:branch_id",verifyAdmin,deleteMultipleEquipments)

equipmentRouter.delete("/:branch_id/:equipment_id",verifyAdmin,deleteEquipmentById)


equipmentRouter.put("/:branch_id/:equipment_id",verifyAdmin,updateEquipmentDetailsById)



export default equipmentRouter