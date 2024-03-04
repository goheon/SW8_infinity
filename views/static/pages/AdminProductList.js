import { BASE_URI } from '../js/constant/url.js';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('상품 관리');
    console.log(params);
  }

  async getHtml() {
    const res = await fetch(`${BASE_URI}/api/product/list`, {
      method: 'GET'
    });
    const products = await res.json();

    const productsElements = products
      .map((prod) => {
        const deleteDate = prod.prodUseYn
          ? `삭제 날짜: ${new Intl.DateTimeFormat('ko-kr').format(
              new Date(prod.prodUseYn)
            )}`
          : '삭제안됨';
        return `

      <div class="product-item">
        <div class="product-Description">
          <div class="description-Image">
            <img src="${prod.prodImgs[0]}" alt="clothes-image" />
          </div>
          <div class="description-Content">
          <p class="des-Text-Id">ID : ${prod._id}</p>
          <p class="des-Text">${prod.prodName}</p>
          <p>Outer</p><br>
          <p class="des-Text">${prod.prodCost.toLocaleString()}원</p>
          </div>
          <div class="des-more-content">
            <a href="/admin/adminProductSetting?prodId=${prod._id}" data-link class="update-href">수정하기</a>
          </div>
          </div>
          <div>
            <p class="explain-item-main">상품설명</p>
            <p class="explain-item-main">${deleteDate}</p>
            </p>
            <p class="explain-item-sub">${prod.prodContent}</p>
          </div>
          <div class="product-status">
            <a class="ps-text">주문건수</a><a>${prod.prodCount}</a><br>
            <a class="ps-text2">재고량</a><a>${prod.prodRemains}</a>
          </div>
      </div>
      `;
      })
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
    <div class="flexbox-Container">
    
      ${productsElements}

    </div>
      </div>
    `;
  }
}
