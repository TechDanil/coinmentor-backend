import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { newsData } from '../shared/data/news.data';

interface CustomRequest extends Request {
    user?: JwtPayload;
}

class NewsController {
    fetchNews = async (req: CustomRequest, res: Response) => {
        try {
            const user = (req as CustomRequest).user as JwtPayload;

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            res.json({ news: newsData });
        } catch(error) {
            res.status(500).json({ message: 'error while fetching news', error });
        }
    }
}

export default new NewsController();