const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // 헤더에서 token 가져오기
  const token = req.header('x-auth-token');
  // token 이 없는 경우
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  // token 확인
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
