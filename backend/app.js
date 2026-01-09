import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import { checkConnection } from "./src/config/db.js";
import createAllTables from "./src/utils/dbUtils.js";
import cors from "cors";
import initProductsUtils from "./src/utils/initProductsUtils.js";
import orderRoutes from "./src/routes/orderRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

app.listen(3000, async () => {
  console.log("Server listening on 3000");
  try {
    await checkConnection();
    await createAllTables();
    await initProductsUtils();
  } catch (error) {
    console.log("failed to initialize database", error);
  }
});
