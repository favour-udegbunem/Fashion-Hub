import express from "express";
import {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
  getAllExpenses,
} from "../controllers/expenseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/CreateExpense", verifyToken, createExpense);
router.get("/getAllExpenses", verifyToken, getAllExpenses);
router.get("getExpenseSummary", verifyToken, getExpenseSummary)
router.patch("/expense/update/:id", verifyToken, updateExpense);
router.delete("/expense/delete/:id", verifyToken, deleteExpense);

export default router;