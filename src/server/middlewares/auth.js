import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { headers: { authorization } } = req;

  if (authorization) {
    try {
      // eslint-disable-next-line prefer-destructuring
      const token = authorization.split(' ')[1];

      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      res.status(401).json({ error: 'Failed to authenticate token!' });
    }
  } else {
    res.status(401).json({ error: 'No Token Provided!' });
  }

  next();
};
