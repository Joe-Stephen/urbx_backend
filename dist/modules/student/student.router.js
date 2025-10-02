"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/studentRoutes.ts
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const studentRouter = express_1.default.Router();
studentRouter.post("/add", student_controller_1.addStudent);
studentRouter.get("/list", student_controller_1.listStudents);
exports.default = studentRouter;
