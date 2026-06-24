"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    calories: { type: Number, default: 0, min: 0 },
    date: { type: Date, default: Date.now },
});
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
