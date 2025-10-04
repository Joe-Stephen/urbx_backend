// routes/studentRoutes.ts
import { Router } from "express";
import studentRouter from "./modules/student/student.router";
import courseRouter from "./modules/course/course.router";
const masterRouter = Router();
masterRouter.use("/student", studentRouter);
masterRouter.use("/course", courseRouter);
export default masterRouter;
