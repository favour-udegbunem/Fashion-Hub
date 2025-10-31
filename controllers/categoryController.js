import db  from "../models/index.js";
const { DressCategory, Category, SubCategory } = db;

export const getAllDressCategories = async (req, res) => {
  try {
    const categories = await DressCategory.findAll({
      include: {
        model: Category,
        as: "Categories",
        include: {
          model: SubCategory,
          as: "SubCategories",
        },
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
};