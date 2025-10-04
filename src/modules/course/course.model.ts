import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import Joi from "joi";

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    duration: {
      type: DataTypes.STRING,
    },
    fee: {
      type: DataTypes.STRING,
    },
    instructor: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    maxStudents: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("1", "0"),
      defaultValue: "1",
    },
  },
  {
    tableName: "Courses",
  }
);
// Course.sync({ alter: true });

export const courseSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),

  description: Joi.string().allow(""),

  duration: Joi.string().allow(""),

  fee: Joi.string().allow(""),

  instructor: Joi.string().allow(""),

  startDate: Joi.date().iso().allow(null, ""),

  maxStudents: Joi.number().integer().min(1).allow(null),

  status: Joi.string().valid("1", "0").default("1"),
});

export default Course;
