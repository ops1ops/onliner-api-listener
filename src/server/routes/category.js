import { Router } from 'express';
import { getAllCategories } from '../controllers/categories';

const router = Router();

router.get('/categories', getAllCategories);

export default router;
