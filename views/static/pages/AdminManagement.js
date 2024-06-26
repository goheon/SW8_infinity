import { getCookie } from '../js/lib/getCookie.js';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('주문관리');
    this.ordersData = []; // 전체 주문 데이터 배열
  }

  async getHtml() {
    await this.fetchOrdersData();

    // 주문 데이터를 표시하는 HTML 생성
    const ordersHtml = this.ordersData
      .map(
        (order) => `
        <tr class="adminTbodyTr2">
          <td><input type="checkbox" id="checkbox1" /></td>
          <td>${order._id}</td>
          <td>${order.orderId}</td>
          <td>
            <select>
              <option value="confirmPaid">결제 확인</option>
              <option value="preSet">배송 준비중</option>
              <option value="onGoing">배송중</option>
              <option value="complete">배송완료</option>
            </select>
          </td>
          <td>${new Intl.DateTimeFormat('ko-kr').format(new Date(order.orderDate))}</td>
          <td>카드결제</td>
        </tr>
        `
      )
      .join('');

    // HTML 반환
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
          <div class="set-page">
            <div class="admin-table-wrap">
              <table class="adminTable2">
                <colgroup>
                  <col>
                  <col width="300px">
                  <col width="300px">
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                </colgroup>
                <thead class="adminThead2">
                  <tr class="adminTheadTr2">
                    <th><input type="checkbox" id="checkbox1" /></th>
                    <th>주문번호</th>
                    <th>회원아이디</th>
                    <th>주문상품명</th>
                    <th>구매금액</th>
                    <th>처리상태</th>
                    <th>구매날짜</th>
                    <th>결제수단</th>
                  </tr>
                </thead>
                <tbody class="adminTbody2">
                  ${ordersHtml}
                </tbody>
              </table>
            </div>
            <div class="change">
              <a href="#" class="applyChange" data-link>변경사항 적용</a>
              <a href="#" class="cancel" data-link>취소</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async fetchOrdersData() {
    try {
      // 주문 정보 가져오기
      const response = await fetch(`/api/admin/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('Authorization')
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Order List');
      }

      this.ordersData = await response.json();
    } catch (error) {
      console.error('Error fetching order list:', error);
    }
  }
}
