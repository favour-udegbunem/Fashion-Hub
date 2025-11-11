import db from "../models/index.js";
const { Income, User, Order } = db;

// Create Income
export const createIncome = async (req, res) => {
  try {
    const { description, amount, date, paymentStatus, orderId } = req.body;
    const userId = req.user.id; // from JWT middleware

    const income = await Income.create({
      userId,
      description,
      amount,
      date,
      paymentStatus,
      orderId,
    });

    res.status(201).json({
      message: "Income created successfully",
      income,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all Incomes (Admin)
// export const getAllIncomes = async (req, res) => {
//   try {
//     const incomes = await Income.findAll({
//       include: [
//         { model: User, attributes: ["id", "fullName", "email"] },
//         { model: Order, attributes: ["id"] },
//       ],
//       order: [["createdAt", "DESC"]],
//     });

//     res.status(200).json(incomes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

export const getAllIncomes = async (req, res) => {
  try {
    const userId = req.user.id; // ← ADD THIS

    const incomes = await Income.findAll({
      where: { userId }, // ← ADD THIS
      include: [
        { model: User, attributes: ["id", "fullName", "email"] },
        // { model: Order, attributes: ["id", "orderNumber"] },
        { model: Order, attributes: ["id"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get Logged-in User's Incomes
export const getUserIncomes = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomes = await Income.findAll({
      where: { userId },
      include: [{ model: Order, attributes: ["id", "orderNumber"] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get Income by ID
export const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;

    const income = await Income.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "fullName", "email"] },
        { model: Order, attributes: ["id", "orderNumber"] },
      ],
    });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update Income
export const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date, paymentStatus } = req.body;

    const income = await Income.findByPk(id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.update({ description, amount, date, paymentStatus });

    res.status(200).json({ message: "Income updated successfully", income });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete Income
export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const income = await Income.findByPk(id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.destroy();

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};