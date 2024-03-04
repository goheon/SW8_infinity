import { navigateTo } from '../../router/index.js';
import { BASE_URI } from './constant/url.js';
import { ExecDaumPostcode } from './lib/daumPostCode.js';
import { getCookie } from './lib/getCookie.js';
import {
  emailValidation,
  idValidation,
  nullCheckValidation,
  passwordValidation,
  phoneNumberValidation,
  radioCheckValidation,
  validation
} from './lib/validation.js';

export const signup = () => {
  const cookie = getCookie('token');
  if (cookie) {
    navigateTo(BASE_URI);
  }

  const $formEl = document.querySelector('.form');
  const $emailInput = document.querySelector('.input.emailInput');
  const $passwordInput = document.querySelector('.input.password');
  const $passwordCheckInput = document.querySelector('.input.passwordCheck');
  const $postalCode = document.querySelector('.add_button.mt_add_2');
  const $idInput = document.querySelector('.idInput');
  const $postCode = document.querySelector('#sample4_postcode');
  const $roadAddress = document.querySelector('#sample4_roadAddress');
  const $detailAddress = document.querySelector('#sample4_detailAddress');
  const $nameInput = document.querySelector('.nameInput');

  validation($emailInput, emailValidation);
  // signup 전송 함수
  async function handleSubmit(e) {
    e.preventDefault();

    const [
      emailInput,
      idInput,
      passwordInput,
      secondPasswordInput,
      nameInput,
      phoneNumber1,
      phoneNumber2,
      phoneNumber3,
      // eslint-disable-next-line no-unused-vars
      addressBtn,
      roadAddress,
      detailsAddress,
      jibunAddress,
      detailAddress,
      extraAddress,
      consent1,
      consent2
    ] = e.target;

    const phoneNumber =
      phoneNumber1.value + phoneNumber2.value + phoneNumber3.value;
    // 패스워드와 패스워드 확인이 다를 경우와 특수기호, 숫자, 영문자 검사
    const isValidPassword = passwordValidation(
      passwordInput.value,
      secondPasswordInput.value
    );

    const isValidId = idValidation($idInput.value);
    const isValidEmail = emailValidation($emailInput.value);
    const isValidPhoneNumber = phoneNumberValidation(phoneNumber);
    if (!isValidEmail) {
      alert('Email 형식이 맞지 않습니다.');
      return;
    }
    if (!isValidId) {
      alert('ID를 입력해주세요');
      return;
    }
    if (isValidPassword === 'no') {
      alert('입력한 패스워드가 일치하지 않습니다.');
      return; // 폼 제출을 중단합니다.
    }
    if (isValidPassword === 'less') {
      alert(
        '비밀번호는 영문자, 숫자, 특수 기호를 포함하여 8자 이상 24자 이하이어야 합니다.'
      );
      return;
    }
    if (!isValidPhoneNumber) {
      alert('전화번호 형식이 맞지 않습니다.');
      return;
    }

    const nullChecked = nullCheckValidation([
      emailInput.value,
      idInput.value,
      passwordInput.value,
      secondPasswordInput.value,
      nameInput.value,
      phoneNumber1.value,
      phoneNumber2.value,
      phoneNumber3.value,
      roadAddress.value,
      detailsAddress.value,
      jibunAddress.value,
      detailAddress.value,
      extraAddress.value
    ]);
    if (!nullChecked) {
      alert('빈칸을 작성하세요');
      return;
    }

    if (!radioCheckValidation(consent1) || !radioCheckValidation(consent2)) {
      alert('이용약관에 동의하세요');
    }

    // 데이터 패칭 후

    const postData = {
      id: $idInput.value,
      pwd: CryptoJS.SHA256($passwordInput.value).toString(),
      name: $nameInput.value,
      email: $emailInput.value,
      zipCode: $postCode.value,
      address: $roadAddress.value,
      detailAddress: $detailAddress.value,
      phoneNum: phoneNumber
    };

    const dataJson = JSON.stringify(postData);

    const res = await fetch(`${BASE_URI}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dataJson
    });

    if (res.ok) {
      navigateTo(BASE_URI);
    } else {
      alert('회원가입에 실패하였습니다...');
    }
  }

  // form submit
  $formEl.addEventListener('submit', handleSubmit);

  // 패스워드 확인 valueCheck 와 유사
  $passwordInput.addEventListener('input', (e) => {
    const password = $passwordCheckInput.value || '';
    if (passwordValidation(e.target.value, password) === 'ok') {
      $passwordInput.classList.remove('faild');
    } else {
      $passwordInput.classList.add('faild');
    }
  });

  $passwordCheckInput.addEventListener('input', (e) => {
    const password = $passwordInput.value || '';
    if (passwordValidation(e.target.value, password) === 'ok') {
      $passwordCheckInput.classList.remove('faild');
      $passwordInput.classList.remove('faild');
    } else {
      $passwordCheckInput.classList.add('faild');
    }
  });

  // 도로명 주소 검색
  $postalCode.addEventListener('click', ExecDaumPostcode);
};
