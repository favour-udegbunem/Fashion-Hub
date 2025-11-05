// scripts/seedCategories.js
import { sequelize } from "../models/index.js";

(async () => {
  try {
    console.log("🌱 Running 20251027113328-seed-categories.js...");
    const { up } = await import("../seeders/20251027113328-seed-categories.js");

    if (typeof up === "function") {
      await up(sequelize.getQueryInterface(), sequelize.constructor);
      console.log("✅ Categories seeded successfully!");
    } else {
      console.log("⚠️ No 'up' function found in the seeder file!");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed categories:", error);
    process.exit(1);
  }
})();