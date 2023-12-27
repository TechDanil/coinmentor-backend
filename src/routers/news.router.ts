import NewsController from '../controllers/news.controller';
import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';

const newsRouter = express.Router();

newsRouter.get('/admin/news', authMiddleware, NewsController.fetchAllNews);

export default newsRouter;