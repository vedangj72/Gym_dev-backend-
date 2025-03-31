import { Router } from "express";
import { LoginAdmin, signUpAdmin } from "../Controller/Admin/Index.js";


const adminRouter=Router()

adminRouter.post("/signup",signUpAdmin)

adminRouter.post("/login",LoginAdmin)


export default adminRouter