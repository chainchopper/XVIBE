import { BaseController } from '../baseController';
import { RouteContext } from '../../types/route-context';
import { TTSService } from '../../../services/tts/TTSService';

export class TTSController extends BaseController {
    static async synthesize(
        request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        _context: RouteContext,
    ): Promise<Response> {
        const { text } = await request.json() as { text: string };
        const ttsService = new TTSService();
        const audioContent = await ttsService.synthesizeSpeech(text);

        const response = new Response(audioContent, {
            headers: {
                'Content-Type': 'audio/mpeg',
            },
        });

        return response;
    }
}