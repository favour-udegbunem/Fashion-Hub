import express from "express";
import { upsertUserProfile, getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userProfileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/userProfile", verifyToken, upsertUserProfile);
router.get("/gettingUserProfile", verifyToken, getUserProfile);
router.put("/update/:id", verifyToken, getUserProfile);
router.delete("/delete/:id", verifyToken, getUserProfile);

export default router;