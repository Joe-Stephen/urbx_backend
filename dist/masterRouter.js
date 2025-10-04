"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/studentRoutes.ts
const express_1 = require("express");
const student_router_1 = __importDefault(require("./modules/student/student.router"));
const course_router_1 = __importDefault(require("./modules/course/course.router"));
const test_router_1 = __importDefault(require("./modules/test/test.router"));
const masterRouter = (0, express_1.Router)();
masterRouter.use("/student", student_router_1.default);
masterRouter.use("/course", course_router_1.default);
masterRouter.use("/test", test_router_1.default);
exports.default = masterRouter;
