/**/
/*
News Routes

NAME
    News Routing - Handles routing for news-related operations in the application.

DESCRIPTION
    This code sets up routing endpoints related to news management, including retrieval, 
    addition, update, and deletion of news records. 
    Some routes (add, update, delete) are protected by an admin middleware to ensure only 
    administrators can modify news data.

KEY VARIABLES
    - router: Express.js router instance for defining and handling routes.
    - isAdmin: Middleware to check if the user making the request is an administrator.
    
ROUTES
    - GET "/addDummyData": Endpoint to add dummy news data (for testing/dev purposes).
    - GET "/": Fetches all news entries.
    - POST "/add": Admin-only route to add a new news entry.
    - PUT "/update/:id": Admin-only route to update an existing news entry by its ID.
    - DELETE "/delete/:id": Admin-only route to delete a news entry by its ID.

EXPORT
    Exports the router to be used in the main server setup.
*/
/**/

import express from 'express';
import { addNews, updateNews, deleteNews, getNews, addDummyData } from '../controllers/news.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/addDummyData', addDummyData);
router.get('/', getNews);
router.post('/add', isAdmin, addNews);
router.put('/update/:id', isAdmin, updateNews);
router.delete('/delete/:id', isAdmin, deleteNews);


export default router;