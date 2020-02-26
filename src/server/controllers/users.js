import bcrypt from 'bcrypt';
import db from '../db';
import getJWT from '../utils/getJWT';

const { User } = db;

// TODO: rewrite with async await

export const createUser = ({ body: { email, name, password } }, res) => {
  User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  })
    .then(({ id }) => {
      res.send({ id, name, jwt: getJWT(id) });
    })
    .catch((reason) => {
      res.status(400).json({
        error: 'Failed to create user',
        reason: reason.errors[0].message,
      });
    });
};

export const loginUser = ({ body: { login, password } }, res) => {
  User.findOne({ where: { name: login } })
    .then((user) => {
      const { id, password: passwordHash, name } = user;
      const isPasswordValid = bcrypt.compareSync(password, passwordHash);

      if (user && isPasswordValid) {
        res.json({ id, name, jwt: getJWT(id) });
      } else {
        res.status(401).json({
          error: { message: 'Wrong username or password!' },
        });
      }
    }).catch(() => {
      res.status(401).json({
        error: { message: 'User not found!' },
      });
    });
};

export const getUserById = (req, res) => {
  const { id } = req.params;

  return res.send(id);
};
