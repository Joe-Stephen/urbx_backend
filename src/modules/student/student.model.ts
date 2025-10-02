// models/Student.js
import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db"; // adjust path
import Joi from "joi";

class Student extends Model {}

Student.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE, // stores in UTC by default
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guardianName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guardianPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batchName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admissionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    batchStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    counsellor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leadSource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "active",
        "pending",
        "inactive",
        "completed",
        "dropped"
      ),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "students",
    timestamps: true, // adds createdAt and updatedAt
  }
);
//syncing model
(async () => {
  try {
    console.log("syncing...");
    await Student.sync();
    console.log("✅ Student table created");
  } catch (err) {
    console.error("❌ Failed to create Student table:", err);
  }
})();

//validation using joi
export const studentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  guardianName: Joi.string().required(),
  guardianPhone: Joi.string().required(),
  courseId: Joi.string().required(),
  courseCategory: Joi.string().required(),
  batchName: Joi.string().required(),
  admissionDate: Joi.date().required(),
  batchStartDate: Joi.date().required(),
  enrollmentDate: Joi.date().required(),
  counsellor: Joi.string().required(),
  leadSource: Joi.string().required(),
  status: Joi.string()
    .valid("active", "pending", "inactive", "completed", "dropped")
    .optional(),
});

export default Student;
