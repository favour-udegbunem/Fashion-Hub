import express from "express";
import { getAllDressCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/all", getAllDressCategories);

export default router;