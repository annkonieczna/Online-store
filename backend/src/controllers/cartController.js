import {
  getUsersProducts,
  addProductToCart,
  removeProductFromCart,
  updateCartQuantity,
} from "../services/cartService.js";
export const getProductsInCart = async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const response = await getUsersProducts(userId);
    if (response.success) return res.status(200).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Failed to load data" });
  }
};

export const addProduct = async (req, res) => {
  const { product_id, user_id, quantity, size } = req.body;

  try {
    const response = await addProductToCart(
      product_id,
      user_id,
      quantity,
      size
    );
    if (response.success) return res.status(201).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Failed to add product to cart" });
  }
};

export const removeProduct = async (req, res) => {
  const userId = Number(req.params.userId);

  const productId = Number(req.params.productId);
  const size = req.params.size;

  try {
    const response = await removeProductFromCart(userId, productId, size);
    if (response.success) return res.status(200).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete data" });
  }
};

export const updateCartProductQuantity = async (req, res) => {
  const { userId, productId, size, quantity } = req.body;

  if (!userId || !productId || !size || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  try {
    const result = await updateCartQuantity(userId, productId, size, quantity);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(200).json({
      success: true,
      message: "Quantity updated",
    });
  } catch (error) {
    console.error("updateCartProductQuantity error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
