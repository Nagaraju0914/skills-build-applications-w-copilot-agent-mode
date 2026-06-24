"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const healthCheck_1 = require("./models/healthCheck");
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const codespaceName = process.env.CODESPACE_NAME;
const codespacesUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const host = '0.0.0.0';
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/api/health', async (_req, res) => {
    try {
        await (0, db_1.connectToDatabase)();
        await healthCheck_1.HealthCheck.create({ status: 'ok' });
        res.json({ status: 'ok', message: 'Octofit backend is running', database: 'connected' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
});
exports.app.get('/api/base-url', (_req, res) => {
    res.json({ apiBaseUrl: config_1.apiBaseUrl, codespacesUrl });
});
exports.app.use('/api', routes_1.default);
async function startServer() {
    await (0, db_1.connectToDatabase)();
    return exports.app.listen(port, host, () => {
        console.log(`Server listening on http://${host}:${port}`);
        console.log(`API base URL: ${config_1.apiBaseUrl}`);
        console.log(`Codespaces URL: ${codespacesUrl}`);
    });
}
