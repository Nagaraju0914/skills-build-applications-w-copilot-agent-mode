import { connectToDatabase as connectDatabase } from './config/database';

export async function connectToDatabase() {
  return connectDatabase();
}
