import jwt from 'jsonwebtoken';

const BEARER_KEYWORD = 'Bearer ';

export default (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization) {
    try {
      const [token] = authorization.split(BEARER_KEYWORD).filter(Boolean);

      req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
    } catch (err) {
      res.status(401).json({ error: 'Failed to authenticate token!' });
    }
  } else {
    res.status(401).json({ error: 'No Token Provided!' });
  }

  next();
};
