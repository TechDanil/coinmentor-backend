import { newsData } from "../shared/data/news.data";

class NewsService {
    getAllNews = async () => {
        return newsData;
    }
}


export default new NewsService();