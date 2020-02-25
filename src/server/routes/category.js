import { Router } from 'express';
import { getAllCategories } from '../controllers/categories';

const router = Router();

router.get('/category', getAllCategories);

export default router;
