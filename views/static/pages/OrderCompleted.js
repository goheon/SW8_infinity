import AbstractView from './AbstractView.js';

// 접근 권한이 있을 때 들어올 수 있게 해야한다.
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('주문완료');
    this.orderNum = '2020192043019231';
    this.totalPrice = '79000';
    this.address = '서울특별시 성수동 엘리스 ***동 ***호';
    this.orderName = '엘리스';
    this.orderMethod = '무통장입금';
  }

  async getHtml() {
    return `

    <div class="completedContainer">
      <div class="compltedHeader">

        <strong class="completedText">
          <div class="checkContainer">
            <div class="checkicon">
            <span class="icon is-large">
              <i class="fas fa-check"></i>
            </span>
            </div>
            <p>
              주문이 완료되었습니다.
            </p>
          </div>
        </strong>
      </div>
      <table class=">
        <tr class="first">
            <th class="order">주문번호</th>
            <td class="userOrder"><strong>${this.orderNum}</strong></td>
        </tr>
        <tr>
            <th class="order">결제 금액</th>
            <td class="userOrder"><strong>${this.totalPrice}원</strong></td>
        </tr>
        <tr>
            <th class="order">배송지 주소</th>
            <td class="userOrder"><strong>${this.address}</strong></td>
        </tr>
        <tr>
            <th class="order">${this.orderName}</th>
            <td class="userOrder"><strong>홍길동</strong></td>
        </tr>
        <tr class="last">
        
            <th class="order">${this.orderMethod}</th>
            <td class="userOrder"><strong>신용카드</strong></td>
            
        </tr>
      </table>
      <div class="btnContainer">
        <a href="/cart" data-link class="cart"><button class="cartBtn"><i class="fa fa-shopping-cart"></i> 장바구니 이동</button></a>
        <a href="/" data-link class="home"><button class="HomeBtn"><i class="fa fa-tag"></i> 쇼핑 계속하기</button></a>
      </div>
    </div>
    
        `;
  }
}
