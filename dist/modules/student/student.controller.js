"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStudents = exports.addStudent = void 0;
const student_model_1 = __importStar(require("./student.model"));
/**
 * Adds a new student to the database.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<Response>} - A promise resolving to the HTTP response object.
 * @throws {Response} - A 400 response with validation errors, a 500 response with a server error, or a 400 response with an email already exists error.
 */
const addStudent = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = student_model_1.studentSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map((d) => d.message),
            });
        }
        // Ensure all dates are treated as UTC
        const dateFields = [
            "dateOfBirth",
            "admissionDate",
            "batchStartDate",
            "enrollmentDate",
        ];
        dateFields.forEach((field) => {
            if (value[field]) {
                value[field] = new Date(value[field]); // JS Date in UTC
            }
        });
        // Create student
        const newStudent = await student_model_1.default.create(value);
        return res.status(201).json({
            message: "Student added successfully",
            student: newStudent,
        });
    }
    catch (err) {
        console.error(err);
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "Email already exists." });
        }
        return res
            .status(500)
            .json({ message: "Server error", error: err.message });
    }
};
exports.addStudent = addStudent;
/**
 * Retrieves a list of all students from the database.
 * @returns {Promise<Response>} - A promise resolving to the HTTP response object.
 * @throws {Response} - A 500 response with a server error.
 */
const listStudents = async (req, res) => {
    try {
        const students = await student_model_1.default.findAll({
            order: [["createdAt", "DESC"]], // Optional: order by creation date
        });
        return res.status(200).json({
            message: "Students fetched successfully",
            students,
        });
    }
    catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Server error", error: err.message });
    }
};
exports.listStudents = listStudents;
