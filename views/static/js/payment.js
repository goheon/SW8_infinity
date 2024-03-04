import { BASE_URI } from '../js/constant/url.js';
import { getCookie } from './lib/getCookie.js';

export const payment = async () => {
  const cookie = getCookie('token');
  if (!cookie) {
    navigateTo(BASE_URI);
  }
  /**
   * 회원 정보
   */
  const userTokenRes = await fetch(`${BASE_URI}/api/users/getUserId`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie}`
    }
  });
  const user = await userTokenRes.json();
  const userId = user.userId;
  const findUserRes = await fetch(`${BASE_URI}/api/users?id=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie}`
    }
  });
  //회원 정보 setting
  const userInfo = await findUserRes.json();
  document.querySelector('#delivery-choice-1').innerHTML =
    `${userInfo.name}님 배송지`;
    document.getElementById("delivery_choice_1").value = `(${userInfo.zipCode}) ${userInfo.address} ${userInfo.detailAddress}`

    //배송지 radio button value 변경
    document.querySelectorAll('.n-radio').forEach(function(radio) {
        radio.addEventListener('change', function() {
            let adrr = this.value;
            document.getElementById('delivery-addr').innerHTML = this.value;
        });
    })};
