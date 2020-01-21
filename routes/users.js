import { Router } from 'express';
import db from '../db';

const { User } = db;
const router = Router();
router.post('/create', (req, res) => {
  User.create({
    username: req.body.username,
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/:user_id/destroy', (req, res) => {
  User.destroy({
    where: {
      id: req.params.user_id,
    },
  }).then(() => {
    res.redirect('/');
  });
});

export default router;
