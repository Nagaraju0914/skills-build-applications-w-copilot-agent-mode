import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  durationMinutes: { type: Number, required: true, min: 0 },
  difficulty: { type: String, default: 'beginner' },
  category: { type: String, default: 'cardio' },
  createdAt: { type: Date, default: Date.now },
});

export const Workout = model('Workout', workoutSchema);
