import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  teamName: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
