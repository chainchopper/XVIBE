import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createLogger } from '../../logger';

const logger = createLogger('SupabaseService');

class SupabaseService {
    private client: SupabaseClient;

    constructor(env: Env) {
        if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
            throw new Error('Supabase environment variables are not set.');
        }

        this.client = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
        logger.info('Supabase client initialized.');
    }

    getClient(): SupabaseClient {
        return this.client;
    }
}

export { SupabaseService };