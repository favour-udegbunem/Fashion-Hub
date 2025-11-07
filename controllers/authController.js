import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import dotenv from "dotenv";

dotenv.config();
const { User } = db;

/* ---------------------- SIGNUP ---------------------- */
export const signup = async (req, res) => {
  try {
    const { fullName, email, whatsappNumber, businessName, role, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}` : null;

    const user = await User.create({
      fullName,
      email,
      whatsappNumber,
      businessName,
      role: role || "Tailor",
      password: hashedPassword,
      whatsappLink,
    });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        businessName: user.businessName,
        role: user.role,
        whatsappLink: user.whatsappLink,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/* ---------------------- LOGIN ---------------------- */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        businessName: user.businessName,
        role: user.role,
        whatsappLink: user.whatsappLink,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/* ---------------------- GET LOGGED-IN USER ---------------------- */
export const getUser = async (req, res) => {
  try {
    // The auth middleware must have already decoded the JWT and set req.user
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "fullName", "email", "businessName", "role", "whatsappLink"]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `Welcome back, ${user.businessName || user.fullName}!`,
      user
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};


/* ---------------------- UPDATE USER ---------------------- */
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullName, email, whatsappNumber, businessName, password } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If password is being updated, hash it again
    let hashedPassword = user.password;
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}` : user.whatsappLink;

    await user.update({
      fullName: fullName || user.fullName,
      email: email || user.email,
      whatsappNumber: whatsappNumber || user.whatsappNumber,
      whatsappLink,
      businessName: businessName || user.businessName,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        businessName: user.businessName,
        role: user.role,
        whatsappLink: user.whatsappLink,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

/* ---------------------- DELETE USER ---------------------- */
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};