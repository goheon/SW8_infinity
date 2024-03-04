import { BASE_URI } from '../js/constant/url.js';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('상품 수정');
  }

  loadProduct = async (param) => {
    const res = await fetch(`${BASE_URI}/api/product?prodNum=${param}`, {
      method: 'GET'
    });
    const {
      prodName,
      prodCost,
      prodContent,
      prodImgs,
      prodRemains,
      prodSize,
      prodColor,
      prodCount,
      productCategory,
      prodStock,
      prodmidifiedData,
      prodRegDate,
      prodSubCategory
    } = await res.json();
    return {
      prodName,
      prodCost,
      prodContent,
      prodImgs,
      prodRemains,
      prodSize,
      prodColor,
      prodCount,
      productCategory,
      prodStock,
      prodmidifiedData,
      prodRegDate,
      prodSubCategory
    };
  };

  async getHtml() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('prodId');
    if (queryParam) {
      const {
        prodName,
        prodCost,
        prodContent,
        prodImgs,
        prodRemains,
        prodSize,
        prodColor,
        prodCount,
        productCategory,
        prodStock,
        prodmidifiedData,
        prodRegDate,
        prodSubCategory
      } = await this.loadProduct(queryParam);

      const imgDiv = prodImgs
        .map((src) => {
          return `<img src="${src}" class="prodImgs" alt="${src}" />`;
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
        <div class="productSetting">
          <div class="addImage">
          <form id="imageForm">
            <div class="imageForm__inner">
              <div class="imageForm__inner--btn">
                <button type="button" class="submit">제출하기</button>
              </div>
              <div class="imageForm__inner--btn">
                <label class="productButton" for="product">이미지 업로드</label>
                <input type="file" id="product" multiple  accept="image/*"/>
              </div>
            </div>  
            <form>
            <div id="previewContainer">
              ${imgDiv}
            </div>
          </div>
          

          <div class="productInformation">
            <label for="productName">상품가격</label><br />
            <input
              type="text"
              id="productName"
              name="productName"
              size="70"
              value=${prodName}
            /><br />
            <label for="productPrice">상품가격</label><br />
            <input
              type="text"
              id="productPrice"
              name="productPrice"
              size="70"
              value=${prodCost}
            /><br />
            <label for="prodContent">상품 설명</label><br />
            <input
              type="text"
              id="prodContent"
              name="prodContent"
              size="70"
              value="${prodContent}"
            /><br />
            <label for="productCategory">상품분류</label><br />
            <input
              type="text"
              id="productCategory"
              name="productCategory"
              size="70"
              value=${prodSubCategory.prodSubCategory}
            /><br />
            
            <label for="stock">재고</label><br />
            <input type="text" id="stock" name="stock" size="70" value=${prodRemains} /><br />
            
            <label for="modificationDate">최종 수정일</label><br />
            <input
              type="text"
              id="prodModificationDate"
              name="prodModificationDate"
              size="70"
              value="${new Intl.DateTimeFormat('ko-kr').format(new Date(prodRegDate))}"
            /><br />

            <label for="productSize">상품Size</label><br />
            <input type="text" id="productSize" name="productSize" size="70" value=${prodSize} /><br />
            
            <label for="productColor">상품Color</label><br />
            <input type="text" id="productColor" name="productSize" size="70" value=${prodColor} /><br />
            
            <label for="productCount">상품 판매 수</label><br />
            <input
              type="text"
              id="productCount"
              name="productCount"
              size="70"
              disabled
              value=${prodCount || 0}
            /><br />

            <div class="productInforButton">
              <button class="prodAdd">상품 추가</a>
              <button class="prodUpdate">상품정보 수정</button>
              <button class="prodDelete">상품 삭제</button>
            </div>
          </div>
        </div>
      </div>
        `;
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
        <a href="/admin/adminManagement" class="item" data-link>
          <span class="icon">
            <i class="fa fa-inbox"></i>
          </span>
          <span class="name">주문관리</span>
        </a>
      </div>
    </div>
  </aside>
        <div class="productSetting">
          <div class="addImage">
          <form id="imageForm">
            <button type="button" class="submit">제출하기</button> </br>
              <label class="productButton" for="product"
                >이미지 업로드<br />
                </label>
                <input type="file" id="product" multiple  accept="image/*"/>
            <form>
            <div id="previewContainer">
            </div>
          </div>
          

          <div class="productInformation">
            <label for="productName">상품가격</label><br />
            <input
              type="text"
              id="productName"
              name="productName"
              size="70"
            /><br />
            <label for="productPrice">상품가격</label><br />
            <input
              type="text"
              id="productPrice"
              name="productPrice"
              size="70"
            /><br />
            <label for="prodContent">상품 설명</label><br />
            <input
              type="text"
              id="prodContent"
              name="prodContent"
              size="70"

            /><br />
            <label for="productCategory">상품분류</label><br />
            <input
              type="text"
              id="productCategory"
              name="productCategory"
              size="70"
    
            /><br />
            
            <label for="stock">재고</label><br />
            <input type="text" id="stock" name="stock" size="70"  /><br />
            
            <label for="modificationDate">최종 수정일</label><br />
            <input
              type="text"
              id="prodModificationDate"
              name="prodModificationDate"
              size="70"
      
            /><br />

            <label for="productSize">상품Size</label><br />
            <input type="text" id="productSize" name="productSize" size="70" /><br />
            
            <label for="productColor">상품Color</label><br />
            <input type="text" id="productColor" name="productSize" size="70" /><br />
            
            <label for="productCount">상품 판매 수</label><br />
            <input
              type="text"
              id="productCount"
              name="productCount"
              size="70"
              disabled

            /><br />

            <div class="productInforButton">
              <button class="prodAdd">상품 추가</a>
              <button class="prodUpdate">상품정보 수정</button>
              <button class="prodDelete">상품 삭제</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
