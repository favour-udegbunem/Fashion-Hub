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

    // 🧠 Only run `alter: true` in development
    if (process.env.NODE_ENV === "development") {
      await db.sequelize.sync({ alter: true });
      console.log("🛠️ Database synced (development mode)");
    } else {
      // In production, just ensure connection — don't alter schema
      await db.sequelize.sync();
      console.log("🚀 Database sync skipped (production mode)");
    }

    // Start server
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

// ✅ Only run seeders automatically in production (optional)
if (process.env.NODE_ENV === "production") {
  import("./scripts/seedCategories.js")
    .then(() => console.log("✅ Seed categories run successfully"))
    .catch((err) => console.error("❌ Error running seed:", err));
}