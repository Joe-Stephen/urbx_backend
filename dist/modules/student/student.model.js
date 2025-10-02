"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = void 0;
// models/Student.js
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db")); // adjust path
const joi_1 = __importDefault(require("joi"));
class Student extends sequelize_1.Model {
}
Student.init({
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: sequelize_1.DataTypes.DATE, // stores in UTC by default
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    district: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    guardianName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    guardianPhone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    courseCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    batchName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    admissionDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    batchStartDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    enrollmentDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    counsellor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    leadSource: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "pending", "inactive", "completed", "dropped"),
        allowNull: false,
        defaultValue: "active",
    },
}, {
    sequelize: db_1.default,
    modelName: "Student",
    tableName: "students",
    timestamps: true, // adds createdAt and updatedAt
});
//syncing model
// (async () => {
//   try {
//     console.log("syncing...");
//     await Student.sync();
//     console.log("✅ Student table created/updated");
//   } catch (err) {
//     console.error("❌ Failed to create Student table:", err);
//   }
// })();
//validation using joi
exports.studentSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    dateOfBirth: joi_1.default.date().required(),
    gender: joi_1.default.string().valid("male", "female", "other").required(),
    address: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    district: joi_1.default.string().required(),
    guardianName: joi_1.default.string().required(),
    guardianPhone: joi_1.default.string().required(),
    courseId: joi_1.default.string().required(),
    courseCategory: joi_1.default.string().required(),
    batchName: joi_1.default.string().required(),
    admissionDate: joi_1.default.date().required(),
    batchStartDate: joi_1.default.date().required(),
    enrollmentDate: joi_1.default.date().required(),
    counsellor: joi_1.default.string().required(),
    leadSource: joi_1.default.string().required(),
    status: joi_1.default.string()
        .valid("active", "pending", "inactive", "completed", "dropped")
        .optional(),
});
exports.default = Student;
