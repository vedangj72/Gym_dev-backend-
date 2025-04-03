import BranchModel from "../../Models/BranchesModel.js";
import { CustomError } from "../../Utils/error.js";
import { StatusCodes } from "http-status-codes";
import { responseGenerator } from "../../Utils/general.js";
import AdminModel from "../../Models/AdminModels.js";



// Methord : Post
// EndPoints : /branch
// Work: To Create new Admin (user) for the gym 

export const createBranch = async (req, res) => {
    try {
        
        const {branch_name,location}= req.body
        const { admin_id } = req.params;
        const BranchName= await BranchModel.findOne({branch_name,admin_id})

        const admin=await AdminModel.findOne({admin_id})


        if(BranchName){
            throw new CustomError("This branch name already exits")
        }

    
        const newBranch=await BranchModel.create({
            branch_name,
            branch_location: location, 
            admin_id
        })

        const BranchAdded=await AdminModel.findByIdAndUpdate(admin_id, {
            $push: { branches: newBranch._id }
        });

        if(!BranchAdded){
            throw new CustomError("Error in Adding the Branch")
        }

        return res.status(StatusCodes.OK).send(
            responseGenerator(
                newBranch,
                StatusCodes.OK,
                "Branch Created Successfully",
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



// Methord : Get
// EndPoints : /branch/:admin_id
// Work: To Create new Admin (user) for the gym 


export const getBranchesById=async(req,res)=>{
    try {
        // Validation of the id
        const {admin_id}=req.params
        const admin=await BranchModel.find({admin_id})

        return res.status(StatusCodes.OK).send(
            responseGenerator(
                admin,
                StatusCodes.OK,
                "Fetched the branch data for the selected admin ",
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


