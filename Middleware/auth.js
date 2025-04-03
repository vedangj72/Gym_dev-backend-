import { StatusCodes } from "http-status-codes";
import AdminModel from "../Models/AdminModels.js";
import { getCurrentUnix } from "../Utils/unix.js";
import { CustomError } from "../Utils/error.js";
import { verifyJwt } from "../Utils/jwt.js";
import { responseGenerator } from "../Utils/general.js";


export const verifyAdmin = async (req, res, next) => {
    console.log("verified admin")
    try {
      
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            throw new CustomError("Admin is not logged in");
        }
        console.log("Auth Header:", req.headers.authorization);
        const encToken = authHeader.split(" ")[1];
        if (!encToken) {
            throw new CustomError("Token is missing");
        }

        const tokenData = await verifyJwt(encToken);
        if (!tokenData) {
            throw new CustomError("Token verification failed");
        }

        if (getCurrentUnix() > tokenData?.exp) {  
            throw new CustomError("Token is expired");
        }

        const admin = await AdminModel.findOne({ email: tokenData.email }).lean().exec();
        if (!admin) {
            throw new CustomError("User does not exist");
        }
        req.admin = admin;
        next();
    } catch (error) {
        if ( error instanceof CustomError) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send(responseGenerator({}, StatusCodes.BAD_REQUEST, error.message, 0));
        }
        console.error(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(
                responseGenerator(
                    {},
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    "Internal Server Error",
                    0
                )
            );
    }
}