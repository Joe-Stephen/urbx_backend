import { Sequelize } from "sequelize";

// Detect environment (local or dev)
const ENVIRONMENT = process.env.ENVIRONMENT as string;

// Choose database credentials based on environment
const DB_NAME =
  ENVIRONMENT === "local"
    ? (process.env.MYSQL_DATABASE_LOCAL as string)
    : (process.env.MYSQL_DATABASE_DEV as string);

const DB_USER =
  ENVIRONMENT === "local"
    ? (process.env.MYSQL_USER_LOCAL as string)
    : (process.env.MYSQL_USER_DEV as string);

const DB_PASSWORD =
  ENVIRONMENT === "local"
    ? (process.env.MYSQL_PASSWORD_LOCAL as string)
    : (process.env.MYSQL_PASSWORD_DEV as string);

const DB_HOST =
  ENVIRONMENT === "local"
    ? (process.env.MYSQL_HOST_LOCAL as string)
    : (process.env.MYSQL_HOST_DEV as string);

// 🔍 Debug Logs — helpful in Render logs or local console
console.log("🔧 Environment Configuration:");
console.log("ENVIRONMENT:", ENVIRONMENT);
console.log("MYSQL_HOST:", DB_HOST);
console.log("MYSQL_DATABASE:", DB_NAME);
console.log("MYSQL_USER:", DB_USER);
console.log("MYSQL_PASSWORD:", DB_PASSWORD ? "✅ [LOADED]" : "❌ [MISSING]");

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: console.log,
  timezone: "+00:00", // Force UTC
  dialectOptions:
    ENVIRONMENT === "local"
      ? { connectTimeout: 60000 }
      : {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          connectTimeout: 60000,
        },
});

export default sequelize;
