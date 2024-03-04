import { BASE_URI } from '../js/constant/url.js';
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    console.log(this.params);
    this.setTitle('Product');
  }

  getCss() {
    return './static/css/product.css';
  }

  getJs() {
    return './static/js/product.js';
  }

  async getHtml() {
    const res = await fetch(
      `${BASE_URI}/api/product?prodNum=${this.params.prodId}`,
      {
        method: 'GET'
      }
    );
    const prodData = await res.json();

    // 재고(prodRemains), 상품판매(prodCount)도 생각해야함
    const swiperImage = prodData.prodImgs
      .map((imgSrc) => {
        return `<div class="swiper-slide">
                    <img src="${imgSrc}"/>
                </div>`;
      })
      .join('');
    const selectColorInput = `<option>${prodData.prodColor}</option>`;
    //   .map((prod, index) => {
    //     if (index === 0) {
    //       return `<option selected>${prod.prodColor}</option>`;
    //     }
    //     return `<option value="${prod.prodColor}">${prod.prodColor}</option>`;
    //   })
    //   .join('');

    const selectSizeInput = `<option>${prodData.prodSize}</option>`;
    //   .map((prod, index) => {
    //     if (index === 0) {
    //       return `<option selected>${prod.prodSize}</option>`;
    //     }
    //     return `<option value="${prod.prodSize}">${prod.prodSize}</option>`;
    //   })
    //   .join('');

    const prodImage = prodData.prodImgs
      .map((imgSrc) => {
        return `<img src="${imgSrc}">`;
      })
      .join('');
    console.log(prodImage);
    return `
    <div class="detail-product">
        <div class="leftside-area">
            <div class="swiper mySwiper2 detail1">
                <div class="swiper-wrapper">
                    ${swiperImage}
                </div>
                </div>
                <div thumbsSlider="" class="swiper mySwiper detail2">
                <div class="swiper-wrapper">
                    ${swiperImage}
                </div>
            </div>
        </div>
        <div class="rightside-area">
            <div class="title-product">
                <h4><b id="titleName">${prodData.prodName}</b></h4>
            </div>
            <div class="detail-txt">
                <ul>
                    <li>
                        <div>
                            <p>Price</p>
                            <span class="price">${prodData.prodCost}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Comment</p>
                            <span>
                                <i>only infinity</i>
                                <br/>
                                ${prodData.prodContent}
                                <br/><br/>
                                <i>
                                    오직 infinity에서만 만나보실 수 있습니다.<br/>
                                    출시 기념 무료배송 이벤트 진행합니다.♡
                                </i>
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>color</p>
                            <span>${prodData.prodColor}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>fabric</p>
                            <span>${prodData.prodSize}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>size (cm)</p>
                            <span>
                                롱 기장 : 허리 밴딩34 / 밑위33 / 허벅지36 / 밑단26 / <i class="total-length">총길이106</i><br/>
                                기본 기장 : 허리 밴딩34 / 밑위33 / 허벅지36 / 밑단26 / <i class="total-length">총길이98</i> 
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="special-selection">
                <div>
                    <p>color</p>
                    <div class="select">
                        <select id="clothColor">
                            <option selected>선택해주세요</option>
                            ${selectColorInput}
                        </select>
                    </div>
                </div>
                <div>
                    <p>size</p>
                    <div class="select">
                        <select id="clothSize">
                            <option selected>선택해주세요</option>
                            ${selectSizeInput}
                        </select>
                    </div>
                </div>
            </div>

            <div class="result"></div>

            <div class="total-amount">
                <ul>
                    <li>
                        <div>
                            <p><b>Total</b>(Qty) : <b id="total-price">0</b>₩ (<span id="quantity2">0</span>개)</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <a href="/payment" class="get-product-btn" data-link>Buy Now</a>
                            <a class="add-product-btn">Add to Cart</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="img-section">
        <div>
        ${prodImage}
        </div>
    </div>

    <div class="comment-box">
        <ul>
            <li>
                <div>
                    <p>payment Info</p>
                    <div>
                        <p>
                            - 결제 가능 수단 -
                            <br/><br/>
                            무통장입금<br/>
                            실시간계좌이체<br/>
                            신용카드<br/>
                            휴대폰결제<br/>
                            네이버페이<br/>
                        </p>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <p>Delivery Info</p>
                    <div>
                        <p>
                            밤 9시 이전 주문건들에 한하여 그 다음날 배송이 출고됩니다. (주말, 공휴일 제외)<br/>
                            주문량이 많거나 리오더 중인 제품은 배송 출고까지 기간이 조금 더 걸릴 수 있습니다.<br/>
                            배송 지연이 길어질 경우 따로 안내해 드립니다.^^
                        </p>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <p>Return & Exchange Info</p>
                    <div>
                        <p>
                            교환 및 반품안내는 Notice 게시판을 참고해주세요 :&#41;
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    `;
  }
}
