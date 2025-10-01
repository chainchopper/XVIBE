import { createClient, RedisClientType } from 'redis';
import { createLogger } from '../../logger';

const logger = createLogger('RedisService');

class RedisService {
    private client: RedisClientType;
    private isConnected = false;

    constructor(env: Env) {
        if (!env.REDIS_URL) {
            throw new Error('REDIS_URL environment variable is not set.');
        }
        this.client = createClient({ url: env.REDIS_URL });

        this.client.on('error', (err) => {
            logger.error('Redis Client Error', err);
            this.isConnected = false;
        });

        this.client.on('connect', () => {
            logger.info('Connecting to Redis...');
        });

        this.client.on('ready', () => {
            logger.info('Redis client is ready.');
            this.isConnected = true;
        });

        this.client.on('end', () => {
            logger.info('Redis connection closed.');
            this.isConnected = false;
        });
    }

    async connect(): Promise<void> {
        if (!this.isConnected) {
            await this.client.connect();
        }
    }

    async disconnect(): Promise<void> {
        if (this.isConnected) {
            await this.client.quit();
        }
    }

    async set(key: string, value: string, expirationSeconds?: number): Promise<void> {
        await this.connect();
        if (expirationSeconds) {
            await this.client.set(key, value, { EX: expirationSeconds });
        } else {
            await this.client.set(key, value);
        }
    }

    async get(key: string): Promise<string | null> {
        await this.connect();
        return await this.client.get(key);
    }

    async del(key: string): Promise<number> {
        await this.connect();
        return await this.client.del(key);
    }
}

export { RedisService };