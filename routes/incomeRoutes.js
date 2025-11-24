import express from "express";
import {
  createIncome,
  getAllIncomes,
  getUserIncomes,
  getIncomeById,
  updateIncome,
  updateIncomePaymentStatus,
  deleteIncome,
} from "../controllers/incomeController.js";

import { verifyToken } from "../middleware/authMiddleware.js"; // JWT Auth

const router = express.Router();

router.post("/createIncome", verifyToken, createIncome);
router.get("/getAllIncome", verifyToken, getAllIncomes); // admin view
router.get("/user", verifyToken, getUserIncomes);
router.get("/:id", verifyToken, getIncomeById);
router.put("/updatePaymentStatus", verifyToken, updateIncomePaymentStatus);
router.patch("/:id", verifyToken, updateIncome);
router.delete("/:id", verifyToken, deleteIncome);

export default router;