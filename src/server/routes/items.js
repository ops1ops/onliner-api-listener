import { Router } from 'express';
import { getAllItems } from '../controllers/items';

const router = Router();

router.get('/items', getAllItems);

export default router;
