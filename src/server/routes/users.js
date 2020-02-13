import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db';

const { User } = db;
const router = Router();
router.post('/create', ({ body: { email, name, password } }, res) => {
  User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  }).then(() => {
    res.redirect('/login');
  }).catch((reason) => {
    res.status(400).json({
      error: 'Failed to create user',
      reason: reason.errors[0].message,
    });
  });
});

router.post('/login', ({ body: { login, password } }, res) => {
  User.findOne({
    where: {
      name: login,
    },
  }).then((user) => {
    const { id, password: passwordHash } = user;
    if (user && bcrypt.compareSync(password, passwordHash)) {
      res.json({
        id,
        jwt: jwt.sign({
          id,
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
