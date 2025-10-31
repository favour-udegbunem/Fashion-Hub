// require("dotenv").config();
// const mysql2 = require("mysql2");

// module.exports = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: process.env.DB_DIALECT || "mysql",
//     dialectModule: mysql2,
//     logging: false,
//   },
//   test: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT || "mysql",
//     dialectModule: mysql2,
//   },
//   production: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT || "mysql",
//     dialectModule: mysql2,
//   },
// };


import dotenv from "dotenv";
import mysql2 from "mysql2";

dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectModule: mysql2,
    logging: false,
  },
};

export default config;