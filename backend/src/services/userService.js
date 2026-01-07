import { pool } from "../config/db.js";

export const addOpinionUser = async (opinion) => {
  console.log("dodaje opinie");
  console.log(opinion);

  try {
    const query = `INSERT INTO opinions (rating,title,context,user_id,product_id) VALUES (?,?,?,?,?)`;
    const values = [
      opinion.rating,
      opinion.title,
      opinion.context,
      opinion.user_id,
      opinion.product_id,
    ];
    console.log("VALUES FOR INSERT:", values);

    await pool.query(query, values);
    return { success: true, message: "Opinion added successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong with adding an opinion",
      error: error,
    };
  }
};

export const getOpinionByProductId = async (product_id) => {
  try {
    const [opinions] = await pool.query(
      `SELECT * FROM opinions WHERE product_id=?`,
      [product_id] // CAST(? AS UNSIGNED)`,
    );

    return { success: true, data: opinions };
  } catch (error) {
    return { success: false, error: error };
  }
};
