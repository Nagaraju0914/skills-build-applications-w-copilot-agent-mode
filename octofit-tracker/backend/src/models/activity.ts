import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 0 },
  calories: { type: Number, default: 0, min: 0 },
  date: { type: Date, default: Date.now },
});

export const Activity = model('Activity', activitySchema);
