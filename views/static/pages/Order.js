import { BASE_URI } from '../js/constant/url.js';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Order');
  }

  async getHtml() {
    //유저정보 가져오기
    const userResponse = await fetch('/api/users/getUserId', {
      method: 'GET'
    });
    const userInfo = await userResponse.json();
    const userId = userInfo.userId;
    // 주문 가져오기
    const res = await fetch(`${BASE_URI}/api/orders?userId=${userId}`, {
      method: 'GET'
    });
    const orderData = await res.json();
    console.log(orderData);

    let orderRows = ''; // 주문 행을 저장할 변수 선언

    for (const order of orderData) {
      const orderDetailAddress = order.orderDetailAddress;
      const prodNums = order.orderProds.map((prod) => prod.prodNum).join(','); // 배열을 문자열로 변환하여 조인
      const orderProdCounts = order.orderProds.map(
        (prod) => prod.orderProdCount
      );
      const orderSum = orderProdCounts.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      console.log(orderSum); // 결과: 3
      const prodRes = await fetch(
        `${BASE_URI}/api/orders/orderProds?orderProds=${prodNums}`,
        {
          method: 'GET'
        }
      );
      const orderProdData = await prodRes.json();

      let productInfo = '';
      const $orderDate = new Intl.DateTimeFormat('ko-kr').format(
        new Date(order.orderDate)
      );

      let prodSum=0;
      orderProdData.forEach((product) => {
        productInfo += `
          <div class="product-info">
            <div class="img-box">
              <img src="${product.prodImgs[0]}" alt="상품"/>
            </div>
            <div class="product-txt">
              <p>${product.prodName}</p>
              <p>color: ${product.prodColor}</p>
              <p>옵션 : ${product.prodSize}</p>
            </div>
          </div>
        `;
        prodSum += product.prodCost;
      });

      // 주문 상태에 따라 다른 클래스를 추가하는 조건문
      let orderStatusClass = '';
      let orderNum = order._id;
      let orderNumId
      if (order.orderState === '처리전') {
        orderStatusClass = 'delivery-reject';
        orderNumId = `${orderNum}`;
      } else {
        orderStatusClass = 'delivery-success';
      }

      orderRows += `
        <tr>
          <td>
            <div class="order-imgpage">${productInfo}</div>
          </td>
          <td>${$orderDate}</td>
          <td>${orderDetailAddress}</td>
          <td>${prodSum}원(${orderSum}개)</td>
          <td>
            <div>
              <a class="delivery-btn-status ${orderStatusClass}" href="${BASE_URI}/payment/orderNum=${orderNumId}">${order.orderState}</a>
            </div>
          </td>
        </tr>
      `;
    }

    return `
      <div class="titleArea">
        <h2>주문내역</h2>
      </div>
      <div class="order-content">
        <ul>
          <li><a class="year">최근 1년</a></li>
        </ul>
        <div class="order-table">
          <table>
            <colgroup>
              <col>
              <col width="100px">
              <col width="300px">
              <col width="100px">
              <col width="100px">
            </colgroup>
            <thead>
              <tr>
                <th>상품정보</th>
                <th>주문일자</th>
                <th>배송지주소</th>
                <th>주문금(수량)</th>
                <th>주문상태</th>
              </tr>
            </thead>
            <tbody>
              ${orderRows} <!-- 주문 행들을 추가 -->
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
