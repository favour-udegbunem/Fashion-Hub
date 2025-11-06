// import db  from "../models/index.js";
// const { DressCategory, Category, SubCategory } = db;

// export const getAllDressCategories = async (req, res) => {
//   try {
//     const categories = await DressCategory.findAll({
//       include: {
//         model: Category,
//         as: "Categories",
//         include: {
//           model: SubCategory,
//           as: "SubCategories",
//         },
//       },
//     });

//     res.status(200).json(categories);
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ message: "Failed to fetch categories", error: error.message });
//   }
// };

import db from "../models/index.js";
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

    // ✅ Wrap it in an object so frontend can read data.categories
    res.status(200).json({
      message: "Categories fetched successfully",
      categories, // 👈 wrapped properly
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};