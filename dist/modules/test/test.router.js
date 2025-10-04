"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_controller_js_1 = require("./test.controller.js");
const testRouter = express_1.default.Router();
testRouter.post("/add", test_controller_js_1.createTest);
testRouter.get("/list", test_controller_js_1.getTests);
testRouter.get("/details", test_controller_js_1.getTestById);
testRouter.put("/update", test_controller_js_1.updateTest);
testRouter.delete("/delete", test_controller_js_1.deleteTest);
exports.default = testRouter;
