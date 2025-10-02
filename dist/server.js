"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const masterRouter_1 = __importDefault(require("./masterRouter"));
const PORT = process.env.PORT || 5000;
// Connect to the database
(async () => {
    try {
        await db_1.default.authenticate();
        console.log("✅ Connection has been established successfully!");
    }
    catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
})();
app_1.default.use("/", masterRouter_1.default);
app_1.default.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
