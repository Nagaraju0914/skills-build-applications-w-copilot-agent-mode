"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const healthCheck_1 = require("./models/healthCheck");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', async (_req, res) => {
    try {
        await (0, db_1.connectToDatabase)();
        await healthCheck_1.HealthCheck.create({ status: 'ok' });
        res.json({ status: 'ok', message: 'Octofit backend is running', database: 'connected' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
});
app.use('/api', routes_1.default);
async function startServer() {
    await (0, db_1.connectToDatabase)();
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
