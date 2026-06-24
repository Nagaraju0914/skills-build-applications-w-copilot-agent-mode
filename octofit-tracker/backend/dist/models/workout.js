"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, required: true, min: 0 },
    difficulty: { type: String, default: 'beginner' },
    category: { type: String, default: 'cardio' },
    createdAt: { type: Date, default: Date.now },
});
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
