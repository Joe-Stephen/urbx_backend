import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "./course.controller";

const courseRouter = express.Router();

courseRouter.post("/add", createCourse);
courseRouter.get("/list", getCourses);
courseRouter.get("/details", getCourseById);
courseRouter.put("/update", updateCourse);
courseRouter.delete("/delete", deleteCourse);

export default courseRouter;
