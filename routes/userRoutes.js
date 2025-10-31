import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 All routes are protected
router.get("/getAllUsers", verifyToken, getAllUsers);
router.get("/getSingleUser/:id", verifyToken, getUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;