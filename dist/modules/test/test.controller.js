"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTest = exports.updateTest = exports.getTestById = exports.getTests = exports.createTest = void 0;
const sequelize_1 = require("sequelize");
const test_model_js_1 = __importDefault(require("./test.model.js"));
const test_model_js_2 = require("./test.model.js");
const createTest = async (req, res) => {
    try {
        const { error, value } = test_model_js_2.testSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((e) => e.message),
            });
        }
        // Prevent duplicate name
        const duplicate = await test_model_js_1.default.findOne({
            where: { name: value.name, status: "1" },
        });
        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Test name already exists.",
            });
        }
        const test = await test_model_js_1.default.create(value);
        return res.status(201).json({ success: true, data: test });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.createTest = createTest;
const getTests = async (req, res) => {
    try {
        const tests = await test_model_js_1.default.findAll({ where: { status: "1" } });
        return res.status(200).json({ success: true, data: tests });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.getTests = getTests;
const getTestById = async (req, res) => {
    try {
        const { id } = req.query;
        const test = await test_model_js_1.default.findByPk(id);
        if (!test) {
            return res
                .status(404)
                .json({ success: false, message: "Test not found" });
        }
        return res.status(200).json({ success: true, data: test });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.getTestById = getTestById;
const updateTest = async (req, res) => {
    try {
        const { id } = req.query;
        const test = await test_model_js_1.default.findByPk(id);
        if (!test) {
            return res
                .status(404)
                .json({ success: false, message: "Test not found" });
        }
        //duplicate name check
        const duplicate = await test_model_js_1.default.findOne({
            where: { name: req.body.name, id: { [sequelize_1.Op.ne]: id }, status: "1" },
        });
        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "A test with this name already exists.",
            });
        }
        const { error, value } = test_model_js_2.testSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((e) => e.message),
            });
        }
        await test.update(value);
        return res.status(200).json({ success: true, data: test });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.updateTest = updateTest;
const deleteTest = async (req, res) => {
    try {
        const { id } = req.query;
        const test = await test_model_js_1.default.findByPk(id);
        if (!test) {
            return res
                .status(404)
                .json({ success: false, message: "Test not found" });
        }
        await test.destroy();
        res
            .status(200)
            .json({ success: true, message: "Test deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.deleteTest = deleteTest;
