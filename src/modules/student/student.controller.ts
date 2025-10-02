// controllers/studentController.ts
import { Request, Response } from "express";
import Student, { studentSchema } from "./student.model";

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
