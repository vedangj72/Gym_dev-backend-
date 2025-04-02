import { Router } from "express";
import { getAdminById, getAllAdmins, LoginAdmin, signUpAdmin } from "../Controller/Admin/Index.js";
import { verifyAdmin } from "../Middleware/auth.js";


const adminRouter=Router()

adminRouter.post("/signup",signUpAdmin)

adminRouter.post("/login",LoginAdmin)


// Private route for the admin data
adminRouter.get("/:id",verifyAdmin,getAdminById)

// testing purpose data for loading the admin data to hold the id 
adminRouter.get("/",verifyAdmin,getAllAdmins)


export default adminRouter