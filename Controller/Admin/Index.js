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

        const token = getJwt({ email: admin.email }, { expiresIn: '30d' });

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



// Methord : Post
// EndPoints : /:id
// Work: To get Admin data complete