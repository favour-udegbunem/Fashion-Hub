import db from "../models/index.js";
const { Measurement, User } = db;

// Create measurement
export const createMeasurement = async (req, res) => {
  try {
    const userId = req.user.id; // from token
    const { upperBody, waistAndHips, fullLength, optional } = req.body;

    if (!upperBody || !waistAndHips || !fullLength) {
      return res.status(400).json({ message: "Main measurement sections are required" });
    }

    // Ensure user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const measurement = await Measurement.create({
      userId,
      upperBody,
      waistAndHips,
      fullLength,
      optional,
    });

    res.status(201).json({
      message: "Measurement created successfully",
      measurement,
    });
  } catch (error) {
    console.error("Error creating measurement:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all measurements
export const getAllMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.findAll({
      include: { model: User, attributes: ["id", "fullName", "email"] },
    });

    res.status(200).json(measurements);
  } catch (error) {
    console.error("Error fetching measurements:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get single measurement
export const getMeasurementById = async (req, res) => {
  try {
    const { id } = req.params;
    const measurement = await Measurement.findByPk(id, {
      include: { model: User, attributes: ["id", "fullName", "email"] },
    });

    if (!measurement)
      return res.status(404).json({ message: "Measurement not found" });

    res.status(200).json(measurement);
  } catch (error) {
    console.error("Error fetching measurement:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update measurement
export const updateMeasurement = async (req, res) => {
  try {
    const { id } = req.params;
    const { upperBody, waistAndHips, fullLength, optional } = req.body;

    const measurement = await Measurement.findByPk(id);
    if (!measurement)
      return res.status(404).json({ message: "Measurement not found" });

    await measurement.update({
      upperBody: upperBody || measurement.upperBody,
      waistAndHips: waistAndHips || measurement.waistAndHips,
      fullLength: fullLength || measurement.fullLength,
      optional: optional || measurement.optional,
    });

    res.status(200).json({
      message: "Measurement updated successfully",
      measurement,
    });
  } catch (error) {
    console.error("Error updating measurement:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete measurement
export const deleteMeasurement = async (req, res) => {
  try {
    const { id } = req.params;
    const measurement = await Measurement.findByPk(id);

    if (!measurement)
      return res.status(404).json({ message: "Measurement not found" });

    await measurement.destroy();
    res.status(200).json({ message: "Measurement deleted successfully" });
  } catch (error) {
    console.error("Error deleting measurement:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};