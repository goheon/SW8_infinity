import { BASE_URI } from '../js/constant/url.js';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('관리자페이지');
  }

  async getHtml() {
    const res = await fetch(`${BASE_URI}/api/category`, {
      method: 'GET'
    });
    const categoriesData = await res.json();
    let categories = ``;
    //대분류 생성
    for (let majorCategory of categoriesData) {
      categories += `<form action="" class="form-box">
      <div class="ct-box" id="ct-${majorCategory.prodMajorCategory}">
        <span class="ct-product">${majorCategory.prodMajorCategory}</span>
        <div class="ct-button-box">
          <button class="button is-link edit-product">추가</button>
          <button class="button is-success edit-product">수정</button>
          <button class="button is-black edit-product">삭제</button>
        </div>
      </div>
    </form>

      `;

      for (let subCategory of majorCategory.prodSubCategories) {
        categories += `
       <form action="" class="acform-box">
      <div class="ac-box" id="ad-${subCategory.prodSubCategory}">
        <span class="ac-product">${subCategory.prodSubCategory}</span>
        <div class="ac-button-box">
          <button class="button is-link edit-product">추가</button>
          <button class="button is-success edit-product">수정</button>
          <button class="button is-black edit-product">삭제</button>
        </div>
      </div>
    </form>`;
      }
    }

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
    <div class="admin-ct-title">
    <h2>카테고리</h2>
  </div>
  <div class="admin-ct-all">
    <div class="admin-ct-control-btn">
      <button class="button is-link con-add">추가</button>
    </div>
    ${categories}
   </div>
    
    <div class="admin-ct-applybtn">
      <button class="button is-link edit-apply">변경 사항 적용</button>
      <button class="button is-black cancle-apply">취소</button>
    </div>
  </div>
</div>
</div>
    
    </div>
    </div>
    `;
  }
}
