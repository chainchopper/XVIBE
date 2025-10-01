import * as Minio from 'minio';
import { createLogger } from '../../logger';

const logger = createLogger('MinioService');

class MinioService {
    private client: Minio.Client;

    constructor(env: Env) {
        if (!env.MINIO_ENDPOINT || !env.MINIO_PORT || !env.MINIO_ACCESS_KEY || !env.MINIO_SECRET_KEY) {
            throw new Error('Minio environment variables are not set.');
        }

        this.client = new Minio.Client({
            endPoint: env.MINIO_ENDPOINT,
            port: parseInt(env.MINIO_PORT, 10),
            useSSL: env.MINIO_USE_SSL === 'true',
            accessKey: env.MINIO_ACCESS_KEY,
            secretKey: env.MINIO_SECRET_KEY,
        });
    }

    async makeBucket(bucketName: string, region: string = 'us-east-1'): Promise<void> {
        logger.info(`Creating bucket: ${bucketName}`);
        await this.client.makeBucket(bucketName, region);
    }

    async bucketExists(bucketName: string): Promise<boolean> {
        logger.info(`Checking if bucket exists: ${bucketName}`);
        return await this.client.bucketExists(bucketName);
    }

    async fPutObject(bucketName: string, objectName: string, filePath: string, metaData: any): Promise<Minio.UploadedObjectInfo> {
        logger.info(`Uploading object ${objectName} to bucket ${bucketName} from path ${filePath}`);
        return await this.client.fPutObject(bucketName, objectName, filePath, metaData);
    }
}

export { MinioService };