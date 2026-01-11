import {
  getProductById,
  getProducts,
  editProductById,
} from "../services/productService.js";

export const getAllProducts = async (req, res) => {
  try {
    const response = await getProducts();
    if (response.success) return res.status(200).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Failed to load data" });
  }
};

export const getProduct = async (req, res) => {
  const productId = Number(req.params.id);
  console.log("product ", productId);
  try {
    const response = await getProductById(productId);
    if (response.success) return res.status(200).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Failed to load data" });
  }
};

export const editProduct = async (req, res) => {
  const { id, stock } = req.body;

  try {
    const response = await editProductById(id, stock);
    if (response.success) return res.status(200).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Failed to edit data" });
  }
};
