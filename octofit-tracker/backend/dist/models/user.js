"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, min: 0 },
    fitnessGoal: { type: String, default: 'General fitness' },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    createdAt: { type: Date, default: Date.now },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
