import { Router } from 'express';
import { createUser, getUserById, loginUser } from '../controllers/users';
import auth from '../middlewares/auth';

const router = Router();

router.post('/users/create', createUser);
router.post('/users/login', loginUser);
router.get('/user/:id', auth, getUserById);

export default router;
