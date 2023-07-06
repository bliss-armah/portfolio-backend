import express from "express";
const router = express.Router();

import {
  createProject,
  getAllProjects,
  getProject,
} from "../controllers/projectsController";
import autauthenticationMiddleware from "../middleware/authentication";

router.use(autauthenticationMiddleware);

router.route("/").post(createProject).get(getAllProjects);
router.route("/:id").get(getProject);
export default router;
