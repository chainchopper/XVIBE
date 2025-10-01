import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { createLogger } from '../../logger';

const logger = createLogger('TTSService');

class TTSService {
    private client: TextToSpeechClient;

    constructor() {
        this.client = new TextToSpeechClient();
        logger.info('Google Cloud Text-to-Speech client initialized.');
    }

    async synthesizeSpeech(text: string): Promise<string | Uint8Array> {
        const request = {
            input: { text },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' as const },
            audioConfig: { audioEncoding: 'MP3' as const },
        };

        const [response] = await this.client.synthesizeSpeech(request);
        return response.audioContent!;
    }
}

export { TTSService };