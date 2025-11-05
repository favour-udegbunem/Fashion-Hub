import { Sequelize, DataTypes } from "sequelize";

// Import models
import dbConfig from "../config/config.js";
import UserModel from "./user.js";
import OrderModel from "./order.js";
import MeasurementModel from "./measurement.js";
import CatalogItemModel from "./catalogitem.js";
import IncomeModel from "./income.js";
import ExpenseModel from "./expense.js";
import SettingModel from "./setting.js";
import DressCategoryModel from "./dresscategory.js";
import CategoryModel from "./category.js";
import SubCategoryModel from "./subcategory.js";
import UserSelectionModel from "./userselection.js";
import UserProfileModel from "./userprofile.js";
import CalendarEventModel from "./calendarevent.js";

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const Measurement = MeasurementModel(sequelize, DataTypes);
const CatalogItem = CatalogItemModel(sequelize, DataTypes);
const Income = IncomeModel(sequelize, DataTypes);
const Expense = ExpenseModel(sequelize, DataTypes);
const Setting = SettingModel(sequelize, DataTypes);
const DressCategory = DressCategoryModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const SubCategory = SubCategoryModel(sequelize, DataTypes);
const UserSelection = UserSelectionModel(sequelize, DataTypes);
const UserProfile = UserProfileModel(sequelize, DataTypes);
const CalendarEvent = CalendarEventModel(sequelize, DataTypes);

// Run associations
User.associate?.({
  Order,
  Measurement,
  CatalogItem,
  Income,
  Expense,
  Setting,
  UserSelection,
  UserProfile,
  CalendarEvent,
});

Order.associate?.({ User });
Measurement.associate?.({ User });
CatalogItem.associate?.({ User });
Income.associate?.({ User, Order });
Expense.associate?.({ User });
Setting.associate?.({ User });
DressCategory.associate?.({ Category, UserSelection });
Category.associate?.({ DressCategory, SubCategory, UserSelection });
SubCategory.associate?.({ Category, UserSelection });
UserSelection.associate?.({ User, DressCategory, Category, SubCategory });
UserProfile.associate?.({ User });

// ✅ Fixed typo: was `assocaite`
CalendarEvent.associate?.({ User });

// Export all models
const db = {
  sequelize,
  Sequelize,
  User,
  Order,
  Measurement,
  CatalogItem,
  Income,
  Expense,
  Setting,
  DressCategory,
  Category,
  SubCategory,
  UserSelection,
  UserProfile,
  CalendarEvent,
};

export default db;
export { sequelize };