import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db';
import { HealthCheck } from './models/healthCheck';
import apiRoutes from './routes';
import { apiBaseUrl } from './config';

const codespaceName = process.env.CODESPACE_NAME;
const codespacesUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

dotenv.config();

export const app = express();
const port = Number(process.env.PORT || 8000);
const host = '0.0.0.0';

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

app.get('/api/base-url', (_req, res) => {
  res.json({ apiBaseUrl, codespacesUrl });
});

app.use('/api', apiRoutes);

export async function startServer() {
  await connectToDatabase();
  return app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
    console.log(`Codespaces URL: ${codespacesUrl}`);
  });
}
