// ✅ Get current user's profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const profile = await UserProfile.findOne({ where: { userId } });

    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    return res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: User });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};