import { navigateTo } from '../../router/index.js';
import { BASE_URI } from './constant/url.js';
import { getCookie } from './lib/getCookie.js';

export const mypage = () => {
  const cookie = getCookie('token');
  if (!cookie) {
    navigateTo(BASE_URI);
  }
  // 사용자 ID를 가져오기
  fetch(`${BASE_URI}/api/users/getUserId`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('사용자 ID를 가져오는 데 실패했습니다');
      }
      return response.json();
    })
    .then((data) => {
      const id = data.userId;

      // 사용자 정보 가져오기
      return fetch(`${BASE_URI}/api/users?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie}`
        }
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는 데 실패했습니다');
      }
      return response.json();
    })
    .then((userData) => {
      const name = userData.name;
      const email = userData.email;

      // 사용자 정보를 페이지에 적용
      const $nameInput = document.querySelector('.name');
      const $emailInput = document.querySelector('.email');
      $nameInput.innerHTML = `${name} 님`;
      $emailInput.innerHTML = email;

      // 사용자 주문 가져오기
      return fetch(`${BASE_URI}/api/orders?userId=${userData.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie}`
        }
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('사용자 주문을 가져오는 데 실패했습니다');
      }
      return response.json();
    })
    .then((orders) => {
      const orderList = document.querySelector('.order_list_con');
      if (orders.length === 0) {
        orderList.innerHTML = `<li><div class="ol_list"><img src="/static/images/icon-cancel.png"></div>주문 내역이 없습니다.</li>`;
      } else {
        orders.forEach((order) => {
          let icon = [
            { img: 'icon-button preparing-btn w-small', name: '처리전' },
            { img: 'icon-button delivery-btn w-small', name: '배송중' },
            { img: 'icon-button complete-btn w-small', name: '배송완료' }
          ]; // 기본값은 '준비 중'
          const foundIcon = icon.find(
            ({ name }) => name === order.orderState
          ) || { img: 'icon-button preparing-btn' }; // 기본값 설정
          const $orderDate = new Intl.DateTimeFormat('ko-kr').format(
            new Date(order.orderDate)
          );

          const orderListItem = document.createElement('li'); // 주문 항목을 동적으로 생성
          orderListItem.innerHTML = `
            <div class="ol_list">
              <table class="mypage-order">
                <colgroup>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                </colgroup>
                <thead>
                  <tr>
                    <th>주문상태</th>
                    <th>주문일자</th>
                    <th>상품</th>
                    <th>갯수</th>
                    <th>상품</th>
                    <th>갯수</th>
                    <th>요청사항</th>
                    <th>배송지</th>
                    <th>우편번호</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="${BASE_URI}/orders/${order.id}" data-link>
                        <button class="${foundIcon.img}"></button>
                      </a> 
                    </td>
                    <td>
                      <p class="center">${$orderDate}</p>
                    </td>
                    <td colspan="4">
                      <div class="my-order">
                      ${order.orderProds.map(
                        (prod) => `
                            <a href="${BASE_URI}/product/${prod.prodNum}" class="center" data-link>상품 상세보기</a>
                            <p class="center">갯수: ${prod.orderProdCount}</p>
                          `
                      )}
                      </div>
                    </td>
                    <td>
                      <p class="center">요청 사항: ${order.orderReq}</p>
                    </td>
                    <td>
                      <p class="center">${order.orderDetailAddress}</p>
                    </td>
                    <td>
                      <p class="center">우편 번호: ${order.orderZipCode}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
             
            </div>`;
          orderList.appendChild(orderListItem); // 생성한 주문 항목을 목록에 추가
        });
      }
    })
    .catch((error) => {
      console.error(`사용자 정보를 가져오는 중 에러 발생: ${error}`);
    });
};
