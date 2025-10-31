import db from "../models/index.js";
const { CatalogItem, User } = db;

// ✅ Create a new catalog item
export const createCatalogItem = async (req, res) => {
  try {
    const userId = req.user.id; // from token
    const { designName, category, price, imageUrl, description } = req.body;

    if (!designName || !category || !price || !imageUrl) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Ensure user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const catalogItem = await CatalogItem.create({
      userId,
      designName,
      category,
      price,
      imageUrl, // 💡 link from Cloudinary or frontend upload
      description,
    });

    res.status(201).json({
      message: "Catalog item created successfully",
      catalogItem,
    });
  } catch (error) {
    console.error("Error creating catalog item:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Get all catalog items (for public viewing)
export const getAllCatalogItems = async (req, res) => {
  try {
    const catalogItems = await CatalogItem.findAll({
      include: {
        model: User,
        attributes: ["id", "fullName", "email"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(catalogItems);
  } catch (error) {
    console.error("Error fetching catalog items:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Get all catalog items for a specific logged-in user
export const getUserCatalogItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const catalogItems = await CatalogItem.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    if (!catalogItems.length) {
      return res.status(404).json({ message: "No catalog items found for this user" });
    }

    res.status(200).json({
      message: "User catalog items retrieved successfully",
      catalogItems,
    });
  } catch (error) {
    console.error("Error fetching user catalog items:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Get a single catalog item by ID
export const getCatalogItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const catalogItem = await CatalogItem.findByPk(id, {
      include: { model: User, attributes: ["id", "fullName", "email"] },
    });

    if (!catalogItem) {
      return res.status(404).json({ message: "Catalog item not found" });
    }

    res.status(200).json(catalogItem);
  } catch (error) {
    console.error("Error fetching catalog item:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Update catalog item
export const updateCatalogItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { designName, category, price, imageUrl, description } = req.body;

    const catalogItem = await CatalogItem.findByPk(id);

    if (!catalogItem) {
      return res.status(404).json({ message: "Catalog item not found" });
    }

    await catalogItem.update({
      designName: designName || catalogItem.designName,
      category: category || catalogItem.category,
      price: price || catalogItem.price,
      imageUrl: imageUrl || catalogItem.imageUrl,
      description: description || catalogItem.description,
    });

    res.status(200).json({
      message: "Catalog item updated successfully",
      catalogItem,
    });
  } catch (error) {
    console.error("Error updating catalog item:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Delete catalog item
export const deleteCatalogItem = async (req, res) => {
  try {
    const { id } = req.params;

    const catalogItem = await CatalogItem.findByPk(id);

    if (!catalogItem) {
      return res.status(404).json({ message: "Catalog item not found" });
    }

    await catalogItem.destroy();

    res.status(200).json({ message: "Catalog item deleted successfully" });
  } catch (error) {
    console.error("Error deleting catalog item:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};