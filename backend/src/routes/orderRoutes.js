import express from "express";
import { createOrder,getUserOrderHistory } from "../controllers/orderController.js";

const router = express.Router();

router.post("/createFromCart/:userId", createOrder);
router.get("/history/:userId", getUserOrderHistory);

export default router;
