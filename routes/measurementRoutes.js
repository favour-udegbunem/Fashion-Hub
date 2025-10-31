import express from "express";
import {
  createMeasurement,
  getAllMeasurements,
  getMeasurementById,
  updateMeasurement,
  deleteMeasurement,
} from "../controllers/measurementController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createMeasurement", verifyToken, createMeasurement);
router.get("/getAllMeasurements", verifyToken, getAllMeasurements);
router.get("/getSingle/:id", verifyToken, getMeasurementById);
router.put("/update/:id", verifyToken, updateMeasurement);
router.delete("/delete/:id", verifyToken, deleteMeasurement);

export default router;