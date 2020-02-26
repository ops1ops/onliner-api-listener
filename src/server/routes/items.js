import { Router } from 'express';
import { getAllItems,
  getItemsByCategory,
  getItemsByQuery,
  subscribeUserToItem,
  unsubscribeUserFromItem } from '../controllers/items';
import auth from '../middlewares/auth';

const router = Router();

router.get('/items', getAllItems);
router.get('/categories/:categoryKey', getItemsByCategory);
router.get('/search/items', getItemsByQuery);
router.post('/items/:itemId/subscribe', auth, subscribeUserToItem);
router.post('/items/:itemId/unsubscribe', auth, unsubscribeUserFromItem);

export default router;
