import dotenv from "dotenv";
import mysql2 from "mysql2";

dotenv.config();

// const sequelize = new Sequelize(process.env.DB_URL, {
//   dialect: "mysql",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // optional
//     },
//   },
// });

const config = {
  development: {
    url: process.env.DB_URL,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectModule: mysql2,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;