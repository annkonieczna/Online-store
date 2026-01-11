import { pool } from "../config/db.js";

export const createOrderFromCart = async (userId) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Pobierz produkty z koszyka wraz z aktualnym stock
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

    // 2. Sprawdź stock
    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        throw new Error(
          `Not enough stock for product ID ${item.product_id}. Available: ${item.stock}`
        );
      }
    }

    // 3. Oblicz total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 4. Utwórz order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total) VALUES (?, ?)`,
      [userId, total]
    );

    const orderId = orderResult.insertId;

    // 5. Dodaj order_items i zmniejsz stock
    for (const item of cartItems) {
      // a) order_items
      await connection.query(
        `
        INSERT INTO order_items 
          (order_id, product_id, size, quantity, price)
        VALUES (?, ?, ?, ?, ?)
        `,
        [orderId, item.product_id, item.size, item.quantity, item.price]
      );

      // b) zmniejsz stock
      await connection.query(
        `
        UPDATE products
        SET stock = stock - ?
        WHERE id = ?
        `,
        [item.quantity, item.product_id]
      );
    }

    // 6. Wyczyść koszyk
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
