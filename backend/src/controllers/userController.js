import opinionModel from "../models/userModel.js";
import {
  addOpinionUser,
  getOpinionByProductId,
} from "../services/userService.js";

export const addOpinion = async (req, res) => {
  const { rating, title, context, user_id, product_id } = req.body;
  console.log("REQ BODY:", req.body);

  const newOpinion = {
    title: title,
    context: context,
    rating: rating,
    user_id: user_id,
    product_id: product_id,
  };
  try {
    const response = await addOpinionUser(newOpinion);
    if (response.success) return res.status(201).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Failed to add an opinion" });
  }
};

export const getAllOpinions = async (req, res) => {
  const productId = Number(req.params.productId);
  // const { product_id } = req.params;
  console.log("productId:", productId);

  try {
    const response = await getOpinionByProductId(productId);
    if (response.success) return res.status(201).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Failed to load data" });
  }
};
