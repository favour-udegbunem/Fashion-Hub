import express from "express";
import { createUserSelection, getAllUserSelections } from "../controllers/userSelectionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected route
router.post("/user-selections", verifyToken, createUserSelection);
router.get("/getAllUserSelections", verifyToken, getAllUserSelections);

export default router;