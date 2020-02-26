import { Router } from 'express';
import { getAllItems, getItemsByCategory, getItemsByQuery } from '../controllers/items';

const router = Router();

router.get('/items', getAllItems);
router.get('/categories/:categoryKey', getItemsByCategory);
router.get('/search/items', getItemsByQuery);

export default router;
