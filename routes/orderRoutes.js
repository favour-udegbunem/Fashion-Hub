import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getAllOrdersByDressType,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // assuming you have JWT auth middleware

const router = express.Router();

// Create new order
router.post("/createOrder", verifyToken, createOrder);
router.get("/getAllOrders", verifyToken, getAllOrders);
router.get("/getAllOrdersByDressType", verifyToken, getAllOrdersByDressType);
router.get("/:id", verifyToken, getOrderById);
router.put("/:id", verifyToken, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);

export default router;