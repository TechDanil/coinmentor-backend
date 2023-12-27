import { NextFunction, Request, Response } from 'express';
import NewsService from '../services/news.service';

class NewsController {
    fetchAllNews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const news = await NewsService.getAllNews();
            res.json(news);
        } catch(e) {
            next(e);
        }
    }
}

export default new NewsController();