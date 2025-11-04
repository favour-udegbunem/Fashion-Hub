import db from "../models/index.js";
import subcategory from "../models/subcategory.js";
const { UserSelection, SubCategory } = db;

export const createUserSelection = async (req, res) => {
  try {
    const { dressCategoryId, categoryId, subcategoryId } = req.body;
    const userId = req.user.id; // ✅ from JWT

    // 🔍 Check existing before inserting
    const existing = await UserSelection.findOne({
      where: { userId, dressCategoryId, categoryId, subCategoryId },
    });

    if (existing) {
      return res.status(400).json({ message: "You’ve already selected this category" });
    }

    // ✅ Create new selection
    const selection = await UserSelection.create({
      dressCategoryId,
      categoryId,
      subCategoryId,
      userId,
    });

    res.status(201).json({
      message: "Selection saved successfully",
      selection,
    });
  } catch (error) {
    console.error("Error creating user selection:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllUserSelections = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from JWT

    // Fetch all selections by userId
    const selections = await UserSelection.findAll({
      where: { userId },
      include: [
        {
          model: SubCategory,
          as: "SubCategory",
          attributes: ["name"], // ✅ only get the name
        },
      ],
      order: [["createdAt", "DESC"]], // ✅ this is correct
    });

    if (!selections || selections.length === 0) {
      return res.status(404).json({
        message: "No selections found for this user",
      });
    }

    res.status(200).json({
      message: "User selections retrieved successfully",
      selections,
    });
  } catch (error) {
    console.error("Error fetching user selections:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};