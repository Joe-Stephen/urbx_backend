// routes/studentRoutes.ts
import express from "express";
import { addStudent, listStudents } from "./student.controller";

const studentRouter = express.Router();

studentRouter.post("/add", addStudent);
studentRouter.get("/list", listStudents);

export default studentRouter;
