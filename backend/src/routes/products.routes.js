import { Router } from "express";
import db from "../db.js";
const router = Router();
// All products
router.get("/", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});
// Singular product
router.get("/:id", (req, res) => {
  db.get("SELECT * FROM PRODUCTS WHERE id = ?"[req.params.id], (err, row) => {
    if (err) return res.status(500).json(err);
    if (!row) return res.status(404).json("Not found");
    res.json(row);
  });
  res.json({ message: "Placeholder" });
});

export default router;
