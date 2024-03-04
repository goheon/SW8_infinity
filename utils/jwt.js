const jwt = require('jsonwebtoken');

const secret = `${process.env.SECRET}`;

exports.secret = secret;

exports.setUserToken = (res, user) => {
  // 사용자 정보에서 roleId를 가져옵니다.
  const { roleId } = user;
  // 토큰에 넣을 사용자 정보를 설정합니다.
  const payload = {
    ...user,
    roleId // roleId 추가
  };
  // 유저 jwt 토큰 생성
  const token = jwt.sign(payload, secret, { expiresIn: '2h' });

  // 토큰을 쿠키로 전달
  res.cookie('token', token);
  res.cookie('roleId', roleId);
};
