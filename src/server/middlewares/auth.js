import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { headers: { authorization } = {} } = req;

  if (authorization) {
    try {
      const [_, bearerToken] = authorization.split(' ');
      req.user = jwt.verify(bearerToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: 'Failed to authenticate token!',
      });
    }
  } else {
    return res.status(401).json({
      error: 'No Token Provided!',
    });
  }

  next();
};
