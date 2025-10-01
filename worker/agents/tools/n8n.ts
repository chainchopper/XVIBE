import { ToolDefinition } from './types';
import { N8NService } from '../../services/n8n/N8NService';
import { z } from 'zod';

async function triggerN8NWorkflow(args: { workflowId: string, data: any }, env: Env): Promise<any> {
    const n8nService = new N8NService(env);
    return await n8nService.triggerWorkflow(args.workflowId, args.data);
}

const triggerN8NWorkflowTool: ToolDefinition = {
    type: 'function',
    function: {
        name: 'trigger_n8n_workflow',
        description: 'Triggers a workflow in N8N.',
        parameters: z.object({
            workflowId: z.string().describe('The ID of the workflow to trigger.'),
            data: z.any().describe('The data to pass to the workflow.'),
        }),
    },
    execute: triggerN8NWorkflow,
};

export const n8nTools = [triggerN8NWorkflowTool];