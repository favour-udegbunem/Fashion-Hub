import db from "../models/index.js";
// import SubCategory from "../models/subcategory.js";
const { UserSelection, SubCategory } = db;

// export const createUserSelection = async (req, res) => {
//   try {
//     const { dressCategoryId, categoryId, subCategoryId } = req.body;
//     const userId = req.user.id; // ✅ from JWT

//     // 🔍 Check existing before inserting
//     const existing = await UserSelection.findOne({
//       where: { userId, dressCategoryId, categoryId, subCategoryId },
//     });

//     if (existing) {
//       return res.status(400).json({ message: "You’ve already selected this category" });
//     }

//     // ✅ Create new selection
//     const selection = await UserSelection.create({
//       dressCategoryId,
//       categoryId,
//       subCategoryId,
//       userId,
//     });

//     res.status(201).json({
//       message: "Selection saved successfully",
//       selection,
//     });
//   } catch (error) {
//     console.error("Error creating user selection:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };
// export const getAllUserSelections = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const selections = await UserSelection.findAll({
//       where: { userId },
//       include: [
//         {
//           model: SubCategory,
//           as: "SubCategory",
//           attributes: ["name"],
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//     });

//     if (!selections || selections.length === 0) {
//       return res.status(200).json({
//         message: "No selections found for this user",
//         categories: [], // ✅ matches frontend
//         selected: [],   // optional, if frontend uses this
//       });
//     }

//     res.status(200).json({
//       message: "User selections retrieved successfully",
//       categories: selections, // ✅ rename to categories
//       selected: selections.map((s) => s.subCategoryId), // optional
//     });
//   } catch (error) {
//     console.error("Error fetching user selections:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };


export const createUserSelection = async (req, res) => {
  try {
    const { dressCategoryId, categoryId, subCategoryIds } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(subCategoryIds) || subCategoryIds.length === 0) {
      return res.status(400).json({ message: "No subcategories selected" });
    }

    const created = [];

    for (const subCategoryId of subCategoryIds) {
      const exists = await UserSelection.findOne({
        where: { userId, dressCategoryId, categoryId, subCategoryId },
      });
      if (!exists) {
        const selection = await UserSelection.create({
          userId,
          dressCategoryId,
          categoryId,
          subCategoryId,
        });
        created.push(selection);
      }
    }

    res.status(201).json({
      message: "Selections saved successfully",
      selections: created,
    });
  } catch (error) {
    console.error("Error saving selections:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};