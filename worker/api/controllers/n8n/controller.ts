import { BaseController } from '../baseController';
import { RouteContext } from '../../types/route-context';
import { N8NService } from '../../../services/n8n/N8NService';

export class N8NController extends BaseController {
    static async triggerWorkflow(
        request: Request,
        env: Env,
        _ctx: ExecutionContext,
        context: RouteContext,
    ): Promise<Response> {
        const { workflowId } = context.params;
        const data = await request.json();
        const n8nService = new N8NService(env);
        const result = await n8nService.triggerWorkflow(workflowId, data);
        return N8NController.createSuccessResponse(result);
    }
}