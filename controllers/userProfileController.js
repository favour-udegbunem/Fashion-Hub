import db from "../models/index.js";
const { UserProfile } = db;

// ✅ Helper: Convert WhatsApp number to link
const formatWhatsAppLink = (number) => {
  if (!number) return null;
  const cleaned = number.replace(/\D/g, ""); // Remove +, -, spaces, etc.
  return `https://wa.me/${cleaned}`;
};

// Create or Update user profile
export const upsertUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming from JWT middleware
    const { businessImage, whatsappNumber } = req.body;

    if (!businessImage || !whatsappNumber) {
      return res.status(400).json({
        message: "businessImage and whatsappNumber are required",
      });
    }

    const whatsappLink = formatWhatsAppLink(whatsappNumber);

    // Upsert = update if exists, else create
    const [profile, created] = await UserProfile.upsert(
      {
        userId,
        businessImage,
        whatsappNumber,
        whatsappLink,
      },
      { returning: true }
    );

    return res.status(created ? 201 : 200).json({
      message: created
        ? "Profile created successfully"
        : "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get current user's profile
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

// Update profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { businessImage, whatsappNumber } = req.body;

    const profile = await UserProfile.findOne({ where: { userId } });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updatedData = {};
    if (businessImage) updatedData.businessImage = businessImage;
    if (whatsappNumber) {
      updatedData.whatsappNumber = whatsappNumber;
      updatedData.whatsappLink = formatWhatsAppLink(whatsappNumber);
    }

    await profile.update(updatedData);

    return res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

//  Delete profile
export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;

    const profile = await UserProfile.findOne({ where: { userId } });
    if (!profile)
      return res.status(404).json({ message: "Profile not found" });

    await profile.destroy();

    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};