import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import Joi from "joi";

const Test = sequelize.define(
  "Test",
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
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING, // e.g. "1 hour", "30 mins"
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM("1", "0"),
      defaultValue: "1", // 1 = active, 0 = inactive
    },
  },
  {
    tableName: "Tests",
  }
);
// Test.sync({ alter: true });
export const testSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  description: Joi.string().allow(""),
  totalMarks: Joi.number().integer().required().messages({
    "number.base": "Total marks must be a number",
    "any.required": "Total marks are required",
  }),
  duration: Joi.string().allow(""),
  startDate: Joi.date().iso().allow(null, ""),
  endDate: Joi.date().iso().allow(null, ""),
  status: Joi.string().valid("1", "0").default("1"),
});

export default Test;
