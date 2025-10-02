// controllers/studentController.ts
import { Request, Response } from "express";
import Student, { studentSchema } from "./student.model";

/**
 * Adds a new student to the database.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<Response>} - A promise resolving to the HTTP response object.
 * @throws {Response} - A 400 response with validation errors, a 500 response with a server error, or a 400 response with an email already exists error.
 */
export const addStudent = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { error, value } = studentSchema.validate(req.body, {
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
    const newStudent = await Student.create(value);
    return res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
    });
  } catch (err: any) {
    console.error(err);
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email already exists." });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * Retrieves a list of all students from the database.
 * @returns {Promise<Response>} - A promise resolving to the HTTP response object.
 * @throws {Response} - A 500 response with a server error.
 */
export const listStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll({
      order: [["createdAt", "DESC"]], // Optional: order by creation date
    });
    return res.status(200).json({
      message: "Students fetched successfully",
      students,
    });
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
