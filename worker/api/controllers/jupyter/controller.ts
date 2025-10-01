import { BaseController } from '../baseController';
import { RouteContext } from '../../types/route-context';
import { JupyterService } from '../../../services/jupyter/JupyterService';

export class JupyterController extends BaseController {
    static async createKernel(
        _request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        _context: RouteContext,
    ): Promise<Response> {
        const jupyterService = new JupyterService();
        const kernel = await jupyterService.createKernel();
        return JupyterController.createSuccessResponse(kernel);
    }

    static async executeCode(
        request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        context: RouteContext,
    ): Promise<Response> {
        const { kernelId } = context.params;
        const { code } = await request.json() as { code: string };
        const jupyterService = new JupyterService();
        const result = await jupyterService.executeCode(kernelId, code);
        return JupyterController.createSuccessResponse(result);
    }

    static async shutdownKernel(
        _request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        context: RouteContext,
    ): Promise<Response> {
        const { kernelId } = context.params;
        const jupyterService = new JupyterService();
        await jupyterService.shutdownKernel(kernelId);
        return JupyterController.createSuccessResponse({ message: 'Kernel shut down successfully' });
    }
}