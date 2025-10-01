import { BaseController } from '../baseController';
import { RouteContext } from '../../types/route-context';
import { LightRAGService } from '../../../services/rag/LightRAGService';

export class RAGController extends BaseController {
    static async addDocument(
        request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        _context: RouteContext,
    ): Promise<Response> {
        const { id, text } = await request.json() as { id: string; text: string };
        const ragService = new LightRAGService();
        await ragService.addDocument({ id, text });
        return RAGController.createSuccessResponse({ message: 'Document added successfully' });
    }

    static async query(
        request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        _context: RouteContext,
    ): Promise<Response> {
        const { query } = await request.json() as { query: string };
        const ragService = new LightRAGService();
        const results = await ragService.query(query);
        return RAGController.createSuccessResponse(results);
    }
}