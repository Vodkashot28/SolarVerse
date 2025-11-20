import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Ensure DATABASE_URL is defined
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in .env");
}

// Initialize Neon SQL client
const sql = neon(databaseUrl);

// Export Drizzle ORM instance
export const db = drizzle(sql);
