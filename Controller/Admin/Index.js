import { StatusCodes } from "http-status-codes";
import AdminModel from "../../Models/AdminModels.js";
import { CustomError } from "../../Utils/error.js"
import bcrypt from "bcrypt";
import { getJwt } from "../../Utils/jwt.js";
import { responseGenerator } from "../../Utils/general.js";

// Methord : Post
// EndPoints : /signup
// Work: To Create new Admin (user) for the gym
export const signUpAdmin=async(req,res)=>{
    try {
        const {phone,name,gym_name,email,password,age,address}=req.body
        const Existed= await AdminModel.findOne({email})
        if(Existed){
            throw new CustomError("The Email that you entered already exist")
        }
       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin=await AdminModel.create({
            phone,
            name,
            gym_name,
            email,
            password: hashedPassword, 
            age,
            address
        })
        return res
        .status(StatusCodes.CREATED)
        .send(responseGenerator(newAdmin, StatusCodes.CREATED, "Admin registered successfully", 1));

    } catch (error) {
        if(error instanceof CustomError){
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



// Methord : Post
// EndPoints : /login
// Work: To Create new Admin (user) for the gym 

export const LoginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const admin=await AdminModel.findOne({email})
        if(!admin){
            throw new CustomError("Invalid email")
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            throw new CustomError("Invalid email or password");
        }

        const token = getJwt({ email: admin.email, id: admin._id }, { expiresIn: '30d' });

        return res.status(StatusCodes.OK).send(
            responseGenerator(
              { token }, 
              StatusCodes.OK,
              "Login successful",
              "success"
            )
        )
    }  catch (error) {
        if(error instanceof CustomError){
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



// Method: GET
// Endpoint: /admin/:id
// Work: Fetch admin details along with branch details using aggregation
export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admindata=req.admin
        console.log(`this is admin data ${admindata._id}`)
        // Aggregation pipeline to fetch admin details and corresponding branch data
        const adminData = await AdminModel.aggregate([
            { $match: { _id: id } }, 
            {
                $lookup: {
                    from: "branches",
                    localField: "branches",
                    foreignField: "_id", 
                    as: "branch_details"
                }
            },
            {
                $project: {
                    password: 0 ,
                    branches:0
                }
            }
        ]);

        if (!adminData || adminData.length === 0) {
            throw new CustomError("Invalid admin ID");
        }

        return res
            .status(StatusCodes.OK)
            .send(responseGenerator(adminData[0], StatusCodes.OK, "Admin data retrieved successfully", 1));

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



// Method: GET
// Endpoint: /admin
// Work: get all the admins that are present in the application


export const getAllAdmins=async(req,res)=>{
    try {
        const admins= await AdminModel.find()
        return res.status(StatusCodes.OK).send(
            responseGenerator(
                admins,
                StatusCodes.OK,
                "All admins are here",
                "success"
            )
        ) 
         
    }catch (error) {
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

/*
TODO
1. Put request for the admin user
2. Delete Admin by the Super Admin that is me 
3.testing purpose get all the admins  for the super admin that is me
 */