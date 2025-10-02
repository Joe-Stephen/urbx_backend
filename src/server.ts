import app from "./app";
import sequelize from "./config/db";
import masterRouter from "./masterRouter";
const PORT = process.env.PORT || 5000;

// Connect to the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

app.use("/", masterRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
