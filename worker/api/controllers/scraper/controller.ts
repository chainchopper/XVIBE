import { BaseController } from '../baseController';
import { RouteContext } from '../../types/route-context';
import { ScraperService } from '../../../services/scraper/ScraperService';

export class ScraperController extends BaseController {
    static async scrapeWebsite(
        request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        _context: RouteContext,
    ): Promise<Response> {
        const { url } = await request.json() as { url: string };
        const scraperService = new ScraperService();
        const text = await scraperService.scrapeWebsite(url);
        return ScraperController.createSuccessResponse({ text });
    }

    static async getYouTubeTranscript(
        request: Request,
        _env: Env,
        _ctx: ExecutionContext,
        _context: RouteContext,
    ): Promise<Response> {
        const { url } = await request.json() as { url: string };
        const scraperService = new ScraperService();
        const transcript = await scraperService.getYouTubeTranscript(url);
        return ScraperController.createSuccessResponse({ transcript });
    }
}