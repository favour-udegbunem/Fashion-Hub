import express from "express";
import {
  createCatalogItem,
  getAllCatalogItems,
  getUserCatalogItems,
  getCatalogItemById,
  updateCatalogItem,
  deleteCatalogItem,
} from "../controllers/catalogController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createCatalogItem", verifyToken, createCatalogItem);
router.get("/getAllCatalogItems", getAllCatalogItems);
router.get("/getUserCatalogItems", verifyToken, getUserCatalogItems);
router.get("/:id", getCatalogItemById);
router.put("/:id", verifyToken, updateCatalogItem);
router.delete("/:id", verifyToken, deleteCatalogItem);

export default router;