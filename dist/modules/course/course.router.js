"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const courseRouter = express_1.default.Router();
courseRouter.post("/add", course_controller_1.createCourse);
courseRouter.get("/list", course_controller_1.getCourses);
courseRouter.get("/details", course_controller_1.getCourseById);
courseRouter.put("/update", course_controller_1.updateCourse);
courseRouter.delete("/delete", course_controller_1.deleteCourse);
exports.default = courseRouter;
