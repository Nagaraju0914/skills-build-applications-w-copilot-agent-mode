import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db';
import { HealthCheck } from './models/healthCheck';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await connectToDatabase();
    await HealthCheck.create({ status: 'ok' });
    res.json({ status: 'ok', message: 'Octofit backend is running', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
