import { Router } from 'express';
import { createUser, getUserById, loginUser } from '../controllers/users';
import { getUserItems } from '../controllers/items';
import auth from '../middlewares/auth';

const router = Router();

router.post('/users/create', createUser);
router.post('/users/login', loginUser);
router.get('/user/subscriptions', auth, getUserItems);
router.get('/user/:id', auth, getUserById);

export default router;
