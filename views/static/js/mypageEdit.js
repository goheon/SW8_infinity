import { navigateTo } from '../../router/index.js';
import { BASE_URI } from './constant/url.js';
import { ExecDaumPostcode } from './lib/daumPostCode.js';
import { getCookie } from './lib/getCookie.js';
import {
  emailValidation,
  passwordValidation,
  phoneNumberValidation
} from './lib/validation.js';

export const mypageEdit = () => {
  const cookie = getCookie('token');
  console.log(cookie);
  if (!cookie) {
    navigateTo(BASE_URI);
  }
  // 사용자 ID를 가져오는 API 엔드포인트 호출
  fetch('/api/users/getUserId', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }
      return response.json();
    })
    .then((data) => {
      const id = data.userId; // 서버로부터 받은 사용자 ID
      const token = getCookie('token');
      // 사용자 정보를 가져오는 API 엔드포인트 호출
      return fetch(`${BASE_URI}/api/users?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      return response.json();
    })
    .then((userData) => {
      // 사용자 정보 처리
      const { name, email, id, phoneNum, zipCode, address, detailAddress } =
        userData;

      const first = phoneNum.substring(0, 3);
      const second = phoneNum.substring(3, 7);
      const third = phoneNum.substring(7);

      // HTML 요소 선택
      const $detailId = document.querySelector('.profile-name');
      const $detailEmail = document.querySelector('.nameInput');
      const $detailName = document.querySelector('.input.name');
      const $password = document.querySelector('.password'); // 비밀번호 필드 선택자 수정
      const $passwordCheck = document.querySelector('.passwordCheck'); // 비밀번호 확인 필드 선택자 수정
      const $detailphone1 = document.querySelector('.phone1');
      const $detailphone2 = document.querySelector('.phone2');
      const $detailphone3 = document.querySelector('.phone3');
      const $detailzipcode = document.querySelector('.zipcode');
      const $detailaddress = document.querySelector('.address');
      const $detailmoreAddress = document.querySelector('.detailAddress');
      const $modifyBtn = document.querySelector('.button.is-black');

      // 사용자 정보 적용
      $detailId.innerHTML = id;
      $detailName.value = `${name}`;
      $detailEmail.value = email;
      $detailphone1.value = first;
      $detailphone2.value = second;
      $detailphone3.value = third;
      $detailzipcode.value = zipCode;
      $detailaddress.value = address;
      $detailmoreAddress.value = detailAddress;

      // 정보 수정 버튼 클릭 이벤트 핸들러
      $modifyBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        // 전화번호 조합
        const phoneNumber =
          $detailphone1.value + $detailphone2.value + $detailphone3.value;

        // 패스워드 유효성 검사
        const isValidPassword = passwordValidation(
          $password.value,
          $passwordCheck.value
        );

        // 이메일 유효성 검사
        const isValidEmail = emailValidation($detailEmail.value);
        // 전화번호 유효성 검사
        const isValidPhoneNumber = phoneNumberValidation(phoneNumber);
        // 유효성 검사 및 알림
        if (!isValidEmail) {
          alert('유효하지 않은 이메일 형식입니다.');
          throw new Error('유효하지 않은 이메일 형식입니다.');
        }

        if ($detailName.innerHTML.length >= 3) {
          alert('ID를 입력해주세요.');
          throw new Error('ID를 입력해주세요.');
        }

        if (isValidPassword === 'no' || isValidPassword === 'less') {
          alert(
            '비밀번호는 영문자, 숫자, 특수 기호를 포함하여 8자 이상 24자 이하여야 합니다.'
          );
          throw new Error(
            '비밀번호는 영문자, 숫자, 특수 기호를 포함하여 8자 이상 24자 이하여야 합니다.'
          );
        }

        if (!isValidPhoneNumber) {
          alert('유효하지 않은 전화번호 형식입니다.');
          throw new Error('유효하지 않은 전화번호 형식입니다.');
        }

        $detailName.innerHTML = `${name}`;
        $detailEmail.value = email;
        $detailId.value = id;
        $detailphone1.value = first;
        $detailphone2.value = second;
        $detailphone3.value = third;
        $detailzipcode.value = zipCode;
        $detailaddress.value = address;
        $detailmoreAddress.value = detailAddress;

        const token = getCookie('token');
        const response = await fetch(`${BASE_URI}/api/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            pwd: CryptoJS.SHA256($password.value).toString(),
            name: $detailName.value,
            email: $detailEmail.value,
            zipCode: $detailzipcode.value,
            address: $detailaddress.value,
            detailAddress: $detailmoreAddress.value,
            phoneNum: phoneNumber
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          alert('회원정보 수정에 실패했습니다.');
          throw new Error('회원정보 수정에 실패했습니다.');
        } else {
          const userInfo = await response.json(); // 회원정보를 따로 저장?
          alert(`${userInfo.id}님 회원정보 수정에 성공하였습니다.`);
          window.location.reload();
        }
      });
    })
    .catch((error) => {
      console.error('사용자 정보를 가져오는 중 에러 발생:', error);
    });

  // 도로명 주소 검색 버튼 클릭 이벤트 핸들러
  const $findAddress = document.querySelector('.find-address');
  $findAddress.addEventListener('click', ExecDaumPostcode);
};
