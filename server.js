import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./models/index.js";
import db from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";
import userSelectionRoutes from "./routes/userSelectionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userprofile from "./routes/userProfileRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import measurementRoutes from "./routes/measurementRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoute from "./routes/expenseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🎉 Welcome to Fashion Hub Backend! It is Live and Running Smoothly 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api", userSelectionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api", userprofile)
app.use("/api", orderRoutes)
app.use("/api/measurements", measurementRoutes)
app.use("/api/catalog", catalogRoutes)
app.use("/api", calendarRoutes)
app.use("/api/income", incomeRoutes)
app.use("/api/expense", expenseRoute)
app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 5000;


(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Connected to TiDB Cloud successfully!");

    // Sync models without dropping tables
    await db.sequelize.sync({ alter: true });

    // Start server
    app.listen(process.env.PORT || 4000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 4000}`)
    );
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

if (process.env.NODE_ENV === "production") {
  import("./scripts/seedCategories.js")
    .then(() => console.log("✅ Seed categories run successfully"))
    .catch((err) => console.error("❌ Error running seed:", err));
}