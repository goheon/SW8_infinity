const express = require('express');
const router = express.Router();

const cryptoJS = require('crypto-js');

const { User } = require('../models');
const {
  NotFoundError,
  AuthError,
  DuplicateError
} = require('../middlewares/error-handler');
const getUserFromJWT = require('../middlewares/get-user-from-jwt');
const asyncHandler = require('../utils/async-handler');

// 사용자 ID를 가져오는 API
router.get('/getUserId', getUserFromJWT, (req, res) => {
  const userId = req.user.id;
  
  res.json({ userId });
});

//회원 정보 조회
router.get(
  '/',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    const { id } = req.query;

    const user = await User.findOne({ id });
    //가입이 되어 있지 않거나, 이미 탈퇴한 경우
    if (!user || user.useYn) {
      throw new NotFoundError(`${id}회원`);
    }
    //관리자가 아닌 경우
    if (!req.user.roleId) {
      //로그인한 본인이 아닌 경우
      if (req.user.id !== user.id) {
        throw new AuthError('권한이 없습니다.');
      }
    }

    res.json(user);
  })
);

//회원 가입 users/register
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
      id,
      pwd,
      name,
      email,
      zipCode,
      address,
      detailAddress,
      phoneNum,
      oauth
    } = req.body;

    let useYn, regDate;

    const idFounded = await User.find({ id });
    const emailFounded = await User.find({ email });
    const phoneNumFounded = await User.find({ phoneNum });

    let errorMessages = '';

    if (idFounded.length !== 0) {
      errorMessages += `아이디 `;
    }
    if (emailFounded.length !== 0) {
      errorMessages += `이메일 `;
    }
    if (phoneNumFounded.length !== 0) {
      errorMessages += `핸드폰번호 `;
    }

    if (errorMessages !== '') {
      throw new DuplicateError(errorMessages);
    }

    await User.create({
      id,
      pwd,
      name,
      email,
      zipCode,
      address,
      detailAddress,
      phoneNum,
      useYn,
      regDate,
      oauth
    });
    const user = await User.findOne({ id });
    res.json(user);
  })
);

//회원 정보 수정 시 변경 가능한 필드 pwd, name, email, zip_code, adress, phone_num
//모든 필드값을 body에 담지 않고 수정되는 부분만 요청해도 처리 가능
router.put(
  '/:id',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { pwd, name, email, zipCode, address, detailAddress, phoneNum } =
      req.body;

    const userFounded = await User.findOne({ id });

    //회원이 없거나 탈퇴한 경우
    if (!userFounded || userFounded.useYn) {
      throw new NotFoundError('회원');
    }
    //로그인한 본인이 아닌 경우
    if (req.user.id !== userFounded.id) {
      throw new AuthError();
    }

    await User.updateOne(
      { id },
      { pwd, name, email, zipCode, address, detailAddress, phoneNum }
    );
    const user = await User.findOne({ id });
    res.json(user);
  })
);

/**
 * 회원 삭제(=탈퇴)
 * useYn 컬럼에 탈퇴한 현재 시점의 값이 들어가 있다면 탈퇴회원, 없다면 정상회원.
 * Date.now()만 사용할 경우, 한국 현재시간이 출력되는것이 아닌 UTC 시간이 출력되므로, 9시간을 더해줘 한국 현재시간이 담길 수 있도록 처리.
 */
router.delete(
  '/:id',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userFounded = await User.findOne({ id });
    let { useYn } = userFounded;

    //회원이 없는 경우, 이미 탈퇴한 경우
    if (!userFounded || useYn) {
      throw new NotFoundError(`${id}`);
    }
    const ID = userFounded.id;
    //로그인 본인이 아닌 경우
    if (req.user.id !== ID) {
      throw new AuthError();
    }

    await User.updateOne({ id }, { useYn: Date.now() + 9 * 60 * 60 * 1000 });
    const user = await User.findOne({ id });

    //탈퇴처리 된 시간을 응답
    res.json({ '탈퇴 시간': user.useYn });
  })
);

module.exports = router;
