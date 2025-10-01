import * as tf from '@tensorflow/tfjs-node';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { createLogger } from '../../logger';

const logger = createLogger('ObjectDetectionService');

class ObjectDetectionService {
    private model: cocoSsd.ObjectDetection | null = null;

    async loadModel(): Promise<void> {
        if (!this.model) {
            logger.info('Loading COCO-SSD model...');
            this.model = await cocoSsd.load();
            logger.info('COCO-SSD model loaded.');
        }
    }

    async detectObjects(imageBuffer: Buffer): Promise<cocoSsd.DetectedObject[]> {
        await this.loadModel();
        if (!this.model) {
            throw new Error('Model not loaded.');
        }

        const imageTensor = tf.node.decodeImage(imageBuffer) as tf.Tensor3D;
        const predictions = await this.model.detect(imageTensor);
        imageTensor.dispose(); // Clean up memory
        return predictions;
    }
}

export { ObjectDetectionService };