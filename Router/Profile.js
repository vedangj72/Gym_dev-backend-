import { Router } from "express";
import { createBranch, getBranchesById } from "../Controller/Profile/index.js";
import { verifyAdmin } from "../Middleware/auth.js";

const profileRouter=Router()


profileRouter.post("/",verifyAdmin,createBranch);


profileRouter.get("/",verifyAdmin,getBranchesById);


export default profileRouter    