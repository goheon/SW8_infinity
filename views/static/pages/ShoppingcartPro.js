import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('장바구니');
  }

  async getHtml() {
    // <!--여기에 작성-->
    // <div class="titleArea">
    //     <h2><b>shopping cart</b></h2>
    // </div>
    // <div class="shoppingcart">
    //     <img src="shoppingcart.png" alt="상품없음 사진">
    //     <p>장바구니가 비어 있습니다</p>
    //     <a href="#" class="all_product">전체상품주문</a>
    //     <a href="#" class="select_product">선택상품주문</a>
    // </div>
    // <div class="product_all">
    // </div>

    return `
    <div class="titleArea">
      <h2><b>shopping cart</b></h2>
    </div>
    <div class="cart_product">
      <table class="cart_table">
        <caption class="caption">
          장바구니
        </caption>
        <thead>
          <tr class="tr1">
          <th class="th"><input type="checkbox" id="checkbox1" /></th>
          <th class="th1">이미지</th>
          <th class="th2">상품정보</th>
            <th class="th3">수량</th>
            <th class="th4">상품금액</th>
            <th class="th5">배송구분</th>
            <th class="th6">배송비</th>
            <th class="th7">선택</th>
          </tr>
        </thead>
        <tbody class="tbody">

        <tr class="tr3">
          <td class="tr3_td1" colspan="2">[개별배송]</td>
          <td class="tr3_td2" colspan="6">
            상품구매금액 42800+배송비0 = 42800
          </td>
        </tr>
        </tbody>
      </table>
      <a
        href="#"
        class="delete2"
      >선택 삭제</a>
      <p class="discount_guide">
        ❗️ 할인 적용 금액은 주문서작성의 결제예정금액에서 확인 가능합니다
      </p>
      <hr width="100%" />
      <table class="price_table">
        <thead>
          <tr>
            <th class="price_th1">총 상품금액</th>
            <th class="price_th2">총 배송비</th>
            <th class="price_th3">결제예정금액</th>
          </tr>
        </thead>
        <tbody class="paymentPrice">
        </tbody>
      </table>
    </div>
    <div class="order">
      <a href="/order/create" class="all_product" data-link>전체상품주문</a>
      <a href="#" class="select_product" data-link>선택상품주문</a>
    </div>
    <div class="product_all"></div>
        `;
  }
}
