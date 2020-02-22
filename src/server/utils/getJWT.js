import jwt from 'jsonwebtoken';

const expiresIn = 60 * 60;

export default (id) => (
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn })
);
