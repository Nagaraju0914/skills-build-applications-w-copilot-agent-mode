import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  age: { type: Number, min: 0 },
  fitnessGoal: { type: String, default: 'General fitness' },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  createdAt: { type: Date, default: Date.now },
});

export const User = model('User', userSchema);
