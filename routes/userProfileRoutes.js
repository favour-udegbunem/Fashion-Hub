import express from "express";
import { upsertUserProfile, getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userProfileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/userProfile", verifyToken, upsertUserProfile);
router.get("/gettingUserProfile", verifyToken, getUserProfile);
router.put("/userProfile/update/", verifyToken, updateUserProfile);
router.delete("/userProfile/delete/", verifyToken, deleteUserProfile);

export default router;