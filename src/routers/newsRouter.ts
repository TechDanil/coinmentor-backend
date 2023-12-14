import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import NewsController from '../controllers/NewsController';

const newsRouter = express.Router();

newsRouter.get('/admin/news', authenticateToken, NewsController.fetchNews);

export default newsRouter;