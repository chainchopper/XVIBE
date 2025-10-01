import { ToolDefinition } from './types';
import { JupyterService } from '../../services/jupyter/JupyterService';
import { z } from 'zod';

const jupyterService = new JupyterService();
let kernelId: string | null = null;

async function executeCodeInJupyter(args: { code: string }): Promise<any> {
    if (!kernelId) {
        const kernel = await jupyterService.createKernel();
        kernelId = kernel.id;
    }
    return await jupyterService.executeCode(kernelId, args.code);
}

const executeCodeInJupyterTool: ToolDefinition = {
    type: 'function',
    function: {
        name: 'execute_code_in_jupyter',
        description: 'Executes a block of Python code in a Jupyter notebook and returns the result. A single kernel is maintained for the duration of the session.',
        parameters: z.object({
            code: z.string().describe('The Python code to execute.'),
        }),
    },
    execute: executeCodeInJupyter,
};

export const jupyterTools = [executeCodeInJupyterTool];