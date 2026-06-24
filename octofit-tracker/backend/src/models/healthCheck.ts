import { Schema, model } from 'mongoose';

const healthCheckSchema = new Schema({
  status: { type: String, required: true },
  checkedAt: { type: Date, default: Date.now },
});

export const HealthCheck = model('HealthCheck', healthCheckSchema);
