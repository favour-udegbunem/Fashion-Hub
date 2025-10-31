import express from "express";
import {
  createCalendarEvent,
  getUserCalendarEvents,
  getCalendarEventById,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../controllers/calendarController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createCalendarEvent);
router.get("/myEvents", verifyToken, getUserCalendarEvents);
router.get("/:id", verifyToken, getCalendarEventById);
router.put("/update/:id", verifyToken, updateCalendarEvent);
router.delete("/delete/:id", verifyToken, deleteCalendarEvent);

export default router;