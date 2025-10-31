import db from "../models/index.js";
const { CalendarEvent, User } = db;

// ➕ Create a calendar event
export const createCalendarEvent = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const { eventTitle, eventType, eventDate, eventTime, description } = req.body;

    // Validate required fields
    if (!eventTitle || !eventType || !eventDate || !eventTime) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check valid eventType
    const validTypes = ["Fitting", "Delivery", "Measurement"];
    if (!validTypes.includes(eventType)) {
      return res.status(400).json({ message: "Invalid event type" });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const event = await CalendarEvent.create({
      userId,
      eventTitle,
      eventType,
      eventDate,
      eventTime,
      description,
    });

    res.status(201).json({
      message: "Calendar event created successfully",
      event,
    });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// 📅 Get all events for logged-in user
export const getUserCalendarEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    const events = await CalendarEvent.findAll({
      where: { userId },
      order: [["eventDate", "ASC"]],
    });

    res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 📘 Get a single event
export const getCalendarEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await CalendarEvent.findByPk(id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event fetched successfully", event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✏️ Update event
export const updateCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventTitle, eventType, eventDate, eventTime, description } = req.body;

    const event = await CalendarEvent.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const validTypes = ["Fitting", "Delivery", "Measurement"];
    if (eventType && !validTypes.includes(eventType)) {
      return res.status(400).json({ message: "Invalid event type" });
    }

    await event.update({
      eventTitle: eventTitle || event.eventTitle,
      eventType: eventType || event.eventType,
      eventDate: eventDate || event.eventDate,
      eventTime: eventTime || event.eventTime,
      description: description || event.description,
    });

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ❌ Delete event
export const deleteCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await CalendarEvent.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.destroy();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};