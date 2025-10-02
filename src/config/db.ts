import { Sequelize } from "sequelize";

console.log("database :", process.env.MYSQL_DATABASE);

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD as string,
  {
    host: process.env.MYSQL_HOST as string, // or your remote DB host
    dialect: "mysql", // Sequelize supports many DBs, here we use MySQL
    logging: console.log,
    timezone: "+00:00", // <-- forces UTC
  }
);

export default sequelize;
