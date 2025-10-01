import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .dev.vars
const devVarsPath = path.join(__dirname, '.dev.vars');
if (fs.existsSync(devVarsPath)) {
  const devVars = fs.readFileSync(devVarsPath, 'utf-8');
  const parsed = dotenv.parse(devVars);
  Object.assign(process.env, parsed);
}

export default defineConfig({
  schema: './worker/database/schema.ts',
  out: './migrations_postgres', // Separate migrations directory for PostgreSQL
  dialect: 'postgresql',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
});