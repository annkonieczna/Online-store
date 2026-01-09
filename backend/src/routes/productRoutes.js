import express from "express";
import {
  editProduct,
  getAllProducts,
  getProduct,
} from "../controllers/productController.js";

const router = express.Router();
// All products
router.get("/getAll", getAllProducts);
// Singular product
router.get("/:id", getProduct);

router.patch("/editStockProduct", editProduct);

export default router;
