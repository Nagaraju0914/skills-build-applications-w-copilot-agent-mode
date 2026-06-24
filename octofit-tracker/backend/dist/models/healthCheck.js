"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheck = void 0;
const mongoose_1 = require("mongoose");
const healthCheckSchema = new mongoose_1.Schema({
    status: { type: String, required: true },
    checkedAt: { type: Date, default: Date.now },
});
exports.HealthCheck = (0, mongoose_1.model)('HealthCheck', healthCheckSchema);
