import { createOrderFromCart } from "../services/orderService.js";

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
