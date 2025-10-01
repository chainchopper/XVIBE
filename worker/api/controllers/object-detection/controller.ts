import { BaseController } from '../baseController';
import { RouteContext } from '../../types/route-context';
import { ObjectDetectionService } from '../../../services/object-detection/ObjectDetectionService';

export class ObjectDetectionController extends BaseController {
    static async detect(
        request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        _context: RouteContext,
    ): Promise<Response> {
        const formData = await request.formData();
        const imageFile = formData.get('image') as File;
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

        const objectDetectionService = new ObjectDetectionService();
        const predictions = await objectDetectionService.detectObjects(imageBuffer);

        return ObjectDetectionController.createSuccessResponse({ predictions });
    }
}