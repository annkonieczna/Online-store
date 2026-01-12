import { pool } from "../config/db.js";

export const createOrderFromCart = async (userId) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [cartItems] = await connection.query(
      `
      SELECT 
        ci.product_id,
        ci.size,
        ci.quantity,
        p.price,
        p.stock
      FROM carts c
      JOIN cart_items ci ON ci.cart_id = c.id
      JOIN products p ON p.id = ci.product_id
      WHERE c.user_id = ?
      FOR UPDATE
      `,
      [userId]
    );

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        throw new Error(
          `Not enough stock for product ID ${item.product_id}. Available: ${item.stock}`
        );
      }
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total) VALUES (?, ?)`,
      [userId, total]
    );

    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      await connection.query(
        `
        INSERT INTO order_items 
          (order_id, product_id, size, quantity, price)
        VALUES (?, ?, ?, ?, ?)
        `,
        [orderId, item.product_id, item.size, item.quantity, item.price]
      );

      await connection.query(
        `
        UPDATE products
        SET stock = stock - ?
        WHERE id = ?
        `,
        [item.quantity, item.product_id]
      );
    }

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
export const getOrderHistory = async (userId) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        o.id AS orderId,
        o.total,
        o.created_at,
        oi.product_id,
        oi.size,
        oi.quantity,
        oi.price,
        p.title,
        p.image
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      WHERE o.user_id = ?
      ORDER BY o.id DESC
      `,
      [userId]
    );

    const ordersMap = {};

    for (const row of rows) {
      if (!ordersMap[row.orderId]) {
        ordersMap[row.orderId] = {
          orderId: row.orderId,
          total: row.total,
          createdAt: row.created_at,
          items: [],
        };
      }

      ordersMap[row.orderId].items.push({
        productId: row.product_id,
        title: row.title,
        image: row.image,
        size: row.size,
        quantity: row.quantity,
        price: row.price,
      });
    }

    return {
      success: true,
      data: Object.values(ordersMap),
    };
  } catch (error) {
    console.error("getOrderHistory error:", error);
    return { success: false, error: error.message };
  }
};
