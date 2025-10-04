"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseSchema = void 0;
const sequelize_1 = require("sequelize");
const db_js_1 = __importDefault(require("../../config/db.js"));
const joi_1 = __importDefault(require("joi"));
const Course = db_js_1.default.define("Course", {
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
    duration: {
        type: sequelize_1.DataTypes.STRING,
    },
    fee: {
        type: sequelize_1.DataTypes.STRING,
    },
    instructor: {
        type: sequelize_1.DataTypes.STRING,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    maxStudents: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("1", "0"),
        defaultValue: "1",
    },
}, {
    tableName: "Courses",
});
// Course.sync({ alter: true });
exports.courseSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "string.empty": "Name is required",
    }),
    description: joi_1.default.string().allow(""),
    duration: joi_1.default.string().allow(""),
    fee: joi_1.default.string().allow(""),
    instructor: joi_1.default.string().allow(""),
    startDate: joi_1.default.date().iso().allow(null, ""),
    maxStudents: joi_1.default.number().integer().min(1).allow(null),
    status: joi_1.default.string().valid("1", "0").default("1"),
});
exports.default = Course;
