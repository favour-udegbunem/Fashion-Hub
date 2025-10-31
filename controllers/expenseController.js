import db from "../models/index.js";
import { Op } from "sequelize";
const { Expense } = db;

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const { description, amount, date, category } = req.body;
    const userId = req.user.id; // from JWT auth

    const expense = await Expense.create({
      userId,
      description,
      amount,
      date,
      category,
    });

    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create expense", error: error.message });
  }
};

// Get All Expenses for User
export const getUserExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.findAll({
      where: { userId },
      order: [["date", "DESC"]],
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses", error: error.message });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date, category } = req.body;

    const expense = await Expense.findByPk(id);

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await expense.update({ description, amount, date, category });

    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense", error: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await expense.destroy();

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense", error: error.message });
  }
};


// ✅ Calculate Total Expenses (overall, monthly, yearly)
export const getExpenseSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentYearStart = new Date(now.getFullYear(), 0, 1);

    // Total expenses (all-time)
    const totalExpenses = await Expense.sum("amount", { where: { userId } });

    // Monthly total
    const monthlyTotal = await Expense.sum("amount", {
      where: {
        userId,
        date: {
          [Op.gte]: currentMonthStart,
        },
      },
    });

    // Yearly total
    const yearlyTotal = await Expense.sum("amount", {
      where: {
        userId,
        date: {
          [Op.gte]: currentYearStart,
        },
      },
    });

    res.status(200).json({
      totalExpenses: totalExpenses || 0,
      monthlyTotal: monthlyTotal || 0,
      yearlyTotal: yearlyTotal || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch expense summary", error: error.message });
  }
};