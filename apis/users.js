const express = require('express');
const router = express.Router();

const { User } = require('../models');

const asyncHandler = require('../utils/async-handler');
const getUserFromJWT = require('../middlewares/get-user-from-jwt');

//회원 정보 조회
router.get(
  '/',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    const { id } = req.query;
    const user = await User.findOne({ id });

    //가입이 되어 있지 않거나, 이미 탈퇴한 경우
    if (!user || user.useYn) {
      throw new Error('회원을 찾을 수 없습니다.');
    }
    //관리자가 아닌 경우
    if (!req.user.roleId) {
      //로그인한 본인이 아닌 경우
      if (req.user !== user.id) {
        throw new Error('권한이 없습니다.');
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
    //DB 중복 체크, 중첩 상태 확인?? (아이디, 이메일, 핸드폰 번호)
    const idFounded = await User.find({ id });
    const emailFounded = await User.find({ email });
    const phoneNumFounded = await User.find({ phoneNum });

    let errorMessages = '';

    if (idFounded.length !== 0) {
      errorMessages += `이미 사용중인 아이디입니다.\n`;
    }
    if (emailFounded.length !== 0) {
      errorMessages += `이미 사용중인 이메일입니다.\n`;
    }
    if (phoneNumFounded.length !== 0) {
      errorMessages += `이미 사용중인 핸드폰 번호입니다.\n`;
    }

    if (errorMessages !== '') {
      throw new Error(errorMessages);
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
    if (!userFounded.id || userFounded.useYn) {
      throw new Error('회원을 찾을 수 없습니다.');
    }
    //로그인한 본인이 아닌 경우
    if (req.id !== userFounded.id) {
      throw new Error('잘못된 요청입니다.');
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

    //로그인 본인이 아닌 경우
    if (req.id !== userFounded.id) {
      throw new Error('잘못된 접근입니다.');
    }

    await User.updateOne({ id }, { useYn: Date.now() + 9 * 60 * 60 * 1000 });
    const user = await User.findOne({ id });
    const { useYn } = user;

    //탈퇴처리 된 시간을 응답
    res.json({ useYn });
  })
);

module.exports = router;
