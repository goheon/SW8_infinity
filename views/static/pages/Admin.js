import { getCookie } from '../js/lib/getCookie.js';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('전체 주문내역');
  }
  
  async getHtml() {
    await this.fetchOrdersData();

    const ordersHtml = this.ordersData
      .map(
        (order, index) => `
        <tr class="adminTbodyTr2">
          <td>${order.orderId}</td>
          <td>${order._id}</td>
          <td>${order.orderState}</td>
          <td>${new Intl.DateTimeFormat('ko-kr').format(new Date(order.orderDate))}</td>
          <td>카드결제</td>
        </tr>
        `
      )
      .join('');

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
        <div class="search-field">
          <span class="search-title">주문내역 검색 : </span>
          <input class="orderId" type="text" placeholder="회원ID를 입력해주세요" />
          <button class="button is-link button is-small" type="submit">검색</button>
        </div>
        <div>
          <table class="adminTable">
            <thead class="adminThead">
              <tr class="adminTheadTr">
                <th>회원ID</th>
                <th>주문번호</th>
                <th>처리상태</th>
                <th>구매날짜</th>
                <th>결제수단</th>
              </tr>
            </thead>
            <tbody class="adminTbody">
              ${ordersHtml}
            </tbody>
          </table>
          <div class="paging">
            <a class="backPage" href="#">＜</a>
            <a class="nextPage" href="#" data-link>＞</a>
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
