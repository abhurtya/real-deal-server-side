import express from 'express';
import { getProperties , addDummyProps} from '../controllers/property.js';


const router = express.Router();

router.get('/', getProperties);

router.get('/addDummyData', addDummyProps);


export default router;