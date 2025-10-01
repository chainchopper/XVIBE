import { serve } from '@hono/node-server';
import { createApp } from './worker/app';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .dev.vars for local development
const devVarsPath = path.join(__dirname, '.dev.vars');
if (fs.existsSync(devVarsPath)) {
  const devVars = fs.readFileSync(devVarsPath, 'utf-8');
  const parsed = dotenv.parse(devVars);
  Object.assign(process.env, parsed);
}

// The `env` object for the standalone server will be constructed from `process.env`.
// This is a simplified approach. For a full implementation, bindings like D1, R2, etc.,
// would need to be replaced with their standalone equivalents (e.g., a PostgreSQL client).
const env = new Proxy(process.env, {
    get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
    }
}) as any as Env;


const app = createApp(env);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8787;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});