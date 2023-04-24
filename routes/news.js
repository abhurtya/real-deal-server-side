import express from 'express';
import { addNews, updateNews, deleteNews, getNews, addDummyData } from '../controllers/news.js';

const router = express.Router();

//use add dummy data once to add data to the database
router.get('/addDummyData', addDummyData);

router.get('/', getNews);

export default router;