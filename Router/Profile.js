import { Router } from "express";
import { createBranch } from "../Controller/Profile/index.js";
import { verifyAdmin } from "../Middleware/auth.js";

const profileRouter=Router()


profileRouter.post("/:admin_id",verifyAdmin,createBranch);

export default profileRouter