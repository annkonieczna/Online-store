import userModel from "../models/userModel.js";
import {
  registerUser,
  loginUser,
  getUserFromToken,
} from "../services/authService.js";

export const register = async (req, res) => {
  const { email, password, repeatedEmail, repeatedPassword } = req.body;
  if (!email || !password || !repeatedEmail || !repeatedPassword)
    return res
      .status(401)
      .json({ message: "All fields are required", success: false });
  else if (email !== repeatedEmail)
    return res.status(401).json({
      message: "Email and repeated email don't match",
      success: false,
    });
  else if (password !== repeatedPassword)
    return res.status(401).json({
      message: "Password and repeated password don't match",
      success: false,
    });

  const newUser = new userModel({
    email,
    password,
  });
  try {
    const response = await registerUser(newUser);
    if (response.success) return res.status(201).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(401)
      .json({ message: "All fields are required", success: false });
  try {
    const response = await loginUser(email, password);
    if (response.success) return res.status(200).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const getUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Token not provided" });
  try {
    const response = await getUserFromToken(token);
    if (response.success) return res.status(200).json(response);
    else return res.status(400).json(response);
  } catch (error) {
    //return { success: false, message: "Registration failed" };
    return res
      .status(500)
      .json({ success: false, message: "Failed to load data" });
  }
};
