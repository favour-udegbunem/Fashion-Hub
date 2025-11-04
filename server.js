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


// Sync models if needed (optional — for dev only)
await sequelize.drop();
console.log("✅ All tables dropped successfully");

await sequelize.sync({ force: true });
console.log("✅ Database synced successfully");

// Test DB connection and start server
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Database connection error:", err));