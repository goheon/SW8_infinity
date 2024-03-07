import { BASE_URI } from './constant/url.js';
import { navigateTo } from '../../router/index.js';
import { getCookie } from './lib/getCookie.js';
import { ExecDaumPostcode } from './lib/daumPostCode.js';
import { clearCart } from './lib/shoppingcart.js';

export const orderCreate = async () => {
  const cookie = getCookie('token');
  if (!cookie) {
    navigateTo(BASE_URI);
  }
  const $findAddress = document.querySelector('#find-address');
  $findAddress.addEventListener('click', ExecDaumPostcode);

  /**
   * 회원 정보 처리
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
  const first = userInfo.phoneNum.substring(0, 3);
  const second = userInfo.phoneNum.substring(3, 7);
  const third = userInfo.phoneNum.substring(7);
  const formedUserPhoneNum = `${first}-${second}-${third}`;

  const orderCreateBtn = document.querySelector('#createOrder');

  //배송지 radio button 처리
  const $userRadio = document.querySelector('#delivery_choice_1');
  const $orderRadio = document.querySelector('#delivery_choice_0');

  //주문 버튼 선택시 input html
  $orderRadio.addEventListener('click', function () {
    document.querySelector('.deliveryInfoWrap').innerHTML = `
    <li class="order__item delivery__item__info">
          <span class="order__item__label">이름 / 연락처</span>
          <div class="order__item__area">
                  <input type="text" id="delivery-name" placeholder="주문자명을 입력해주세요" style="text-align:center; width:150px;"/>
                   <input type="tel"
                   placeholder="010"
                   maxlength="3" 
                   class="phone1"
                   value="010"
                   style="text-align:center; width:80px; margin-left:30px;"
                    />
                    <span class="dash">-</span>
                    <input type="tel"
                   placeholder="1234"
                   maxlength="4" 
                   class="phone2"
                   style="text-align:center; width:80px;"
                    />
               <span class="dash">-</span>
               <input type="tel"
                   placeholder="5678"
                   maxlength="4" 
                   class="phone3"
                   style="text-align:center; width:80px;"
                />
          </div>
      </li>
      <li class="order__item delivery__item__info">
          <span class="order__item__label">주소</span>
          <input class="order__item__area" type="text" readonly id="sample4_postcode">
          <button type="button" class="order__button" id="find-address" >배송지 변경</button>  
      </li>
      <li class="order__item delivery__item__info">
        <span class="order__item__label"></span>
        <input width = "200px" readonly id="sample4_roadAddress">
        <span class="dash"></span>
        <input type="text" class="order__item__area" id="sample4_detailAddress" placeholder="상세주소"/>
      </li>
      <li class="order__item order__item--overflow delivery__item__info">
          <span class="order__item__label">배송 요청사항</span>
          <div class="order__item__area order__item__area--column">
              <div class="order__select-wrap">
                  <select class="order__select" name="dlv_selectbox" id="dlv_selectbox" onchange="showEtc(this.value);">
                                                  <option value="" selected="selected">
                          배송 시 요청사항을 선택해주세요
                      </option>
                                                  <option value="부재 시 경비실에 맡겨주세요">
                          부재 시 경비실에 맡겨주세요
                      </option>
                                                  <option value="부재 시 택배함에 넣어주세요">
                          부재 시 택배함에 넣어주세요
                      </option>
                                                  <option value="부재 시 집 앞에 놔주세요">
                          부재 시 집 앞에 놔주세요
                      </option>
                                                  <option value="배송 전 연락 바랍니다">
                          배송 전 연락 바랍니다
                      </option>
                                                  <option value="파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.">
                          파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.
                      </option>
                                                  <option value="etc">
                          직접 입력
                      </option>
                                              </select>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="order__select__svg">
                      <path d="M3 6.60001L8.99965 12.6L15 6.60001" stroke="black"></path>
                  </svg>
              </div>
              <textarea class="order__textarea" name="etc_textarea" id="etc_textarea" style="display:none" maxlength="50" onkeyup="return textarea_maxlength(this)" placeholder="최대 50자까지 입력 가능합니다."></textarea>
          </div>
      </li>
    `;

    const $findAddress = document.querySelector('#find-address');
    $findAddress.addEventListener('click', ExecDaumPostcode);

    orderCreateBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const $orderName = document.querySelector('#delivery-name');
      const $orderPhone1 = document.querySelector('.phone1');
      const $orderPhone2 = document.querySelector('.phone2');
      const $orderPhone3 = document.querySelector('.phone3');
      const $orderZipCode = document.querySelector('#sample4_postcode');
      const $orderAddress = document.querySelector('#sample4_roadAddress');
      const $orderDetailAddress = document.querySelector(
        '#sample4_detailAddress'
      );
      const $orderReq = document.querySelector('#dlv_selectbox');

      const phoneNumber =
        $orderPhone1.value + $orderPhone2.value + $orderPhone3.value;
      const base64phoneNum = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(phoneNumber)
      );
      const base64detailAddress = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse($orderDetailAddress.value)
      );

      //주문상품목록담기
      const $prod_count = document.querySelectorAll('.prod_count');
      const $prod_num = document.querySelectorAll('.prod_num');
      let orderProds = [];
      for (let i = 0; i < $prod_count.length; i++) {
        orderProds.push({
          prodNum: $prod_num[i].innerHTML,
          orderProdCount: $prod_count[i].innerHTML
        });
      }
      const response = await fetch(`${BASE_URI}/api/orders`, {
        method: 'POST',
        body: JSON.stringify({
          orderProds,
          orderName: $orderName.value,
          orderZipCode: $orderZipCode.value,
          orderAddress: $orderAddress.value,
          orderDetailAddress: base64detailAddress,
          orderPhoneNum: base64phoneNum,
          orderReq: $orderReq.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        alert('주문정보 추가에 실패했습니다.');
        throw new Error('주문정보 추가에 실패했습니다.');
      } else {
        //주문 완료 후 장바구니 초기화
        clearCart();
        response.json();
        alert('주문이 완료되었습니다.');
        navigateTo(BASE_URI);
      }
    });
  });

  //회원 배송지 선택시 html
  $userRadio.addEventListener('click', function () {
    document.querySelector('.deliveryInfoWrap').innerHTML = `
      <li class="order__item delivery__item__info">
          <span class="order__item__label">이름 / 연락처</span>
          <div class="order__item__area">
              <ul class="order__delivery__user">
                  <li id="delivery-name">${userInfo.name}</li>
                   <li id="delivery-mobile">${formedUserPhoneNum}</li>
              </ul>
          </div>
      </li>
      <li class="order__item delivery__item__info">
          <span class="order__item__label">주소</span>
          <div class="order__item__area" id="delivery-addr">(${userInfo.zipCode}) ${userInfo.address} ${userInfo.detailAddress}</div>
      </li> 
      <li class="order__item order__item--overflow delivery__item__info">
          <span class="order__item__label">배송 요청사항</span>
          <div class="order__item__area order__item__area--column">
              <div class="order__select-wrap">
                  <select class="order__select" name="dlv_selectbox" id="dlv_selectbox" onchange="showEtc(this.value);">
                                                  <option value="" selected="selected">
                          배송 시 요청사항을 선택해주세요
                      </option>
                                                  <option value="부재 시 경비실에 맡겨주세요">
                          부재 시 경비실에 맡겨주세요
                      </option>
                                                  <option value="부재 시 택배함에 넣어주세요">
                          부재 시 택배함에 넣어주세요
                      </option>
                                                  <option value="부재 시 집 앞에 놔주세요">
                          부재 시 집 앞에 놔주세요
                      </option>
                                                  <option value="배송 전 연락 바랍니다">
                          배송 전 연락 바랍니다
                      </option>
                                                  <option value="파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.">
                          파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.
                      </option>
                                                  <option value="etc">
                          직접 입력
                      </option>
                                              </select>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="order__select__svg">
                      <path d="M3 6.60001L8.99965 12.6L15 6.60001" stroke="black"></path>
                  </svg>
              </div>
              <textarea class="order__textarea" name="etc_textarea" id="etc_textarea" style="display:none" maxlength="50" onkeyup="return textarea_maxlength(this)" placeholder="최대 50자까지 입력 가능합니다."></textarea>
          </div>
      </li>`;

    const $orderReq = document.querySelector('#dlv_selectbox');

    orderCreateBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      //주문상품목록담기
      const $prod_count = document.querySelectorAll('.prod_count');
      const $prod_num = document.querySelectorAll('.prod_num');
      let orderProds = [];
      for (let i = 0; i < $prod_count.length; i++) {
        orderProds.push({
          prodNum: $prod_num[i].innerHTML,
          orderProdCount: $prod_count[i].innerHTML
        });
      }

      const base64phoneNum = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(formedUserPhoneNum)
      );
      const base64detailAddress = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(userInfo.detailAddress)
      );

      const response = await fetch(`${BASE_URI}/api/orders`, {
        method: 'POST',
        body: JSON.stringify({
          orderProds,
          orderName: userInfo.name,
          orderZipCode: userInfo.zipCode,
          orderAddress: userInfo.address,
          orderDetailAddress: base64detailAddress,
          orderPhoneNum: base64phoneNum,
          orderReq: $orderReq.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        alert('주문정보 추가에 실패했습니다.');
        throw new Error('주문정보 추가에 실패했습니다.');
      } else {
        response.json();
        alert('주문이 완료되었습니다.');
        navigateTo(BASE_URI);
      }
    });
  });
};
