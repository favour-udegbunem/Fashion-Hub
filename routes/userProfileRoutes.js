import express from "express";
import { upsertUserProfile, getUserProfile } from "../controllers/userProfileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/userProfile", verifyToken, upsertUserProfile);
router.get("/gettingUserProfile", verifyToken, getUserProfile);

export default router;