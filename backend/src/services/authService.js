import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "sdbcjhscjhbb0cnskd";

export const registerUser = async (user) => {
  console.log(user);
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const adminStatus = 0;
    const query = `INSERT INTO users (email,password,admin) VALUES (?,?,?)`;
    const values = [user.email, hashedPassword, adminStatus];

    await pool.query(query, values);
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return { success: false, message: "Registration failed", error: error };
  }
};

export const loginUser = async (email, password) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email=?`, [
      email,
    ]);

    if (rows.length === 0) return { success: false, message: "User not found" };
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return { success: false, message: "Invalid password" };
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { success: true, message: "Login Successfull", token: token };
  } catch (error) {
    return { success: false, message: "Login failed", error: error };
  }
};

export const getUserFromToken = async (token) => {
  try {
    const trimmedToken = token.trim();
    const decodedToken = await jwt.verify(trimmedToken, JWT_SECRET);
    const [rows] = await pool.query(
      `SELECT id, email FROM users WHERE email=?`,
      [decodedToken.email]
    );
    if (rows.length === 0) return { success: false, message: "User not found" };
    return { success: true, data: rows[0] };
  } catch (error) {
    return { success: false, message: "Invalid Token", error: error };
  }
};
