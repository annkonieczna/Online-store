import express from "express";
import { getUser, login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", getUser);

export default router;
