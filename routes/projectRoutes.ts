import express from "express";
const router = express.Router();

import {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  uploadImage
} from "../controllers/projectsController";
import autauthenticationMiddleware from "../middleware/authentication";


router.route("/").get(getAllProjects);

router.use(autauthenticationMiddleware);

router.route("/").post(createProject)
router.route("/upload").post(uploadImage)
router.route("/:id").get(getProject).patch(updateProject)
export default router;

