import { pool } from "../config/db.js";

export const getUsersProducts = async (userId) => {
  try {
    //console.log("w bazie", userId);
    const [products] = await pool.query(
      `SELECT
        p.id AS productId,
        ci.quantity,
        ci.size,
        p.title,
        p.price,
        p.image,
        p.stock
        FROM carts c
        JOIN cart_items ci ON ci.cart_id = c.id
        JOIN products p ON p.id = ci.product_id
        WHERE c.user_id = ?;
        `,
      [userId]
    );

    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const addProductToCart = async (productId, userId, quantity, size) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [carts] = await conn.query("SELECT id FROM carts WHERE user_id = ?", [
      userId,
    ]);

    let cartId;

    if (carts.length === 0) {
      const [cartResult] = await conn.query(
        "INSERT INTO carts (user_id) VALUES (?)",
        [userId]
      );
      cartId = cartResult.insertId;
    } else {
      cartId = carts[0].id;
    }

    const [items] = await conn.query(
      `
      SELECT id, quantity
      FROM cart_items
      WHERE cart_id = ? AND product_id = ? AND size = ?
      `,
      [cartId, productId, size]
    );

    if (items.length > 0) {
      await conn.query(
        `
        UPDATE cart_items
        SET quantity = quantity + ?
        WHERE id = ?
        `,
        [quantity, items[0].id]
      );
    } else {
      await conn.query(
        `
        INSERT INTO cart_items (cart_id, product_id, size, quantity)
        VALUES (?, ?, ?, ?)
        `,
        [cartId, productId, size, quantity]
      );
    }

    await conn.commit();

    return {
      success: true,
      message: "Product added to cart",
    };
  } catch (error) {
    await conn.rollback();
    console.error("addProductToCart error:", error);

    return {
      success: false,
      error,
    };
  } finally {
    conn.release();
  }
};

export const removeProductFromCart = async (userId, productId, size) => {
  try {
    const [carts] = await pool.query("SELECT id FROM carts WHERE user_id = ?", [
      userId,
    ]);

    if (carts.length === 0) {
      return { success: false, error: "Cart not found for user." };
    }

    const cartId = carts[0].id;

    const [result] = await pool.query(
      "DELETE FROM cart_items WHERE cart_id = ? AND product_id = ? AND size = ?",
      [cartId, productId, size]
    );

    if (result.affectedRows === 0) {
      return { success: false, error: "Product not found in cart." };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateCartQuantity = async (userId, productId, size, quantity) => {
  try {
    // znajdź koszyk użytkownika
    const [carts] = await pool.query("SELECT id FROM carts WHERE user_id = ?", [
      userId,
    ]);

    if (carts.length === 0) {
      return { success: false, message: "Cart not found" };
    }

    const cartId = carts[0].id;

    // update quantity
    const [result] = await pool.query(
      `
      UPDATE cart_items
      SET quantity = ?
      WHERE cart_id = ? AND product_id = ? AND size = ?
      `,
      [quantity, cartId, productId, size]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Product not found in cart" };
    }

    return { success: true };
  } catch (error) {
    console.error("updateCartQuantity error:", error);
    return { success: false, error };
  }
};
