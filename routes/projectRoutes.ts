import express from "express";
const router = express.Router();

import {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
} from "../controllers/projectsController";
import autauthenticationMiddleware from "../middleware/authentication";


router.route("/").get(getAllProjects);

router.use(autauthenticationMiddleware);

router.route("/").post(createProject)
router.route("/:id").get(getProject).patch(updateProject)
export default router;

