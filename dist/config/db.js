"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Detect environment (local or dev)
const ENVIRONMENT = process.env.ENVIRONMENT;
// Choose database credentials based on environment
const DB_NAME = ENVIRONMENT === "local"
    ? process.env.MYSQL_DATABASE_LOCAL
    : process.env.MYSQL_DATABASE_DEV;
const DB_USER = ENVIRONMENT === "local"
    ? process.env.MYSQL_USER_LOCAL
    : process.env.MYSQL_USER_DEV;
const DB_PASSWORD = ENVIRONMENT === "local"
    ? process.env.MYSQL_PASSWORD_LOCAL
    : process.env.MYSQL_PASSWORD_DEV;
const DB_HOST = ENVIRONMENT === "local"
    ? process.env.MYSQL_HOST_LOCAL
    : process.env.MYSQL_HOST_DEV;
// 🔍 Debug Logs — helpful in Render logs or local console
console.log("🔧 Environment Configuration:");
console.log("ENVIRONMENT:", ENVIRONMENT);
console.log("MYSQL_HOST:", DB_HOST);
console.log("MYSQL_DATABASE:", DB_NAME);
console.log("MYSQL_USER:", DB_USER);
console.log("MYSQL_PASSWORD:", DB_PASSWORD ? "✅ [LOADED]" : "❌ [MISSING]");
// Initialize Sequelize
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    logging: console.log,
    timezone: "+00:00", // Force UTC
    dialectOptions: ENVIRONMENT === "local"
        ? { connectTimeout: 60000 }
        : {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            connectTimeout: 60000,
        },
});
exports.default = sequelize;
