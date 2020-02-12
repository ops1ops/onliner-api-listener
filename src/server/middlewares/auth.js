import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    try {
      const bearerToken = req.headers.authorization.split(' ')[1];
      req.user = jwt.verify(bearerToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: {
          msg: 'Failed to authenticate token!',
        },
      });
    }
  } else {
    return res.status(401).json({
      error: {
        msg: 'No token!',
      },
    });
  }
  next();
};
