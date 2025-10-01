import * as cheerio from 'cheerio';
import { YoutubeTranscript } from 'youtube-transcript';
import { createLogger } from '../../logger';

const logger = createLogger('ScraperService');

class ScraperService {
    async scrapeWebsite(url: string): Promise<string> {
        logger.info(`Scraping website: ${url}`);
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        return $('body').text();
    }

    async getYouTubeTranscript(url: string): Promise<string> {
        logger.info(`Fetching YouTube transcript for: ${url}`);
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        return transcript.map(item => item.text).join(' ');
    }
}

export { ScraperService };