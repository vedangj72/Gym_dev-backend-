import { Router } from "express";
import { createBranch, getBranchesById } from "../Controller/Profile/index.js";
import { verifyAdmin } from "../Middleware/auth.js";

const profileRouter=Router()


profileRouter.post("/:admin_id",verifyAdmin,createBranch);


profileRouter.get("/:admin_id",verifyAdmin,getBranchesById);


export default profileRouter    