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
  const $deliveryName = document.getElementById('delivery-name')
  const $deliveryMobile = document.getElementById('delivery-mobile')
  const $deliveryAddr = document.getElementById('delivery-addr')
    // `(${userInfo.zipCode}) ${userInfo.address} ${userInfo.detailAddress}`;
  const orderName = $deliveryName.innerHTML
  const orderMobile = $deliveryMobile.innerHTML
  const orderAddr = $deliveryAddr.innerHTML

  //배송지 radio button value 변경
  
  const userDetailAddress = CryptoJS.enc.Base64.parse(userInfo.detailAddress).toString(CryptoJS.enc.Utf8);
  const userPhoneNum = CryptoJS.enc.Base64.parse(userInfo.phoneNum).toString(CryptoJS.enc.Utf8);
  const first = userPhoneNum.substring(0, 3);
  const second = userPhoneNum.substring(3, 7);
  const third = userPhoneNum.substring(7);

  //회원 배송지 라디오버튼
  document.querySelector('#delivery_choice_1').addEventListener('click',()=>{
    $deliveryName.innerHTML=`${userInfo.name}`;
    $deliveryMobile.innerHTML=`${first}-${second}-${third}`;
    $deliveryAddr.innerHTML=`(${userInfo.zipCode}) ${userInfo.address} ${userDetailAddress}`;
  })
  //주문 배송지 버튼
  document.querySelector('#delivery_choice_0').addEventListener('click',()=>{
    $deliveryName.innerHTML=`${orderName}`;
    $deliveryMobile.innerHTML=`${orderMobile}`;
    $deliveryAddr.innerHTML=orderAddr;
  })
};
