import bcrypt from 'bcrypt';

import db from '../db';
import generateJWT from '../utils/generateJWT';
import { EMAIL_REGEX } from '../constants';

const { User } = db;

// TODO: rewrite with async await

export const createUser = ({ body: { email, name, password, confirmPassword } }, res) => {
  const isAllDataPassed = email && name && password && confirmPassword;
  const arePasswordsMatch = password === confirmPassword;
  const isEmailValid = EMAIL_REGEX.test(email);

  if (!isAllDataPassed) {
    return res.status(422).send({ message: 'All fields are required' });
  }

  if (!arePasswordsMatch) {
    return res.status(422).send({ message: 'Passwords dont match' });
  }

  if (!isEmailValid) {
    return res.status(422).send({ message: 'Email is not valid' });
  }

  User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  })
    .then(({ id }) => {
      res.send({ id, name, jwt: generateJWT(id) });
    })
    .catch((reason) => {
      res.status(400).json({
        message: reason.errors[0].message,
      });
    });
};

export const loginUser = ({ body: { login, password } }, res) => {
  User.findOne({ where: { name: login } })
    .then((user) => {
      const { id, password: passwordHash, name } = user;
      const isPasswordValid = bcrypt.compareSync(password, passwordHash);

      if (user && isPasswordValid) {
        res.json({ id, name, jwt: generateJWT(id) });
      } else {
        res.status(401).send({ message: 'Wrong username or password!' });
      }
    }).catch(() => {
      res.status(401).send({ message: 'User not found!' });
    });
};

export const getUserById = (req, res) => {
  const { id } = req.params;

  return res.send(id);
};
