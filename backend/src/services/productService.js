import { pool } from "../config/db.js";

export const getProductById = async (product_id) => {
  try {
    console.log("w bazie", product_id);
    const [products] = await pool.query(
      `SELECT * FROM products WHERE id=?`,
      [product_id] // CAST(? AS UNSIGNED)`,
    );
    console.log(products[0]);
    if (products.length === 0)
      return { success: false, message: "Product doesn't exist" };

    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getProducts = async () => {
  try {
    const [products] = await pool.query(`SELECT * FROM products `);

    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const editProductById = async (id, stock) => {
  try {
    const [result] = await pool.query(
      "UPDATE products SET stock = ? WHERE id = ?",
      [stock, id]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "No product found with this id" };
    }

    return { success: true, message: "Product edited" };
  } catch (error) {
    return { success: false, error: error };
  }
};
