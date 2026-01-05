import express, { json } from "express";
import cors from "cors";

import initProducts from "./initProducts.js";
import productsRoutes from "./routes/products.routes.js";
// import opinionRoutes from "./routes/opinions.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import cartRoutes from "./routes/cart.routes.js";

const app = express();
const PORT = 3001;
initProducts();
app.use(cors());
app.use(json());

app.use("/api/products", productsRoutes);
app.get("/", (req, res) => {
  res.send("API is running ");
});
// app.use("/api/opinions", opinionRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log("Running onhttp://localhost:3001 ");
});
