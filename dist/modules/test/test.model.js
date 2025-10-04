"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSchema = void 0;
const sequelize_1 = require("sequelize");
const db_js_1 = __importDefault(require("../../config/db.js"));
const joi_1 = __importDefault(require("joi"));
const Test = db_js_1.default.define("Test", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    totalMarks: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.STRING, // e.g. "1 hour", "30 mins"
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("1", "0"),
        defaultValue: "1", // 1 = active, 0 = inactive
    },
}, {
    tableName: "Tests",
});
// Test.sync({ alter: true });
exports.testSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "string.empty": "Name is required",
    }),
    description: joi_1.default.string().allow(""),
    totalMarks: joi_1.default.number().integer().required().messages({
        "number.base": "Total marks must be a number",
        "any.required": "Total marks are required",
    }),
    duration: joi_1.default.string().allow(""),
    startDate: joi_1.default.date().iso().allow(null, ""),
    endDate: joi_1.default.date().iso().allow(null, ""),
    status: joi_1.default.string().valid("1", "0").default("1"),
});
exports.default = Test;
