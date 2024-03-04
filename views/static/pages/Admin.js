import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('관리자페이지');
  }

  async getHtml() {
    return `
    <div class="columns">
    <aside class="column is-2 aside hero is-fullheight">
    <!-- 사이드 바 내용 -->
    <div>
      <div class="compose has-text-centered">
        <a class="button is-danger is-block is-bold">
          <span class="compose">Infinity</span>
        </a>
      </div>
      <div class="main">
        <a href="/admin" class="item" data-link>
          <span class="icon">
            <i class="fa fa-star"></i>
          </span>
          <span class="name">사용자 판매내역</span>
        </a>
        <a href="/admin/adminCategory" class="item" data-link>
          <span class="icon">
            <i class="fa fa-envelope-o"></i>
          </span>
          <span class="name">카테고리</span>
        </a>
        <a href="/admin/adminProductList" class="item" data-link>
          <span class="icon">
            <i class="fa fa-folder-o"></i>
          </span>
          <span class="name">상품</span>
        </a>
        <a href="/admin/adminProductSetting" class="item" data-link>
        <span class="icon">
          <i class="fa fa-folder-o"></i>
        </span>
        <span class="name">상품 생성하기</span>
      </a>
        <a href="/admin/adminManagement" class="item" data-link>
          <span class="icon">
            <i class="fa fa-inbox"></i>
          </span>
          <span class="name">주문관리</span>
        </a>
      </div>
    </div>
  </aside>
      <div class="column messages hero is-fullheight">
        <div>
          <table class="adminTable">
            <thead class="adminThead">
              <tr class="adminTheadTr">
                <th><input type="checkbox" id="checkbox1" /></th>
                <th>회원정보</th>
                <th>이메일</th>
                <th>구매 가격</th>
                <th>배송 상태</th>
                <th>구매 날짜</th>
                <th>결제 수단</th>
                <th>주문번호</th>
              </tr>
            </thead>
            <tbody class="adminTbody">
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>최민식</td>
                <td>asdf1234@naver.com</td>
                <td>69,000원</td>
                <td>배송 완료</td>
                <td>2024.02.17</td>
                <td>카카오페이</td>
                <td>2084984631</td>
              </tr>
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>황정민</td>
                <td>zxcv1234@naver.com</td>
                <td>142,000원</td>
                <td>배송완료</td>
                <td>2024.02.16</td>
                <td>카카오페이</td>
                <td>3578645610</td>
              </tr>
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>전지현</td>
                <td>pulu1234@naver.com</td>
                <td>39,000원</td>
                <td>배송 완료</td>
                <td>2024.02.15</td>
                <td>무통장입금</td>
                <td>1235897520</td>
              </tr>
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>박보영</td>
                <td>cute1004@naver.com</td>
                <td>99,000원</td>
                <td>배송 완료</td>
                <td>2024.02.15</td>
                <td>토스</td>
                <td>3489311552</td>
              </tr>
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>유주환</td>
                <td>lkjh1234@naver.com</td>
                <td>72,000원</td>
                <td>배송 완료</td>
                <td>2024.02.14</td>
                <td>무통장입금</td>
                <td>2589743612</td>
              </tr>
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>정영준</td>
                <td>awtg521@naver.com</td>
                <td>152,000원</td>
                <td>배송 완료</td>
                <td>2024.02.13</td>
                <td>토스</td>
                <td>1597819456</td>
              </tr>
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>류효종</td>
                <td>ngcv524@naver.com</td>
                <td>69000원</td>
                <td>배송 완료</td>
                <td>2024.02.12</td>
                <td>카카오페이</td>
                <td>7894536942</td>
              </tr>
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>이정은</td>
                <td>lxoo221@naver.com</td>
                <td>142,000원</td>
                <td>배송 완료</td>
                <td>2024.02.11</td>
                <td>카드결제</td>
                <td>6899422180</td>
              </tr>
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>이고헌</td>
                <td>aqoz333@naver.com</td>
                <td>39,000원</td>
                <td>배송 완료</td>
                <td>2024.02.10</td>
                <td>카드결제</td>
                <td>8871254443</td>
              </tr>
              <tr class="adminTbodyTr">
                <td><input type="checkbox" id="checkbox1" /></td>
                <td>정한석</td>
                <td>fapp190@naver.com</td>
                <td>72,000원</td>
                <td>배송 완료</td>
                <td>2024.02.09</td>
                <td>토스</td>
                <td>1788894820</td>
              </tr>
            </tbody>
          </table>
          <div class="change">
            <a href="#" class="applyChange" data-link>변경사항 적용</a>
            <a href="#" class="cancel" data-link>취소</a>
          </div>
          <div class="paging">
            <a class="backPage" href="#">＜</a>
            <a href="#" class="currentPage" data-link>1</a>
            <a href="#" data-link>2</a>
            <a href="#" data-link>3</a>
            <a href="#" data-link>4</a>
            <a href="#" data-link>5</a>
            <a class="nextPage" href="#" data-link>＞</a>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
