import { SpeechClient } from '@google-cloud/speech';
import { createLogger } from '../../logger';

const logger = createLogger('SpeechRecognitionService');

class SpeechRecognitionService {
    private client: SpeechClient;

    constructor() {
        this.client = new SpeechClient();
        logger.info('Google Cloud Speech-to-Text client initialized.');
    }

    async recognize(audioContent: string): Promise<string> {
        const audio = {
            content: audioContent,
        };
        const config = {
            encoding: 'LINEAR16' as const,
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
        const request = {
            audio: audio,
            config: config,
        };

        const [response] = await this.client.recognize(request);
        const transcription = response.results
            ?.map(result => result.alternatives?.[0].transcript)
            .join('\n');
        return transcription || '';
    }
}

export { SpeechRecognitionService };