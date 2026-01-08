import express from "express";
import {
  addOpinion,
  deleteOpinion,
  editOpinion,
  getAllOpinions,
  getUsersOpinions,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/addOpinion", addOpinion);
router.get("/getAllOpinions/:productId", getAllOpinions);
router.get("/getUsersOpinions", getUsersOpinions);
router.delete("/deleteOpinion/:opinionId", deleteOpinion);
router.patch("/editOpinion", editOpinion);

export default router;
