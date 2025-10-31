import db from "../models/index.js";
const { User } = db;

/* =======================
   🧩 GET ALL USERS (Admin only)
======================= */
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "All users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

/* =======================
   🧩 GET SINGLE USER (Admin or Self)
======================= */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Allow admin or the owner
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

/* =======================
   🧩 UPDATE USER (Admin or Self)
======================= */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Allow admin or the owner
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { fullName, email, businessName, whatsappNumber, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({
      fullName: fullName ?? user.fullName,
      email: email ?? user.email,
      businessName: businessName ?? user.businessName,
      whatsappNumber: whatsappNumber ?? user.whatsappNumber,
      role: req.user.role === "admin" ? role ?? user.role : user.role, // only admin can change role
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

/* =======================
   🧩 DELETE USER (Admin or Self)
======================= */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};