import express from "express";
const router = express.Router();

import { createProject,getAllJobs} from "../controllers/projectsController";
import autauthenticationMiddleware from "../middleware/authentication";


router.use(autauthenticationMiddleware)

router.route("/", ).post(createProject).get(getAllJobs)
// router.post("/login", loginUser);

export default router;
