import { Op } from "sequelize";
import Test from "./test.model.js";
import { testSchema } from "./test.model.js";

export const createTest = async (req: any, res: any) => {
  try {
    const { error, value } = testSchema.validate(req.body, {
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
    const duplicate = await Test.findOne({
      where: { name: value.name, status: "1" },
    });
    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Test name already exists.",
      });
    }
    const test = await Test.create(value);
    return res.status(201).json({ success: true, data: test });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getTests = async (req: any, res: any) => {
  try {
    const tests = await Test.findAll({ where: { status: "1" } });
    return res.status(200).json({ success: true, data: tests });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getTestById = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const test = await Test.findByPk(id);
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }
    return res.status(200).json({ success: true, data: test });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateTest = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const test = await Test.findByPk(id);
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }
    //duplicate name check
    const duplicate = await Test.findOne({
      where: { name: req.body.name, id: { [Op.ne]: id }, status: "1" },
    });
    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "A test with this name already exists.",
      });
    }
    const { error, value } = testSchema.validate(req.body, {
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
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteTest = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const test = await Test.findByPk(id);
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }
    await test.destroy();
    res
      .status(200)
      .json({ success: true, message: "Test deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
