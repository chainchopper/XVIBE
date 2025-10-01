import { Pool, neon } from '@neondatabase/serverless';
import { createLogger } from '../../logger';

const logger = createLogger('NeonService');

class NeonService {
    private pool: Pool;

    constructor(env: Env) {
        if (!env.NEON_DATABASE_URL) {
            throw new Error('NEON_DATABASE_URL environment variable is not set.');
        }

        this.pool = new Pool({ connectionString: env.NEON_DATABASE_URL });
        logger.info('Neon client initialized.');
    }

    async query(sql: string, params: any[] = []) {
        const { rows } = await this.pool.query(sql, params);
        return rows;
    }

    async end() {
        await this.pool.end();
    }
}

export { NeonService };