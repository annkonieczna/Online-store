import express from "express";
import { addOpinion, getAllOpinions } from "../controllers/userController.js";

const router = express.Router();

router.post("/addOpinion", addOpinion);
router.get("/getAllOpinions/:productId", getAllOpinions);

export default router;
