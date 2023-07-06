import express from "express";
const router = express.Router();

import { createUser, loginUser, getUsers } from "../controllers/authController";
import autauthenticationMiddleware from "../middleware/authentication";


router.get("/",autauthenticationMiddleware, getUsers);
router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
