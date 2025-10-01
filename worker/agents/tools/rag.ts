import { ToolDefinition } from './types';
import { LightRAGService } from '../../services/rag/LightRAGService';
import { z } from 'zod';

const ragService = new LightRAGService();

async function addDocumentToRag(args: { id: string, text: string }): Promise<any> {
    await ragService.addDocument(args);
    return { success: true, message: `Document ${args.id} added to RAG index.` };
}

async function queryRag(args: { query: string }): Promise<any> {
    return await ragService.query(args.query);
}

const addDocumentToRagTool: ToolDefinition = {
    type: 'function',
    function: {
        name: 'add_document_to_rag',
        description: 'Adds a document to the RAG index.',
        parameters: z.object({
            id: z.string().describe('The unique ID of the document.'),
            text: z.string().describe('The text content of the document.'),
        }),
    },
    execute: addDocumentToRag,
};

const queryRagTool: ToolDefinition = {
    type: 'function',
    function: {
        name: 'query_rag',
        description: 'Queries the RAG index and returns relevant documents.',
        parameters: z.object({
            query: z.string().describe('The query to search for.'),
        }),
    },
    execute: queryRag,
};

export const ragTools = [addDocumentToRagTool, queryRagTool];