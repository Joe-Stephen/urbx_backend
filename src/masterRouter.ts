// routes/studentRoutes.ts
import { Router } from "express";
import studentRouter from "./modules/student/student.router";
const masterRouter = Router();
masterRouter.use("/student", studentRouter);
export default masterRouter;
