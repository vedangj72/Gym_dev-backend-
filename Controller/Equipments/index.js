import { StatusCodes } from "http-status-codes";
import AdminModel from "../../Models/AdminModels.js";
import { CustomError } from "../../Utils/error.js";
import { responseGenerator } from "../../Utils/general.js";
import EquipmentModel from "../../Models/EquipmentModel.js";


// Methord : POST
// EndPoints : /Equipment/:branch_id
// Work: To Create new Equipment (user) for the gym

export const createEquipments=async(req,res)=>{
    try {
        const {equipment_name, equipment_description,equipment_last_mantainance_date,}=req.body
        const admin_id=req.admin?._id
        // branch id depending on the query if having multiple branches
        const {branch_id}=req.params

        const admin= await AdminModel.findOne({_id:admin_id})

        if(!admin){
            throw new CustomError("Admin is missing ")
        }
        const response= await EquipmentModel.create({
            equipment_name,
            equipment_description,
            equipment_last_mantainance_date,
            admin_id,
            branch_id
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
// EndPoints : /Equipment/:branch_id
// Work: To Create new Equipment (user) for the gym

export const getEquipmentById = async (req, res) => {
    try {
        const admin_id = req.admin?._id;
        const {branch_id}=req.params

      

        // Fetch all equipment matching admin_id and branch_id
        const equipmentList = await EquipmentModel.find({ admin_id, branch_id});

        return res.status(StatusCodes.OK).send(
            responseGenerator(
                equipmentList,
                StatusCodes.OK,
                "Here is the list of the equipment that you have",
                "success"
            )
        );
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
};


// Methord : DELETE
// EndPoints : /Equipment/:branch_id
// Work: To remove the equipment for the gym's particular branch 

export const deleteEquipmentById=async(req,res)=>{
    try {
        const admin_id = req.admin?._id;
        const {branch_id,equipment_id}=req.params

        if (!branch_id || !equipment_id) {
            throw new CustomError("Both branch_id and equipment_id are required");
        }


        const deleteResult = await EquipmentModel.findOneAndDelete({
            _id: equipment_id,
            branch_id: branch_id,
            admin_id: admin_id,
        });

        if(!deleteResult){
            throw new CustomError("The item is already deleted");
        }

        return res.status(StatusCodes.OK).send(
            responseGenerator(
                deleteResult,
                StatusCodes.OK,
                "Equipment deleted successfully",
                "success"
            )
        )

    }  catch (error) {
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
};



// Methord : DELETE 
// EndPoints : /Equipment
// Work: To remove the equipment for the gym's particular branch 

export const deleteMultipleEquipments = async (req, res) => {
    try {
        const { equipment_ids } = req.body;
        const { branch_id } = req.params;  // Ensure branch_id is provided

        if (!branch_id) {
            throw new CustomError("Branch ID is required");
        }

        if (!Array.isArray(equipment_ids) || equipment_ids.length === 0) {
            throw new CustomError("equipment_ids must be a non-empty array");
        }

        // Ensure all given equipment_ids belong to the provided branch_id
        const existingEquipments = await EquipmentModel.find({
            _id: { $in: equipment_ids },
            branch_id: branch_id,  // Ensure correct branch
        });

        if (existingEquipments.length === 0) {
            throw new CustomError("No matching equipment found for the given branch");
        }

        // Extract valid IDs that actually exist
        const validEquipmentIds = existingEquipments.map(equip => equip._id);

        // Perform deletion only for the verified equipment
        const result = await EquipmentModel.deleteMany({
            _id: { $in: validEquipmentIds }
        });

        return res.status(StatusCodes.OK).send(
            responseGenerator(
                result,
                StatusCodes.OK,
                `${result.deletedCount} equipment item(s) deleted successfully from branch ${branch_id}`,
                "success"
            )
        );
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
};




// Methord : PUT
// EndPoints : /Equipment/branch:id/equipment_id
// Work: To  update the data from the branch 

export const updateEquipmentDetailsById = async (req, res) => {
    try {
        const { branch_id, equipment_id } = req.params;

        if (!equipment_id) {
            throw new CustomError("Equipment ID is required for updating equipment details");
        }

        // Remove undefined or empty values from req.body
        const updateFields = {};
        Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== undefined && req.body[key] !== "") {
                updateFields[key] = req.body[key];
            }
        });

        if (Object.keys(updateFields).length === 0) {
            throw new CustomError("At least one field must be provided for update");
        }

        const updatedEquipment = await EquipmentModel.findOneAndUpdate(
            { _id: equipment_id, branch_id: branch_id },  // Ensure it's within the correct branch
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedEquipment) {
            throw new CustomError("Equipment not found for the given branch");
        }

        return res.status(StatusCodes.OK).send(
            responseGenerator(
                updatedEquipment,
                StatusCodes.OK,
                "Equipment details updated successfully",
                "success"
            )
        );
    } catch (error) {
        if (error instanceof CustomError) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send(responseGenerator({}, StatusCodes.BAD_REQUEST, error.message, "error"));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(
                responseGenerator(
                    {},
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    error.message || "Internal Server Error",
                    "error"
                )
            );
    }
};
