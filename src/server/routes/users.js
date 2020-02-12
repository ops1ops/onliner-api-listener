import { Router } from 'express';
import jwt from 'jsonwebtoken';
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

router.post('/login', (req, res) => {
  function findUserInDB() {
    return {
      id: 1,
      name: 'pasha',
      email: 'kok@gmail.com',
    };
  }

  const user = findUserInDB();

  if (user) {
    res.json({
      user,
      jwt: jwt.sign({
        user,
      }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }),
    });
  } else {
    res.status(401).json({
      error: {
        message: 'Wrong username or password!',
      },
    });
  }
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
