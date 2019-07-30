const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // 헤더에서 token 가져오기
  const token = req.header('x-auth-token');
  // token 이 있는 경우
  if (token) {
    // token 확인
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      req.user = decoded.user;
    } catch (error) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  }
  next();
};
