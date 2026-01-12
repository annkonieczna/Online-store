import { createOrderFromCart,getOrderHistory } from "../services/orderService.js";

export const createOrder = async (req, res) => {
  const { userId } = req.params;

  const result = await createOrderFromCart(userId);

  if (result.success) {
    res.json({
      success: true,
      message: "Order created successfully",
      orderId: result.orderId,
    });
  } else {
    res.status(400).json({
      success: false,
      message: result.error,
    });
  }
};
export const getUserOrderHistory = async (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid user id",
    });
  }

  const result = await getOrderHistory(userId);

  if (result.success) {
    res.status(200).json({
      success: true,
      data: result.data,
    });
  } else {
    res.status(500).json({
      success: false,
      message: result.error,
    });
  }
};
