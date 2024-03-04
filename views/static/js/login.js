import { navigateTo } from '../../router/index.js';
import { BASE_URI } from './constant/url.js';
import { getCookie } from './lib/getCookie.js';
import { emailValidation, passwordValidation } from './lib/validation.js';

export const login = () => {
  // 리다이렉트를 login 을 화면에 뿌리고 나서 home 으로 이동하여서 좀 버벅임이 있다.
  const cookie = getCookie('token');
  if (cookie) {
    navigateTo(BASE_URI);
  }
  const $LoginBtn = document.querySelector('.btnLogin');
  const $userInputEmail = document.querySelector('.inputEmail');
  const $userInputPassword = document.querySelector('.inputPassword');
  $LoginBtn.addEventListener('click', () => {
    const enteredEmail = $userInputEmail.value;
    const enteredPassword = $userInputPassword.value;
    if (!emailValidation(enteredEmail)) {
      alert('이메일이 형식에 맞지 않습니다.');
      return;
    }

    if (!passwordValidation(enteredPassword) === 'less') {
      alert('비밀번호는 영문자, 숫자, 특수 기호를 포함해야 합니다');
      return;
    }

    // 암호화를 하기 위해서는 secretKey가 필요한데 접근 불가
    fetch(`${BASE_URI}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: enteredEmail,
        pwd: CryptoJS.SHA256(enteredPassword).toString()
      })
    }).then((res) => {
      if (!res.ok) {
        alert('없는 사용자 입니다.');
        throw new Error('네트워크 응답이 정상이 아닙니다.');
      }
      res.headers.get('Set-Cookie');
      const roleId = getCookie('roleId');
      if (roleId === 'admin') {
        navigateTo(`${BASE_URI}/admin`);
      } else {
        navigateTo(BASE_URI);
      }
      window.location.reload();
    });
  });
};
