import { pool } from "../config/db.js";

export const createOrderFromCart = async (userId) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // pobierz produkty z koszyka
    const [cartItems] = await connection.query(
      `
      SELECT 
        ci.product_id,
        ci.size,
        ci.quantity,
        p.price
      FROM carts c
      JOIN cart_items ci ON ci.cart_id = c.id
      JOIN products p ON p.id = ci.product_id
      WHERE c.user_id = ?
      `,
      [userId]
    );

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // oblicz total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // utwórz order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total) VALUES (?, ?)`,
      [userId, total]
    );

    const orderId = orderResult.insertId;

    // dodaj order_items
    for (const item of cartItems) {
      await connection.query(
        `
        INSERT INTO order_items 
          (order_id, product_id, size, quantity, price)
        VALUES (?, ?, ?, ?, ?)
        `,
        [orderId, item.product_id, item.size, item.quantity, item.price]
      );
    }

    // wyczyść koszyk
    await connection.query(
      `
      DELETE ci FROM cart_items ci
      JOIN carts c ON c.id = ci.cart_id
      WHERE c.user_id = ?
      `,
      [userId]
    );

    await connection.commit();

    return { success: true, orderId };
  } catch (error) {
    await connection.rollback();
    return { success: false, error: error.message };
  } finally {
    connection.release();
  }
};
