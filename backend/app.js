import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import { checkConnection } from "./src/config/db.js";
import createAllTables from "./src/utils/dbUtils.js";
import cors from "cors";
import initProductsUtils from "./src/utils/initProductsUtils.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

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
