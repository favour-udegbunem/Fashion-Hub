import db from "../models/index.js";
const { Order, User, UserSelection } = db;

// CREATE order
// CREATE ORDER + AUTO ADD TO INCOME (PENDING)
export const createOrder = async (req, res) => {
  try {
    const { customerName, dressType, amount, startDate, deadline, status = "Pending" } = req.body;
    const userId = req.user.id;

    // 1. CREATE ORDER
    const order = await Order.create({
      userId,
      customerName,
      dressType,
      amount,
      startDate,
      deadline,
      status,
    });

    // 2. AUTO CREATE INCOME (PENDING)
    await Income.create({
      userId,
      description: `Order Payment - ${customerName}'s ${dressType}`,
      amount,
      date: new Date().toISOString().split('T')[0],
      paymentStatus: "Pending Payment",
      orderId: order.id,
    });

    res.status(201).json({ message: "Order created + income pending", order });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed", error: error.message });
  }
};

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.findAll({ include: User });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

export const getAllOrders = async (req, res) => {
  try {
    const userId = req.user.id; // ← ADD THIS

    const orders = await Order.findAll({
      where: { userId }, // ← ADD THIS
      include: [
        { model: User, attributes: ["fullName"] },
        // ... other includes
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ GET all orders by dressType(filtered by user’s selected dress types)
export const getAllOrdersByDressType = async (req, res) => {
  try {
    const userId = req.user.id; // from verifyToken middleware

    // Get user selections
    const userSelections = await UserSelection.findAll({
      where: { userId },
      attributes: ["dressCategoryId", "categoryId", "subCategoryId"],
    });

    if (!userSelections.length) {
      return res.status(200).json([]); // no selections, no orders
    }

    // Extract all dress types (for example, subCategoryId or dressType name)
    const selectedDressTypes = userSelections.map(sel => sel.subCategoryId);

    // Find all orders matching those dress types
    const orders = await Order.findAll({
      where: { dressType: selectedDressTypes },
    //   include: [{ model: User }]
      include: [{ model: User, attributes: ["id", "fullName", "email"] }],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: User });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// UPDATE order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, dressType, amount, status, startDate, deadline } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.update({
      customerName,
      dressType,
      amount,
      status,
      startDate,
      deadline,
    });

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ UPDATE ONLY ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.update({ status });

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// DELETE order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};