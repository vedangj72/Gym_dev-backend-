import { StatusCodes } from "http-status-codes";
import AdminModel from "../../Models/AdminModels.js";
import { CustomError } from "../../Utils/error.js";
import { responseGenerator } from "../../Utils/general.js";
import EquipmentModel from "../../Models/EquipmentModel.js";


// Methord : POST
// EndPoints : /Equipment/:admin_id
// Work: To Create new Equipment (user) for the gym

export const createEquipments=async(req,res)=>{
    try {
        const {equipment_name, equipment_description,equipment_last_mantainance_date,}=req.body
        const {admin_id}=req.params
        // branch id depending on the query if having multiple branches
        const {branch}=req.query 
        
        const admin= await AdminModel.findOne({_id:admin_id})

        if(!admin){
            throw new CustomError("Admin is missing ")
        }
        const response= await EquipmentModel.create({
            equipment_name,
            equipment_description,
            equipment_last_mantainance_date,
            admin_id,
            branch_id:branch
        })

        return res.status(StatusCodes.OK).send(
            responseGenerator(
                response,
                StatusCodes.OK,
                "Equipment added to the Gym",
                "success"
            )
        )

    } catch (error) {
            if (error instanceof CustomError) {
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .send(responseGenerator({}, StatusCodes.BAD_REQUEST, error.message, 0));
            }
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(
                    responseGenerator(
                        {},
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        error.message || "Internal Server Error",
                        0
                    )
                );
        }
    }
    
    
 // Methord : POST
// EndPoints : /Equipment/:admin_id
// Work: To Create new Equipment (user) for the gym

export const getEquipmentById=async(req,res)=>{
    try {
        const {admin_id}=req.params
        const {branch}=req.query

        const admin= await EquipmentModel.find({admin_id,branch_id:branch})

        if(!admin){
            throw new CustomError("Missing the admin data")
        }

        return res.status(StatusCodes.OK).send(
            responseGenerator(
                admin,
                StatusCodes.OK,
                "Here is the list of the equipment that you have",
                "Success"
            )
        )
    } catch (error) {
        if (error instanceof CustomError) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send(responseGenerator({}, StatusCodes.BAD_REQUEST, error.message, 0));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(
                responseGenerator(
                    {},
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    error.message || "Internal Server Error",
                    0
                )
            );
    }
}
