import Course from "./course.model";
import { courseSchema } from "./course.model";

export const createCourse = async (req: any, res: any) => {
  try {
    const { error, value } = courseSchema.validate(req.body, {
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
    const duplicateCourse = await Course.findOne({
      where: { name: value.name, status: "1" },
    });
    if (duplicateCourse) {
      return res.status(400).json({
        success: false,
        message: "Course name already exists.",
      });
    }
    const course = await Course.create(value);
    res.status(201).json({ success: true, data: course });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCourses = async (req: any, res: any) => {
  try {
    const courses = await Course.findAll({ where: { status: "1" } });
    res.status(200).json({ success: true, data: courses });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCourseById = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const course = await Course.findByPk(id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCourse = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const course = await Course.findByPk(id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const { error, value } = courseSchema.validate(req.body, {
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
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCourse = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const course = await Course.findByPk(id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    await course.destroy();
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
