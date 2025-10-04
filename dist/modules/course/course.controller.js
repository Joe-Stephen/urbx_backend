"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getCourses = exports.createCourse = void 0;
const course_model_1 = __importDefault(require("./course.model"));
const course_model_2 = require("./course.model");
const createCourse = async (req, res) => {
    try {
        const { error, value } = course_model_2.courseSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((e) => e.message),
            });
        }
        //checking for name duplication
        const duplicateCourse = await course_model_1.default.findOne({
            where: { name: value.name, status: "1" },
        });
        if (duplicateCourse) {
            return res.status(400).json({
                success: false,
                message: "Course name already exists.",
            });
        }
        const course = await course_model_1.default.create(value);
        res.status(201).json({ success: true, data: course });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.createCourse = createCourse;
const getCourses = async (req, res) => {
    try {
        const courses = await course_model_1.default.findAll({ where: { status: "1" } });
        res.status(200).json({ success: true, data: courses });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getCourses = getCourses;
const getCourseById = async (req, res) => {
    try {
        const { id } = req.query;
        const course = await course_model_1.default.findByPk(id);
        if (!course) {
            return res
                .status(404)
                .json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, data: course });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getCourseById = getCourseById;
const updateCourse = async (req, res) => {
    try {
        const { id } = req.query;
        const course = await course_model_1.default.findByPk(id);
        if (!course) {
            return res
                .status(404)
                .json({ success: false, message: "Course not found" });
        }
        const { error, value } = course_model_2.courseSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((e) => e.message),
            });
        }
        await course.update(value);
        res.status(200).json({ success: true, data: course });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.updateCourse = updateCourse;
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.query;
        const course = await course_model_1.default.findByPk(id);
        if (!course) {
            return res
                .status(404)
                .json({ success: false, message: "Course not found" });
        }
        await course.destroy();
        res
            .status(200)
            .json({ success: true, message: "Course deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.deleteCourse = deleteCourse;
