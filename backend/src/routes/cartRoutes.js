import express from "express";
import {
  getProductsInCart,
  addProduct,
  removeProduct,
  updateCartProductQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/getUsersProducts/:id", getProductsInCart);
router.post("/addProduct", addProduct);
router.delete("/remove/:userId/:productId/:size", removeProduct);
router.patch("/updateQuantity", updateCartProductQuantity);

export default router;
