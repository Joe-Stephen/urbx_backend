"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
console.log("database :", process.env.MYSQL_DATABASE);
const sequelize = new sequelize_1.Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST, // or your remote DB host
    dialect: "mysql", // Sequelize supports many DBs, here we use MySQL
    logging: console.log,
    timezone: "+00:00", // <-- forces UTC
});
exports.default = sequelize;
