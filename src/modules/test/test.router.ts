import express from "express";
import {
  createTest,
  getTests,
  getTestById,
  updateTest,
  deleteTest,
} from "./test.controller.js";

const testRouter = express.Router();

testRouter.post("/add", createTest);
testRouter.get("/list", getTests);
testRouter.get("/details", getTestById);
testRouter.put("/update", updateTest);
testRouter.delete("/delete", deleteTest);

export default testRouter;
