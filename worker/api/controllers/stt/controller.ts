import { BaseController } from '../baseController';
import { RouteContext } from '../../types/route-context';
import { SpeechRecognitionService } from '../../../services/stt/SpeechRecognitionService';

export class SpeechRecognitionController extends BaseController {
    static async recognize(
        request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        _context: RouteContext,
    ): Promise<Response> {
        const { audioContent } = await request.json() as { audioContent: string };
        const sttService = new SpeechRecognitionService();
        const transcription = await sttService.recognize(audioContent);

        return SpeechRecognitionController.createSuccessResponse({ transcription });
    }
}