// routes/studentRoutes.ts
import express from "express";
import { addStudent } from "./student.controller";

const studentRouter = express.Router();

studentRouter.post("/addStudent", addStudent);

export default studentRouter;
