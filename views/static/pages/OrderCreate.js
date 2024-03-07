import AbstractView from './AbstractView.js';
import { BASE_URI } from '../js/constant/url.js';

  function fetchDataFromIndexedDB() {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open('cartDB', 1);
    request.onsuccess = async function (e) {
      const db = e.target.result;
      const transaction = db.transaction(['cart'], 'readonly');
      const objectStore = transaction.objectStore('cart');
      const request = await objectStore.getAll();
      request.onsuccess = function (e) {
        const data = e.target.result;
        let prodNums = data.map((prod) => prod.prodNum).join(',');
        let prodCounts = data.map((prod) => prod.count).join(',');
        resolve({ prodNums, prodCounts }); // 데이터를 성공적으로 가져온 후에 resolve 호출
      };
    };
    request.onerror = function (e) {
      reject(e.target.error);
    };
  });
}

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('주문하기');
  }
  async getHtml() {
    let prodCounts1;
    let prods;
    let checker;
    //즉시 주문시에만
    const urlParams = new URLSearchParams(window.location.search);
    const prodNums = urlParams.get('prodNums');
    if (prodNums) {
      //상품 상세 정보 요청
      const prodRes = await fetch(
        `${BASE_URI}/api/orders/orderProds?orderProds=${prodNums}`,
        {
          method: 'GET'
        }
      );
      prods = await prodRes.json();
    } else {
      try {
        let { prodNums, prodCounts } = await fetchDataFromIndexedDB();
        prodCounts1 = prodCounts;
        const prodRes = await fetch(
          `${BASE_URI}/api/orders/orderProds?orderProds=${prodNums}`,
          {
            method: 'GET'
          }
        );
        prods = await prodRes.json();
        checker = 1;
      } catch (error) {
        console.error('Error fetching data from IndexedDB:', error);
      }
    }
    /**
     * 주문 내 상품 처리
     */
    //상품 목록 행 생성
    let productTableRows = ``;
    if (checker === 1) {
      prodCounts1 = prodCounts1.split(',');
    }
    for (let i = 0; i < prods.length; i++) {
      const prod = prods[i];
      let orderProdCount = 1;
      if (checker === 1) {
        orderProdCount = prodCounts1[i];
      }
      productTableRows += `
      <tr>
      <td class="td_product">
          <div class="connect_img">
              <a href="#" target="_blank">
                  <img src="${prod.prodImgs[0]}" alt="">
              </a>
          </div>
          <div class="article_info connect_info">
              <div class="box_product">
                  <strong>
                      <span style="color:#09f;"></span>
                      <span style="color:#f00;"></span>
                      [자체 제작]
                  </strong><br/>
                  <span class="list_info">
                      <a href="/product/${prod._id}" target="_blank">${prod.prodName}</a>
                  </span>
                  <br>
                  <span class="list_info" style="display:none">
                  상품번호: <span class="prod_num">${prod._id}</span>
              </span>
              </div>
              <div class="order_option_box"><p>사이즈: ${prod.prodSize} <br>색상: ${prod.prodColor}</p></div>
          </div>
      </td>
      <td><strong><span class="prod_count">${orderProdCount}</span> 개</strong></td>
      <td> 0 원</td>
      <td rowspan="1">그룹1</td>
      <td rowspan="1">
          <span class="box_normal-dlv-amt">무료</span>
      </td>
      <td class="price">
          <strong>${(prod.prodCost * orderProdCount).toLocaleString()} 원</strong>
      </td>
  </tr>
      `;
    }

    return `
    <div class="titleArea">
        <h2>주문하기</h2>
    </div>
    <div>
        <div class="delivery-title">
            <h4 class="order__title">배송정보 등록</h4>
        </div>
        <div>
        <ul class="order-list">
        <li class="order__item delivery__item__info">
            <span class="order__item__label">배송지</span>
            <div class="order__item__area">
                <ul class="order__delivery__radio-wrap" id="quickDeliveryList">
                    <li>
                        <input type="radio" class="n-radio" id="delivery_choice_0" name="delivery_choice" value>
                        <label for="delivery_choice_0">주문정보 배송지</label>
                    </li>
                    <li>
                        <input type="radio" class="n-radio" id="delivery_choice_1" name="delivery_choice"  value>
                        <label for="delivery_choice_1" id="delivery-choice-1">회원님 배송지</label>
                    </li>
                </ul>
            </div>
        </li>
        <div class="deliveryInfoWrap">
        <li class="order__item delivery__item__info">
          <span class="order__item__label">이름 / 연락처</span>
          <div class="order__item__area">
                  <input type="text" id="delivery-name" placeholder="주문자명을 입력해주세요" style="text-align:center; width:150px;"/>
                   <input type="tel"
                   placeholder="010"
                   maxlength="3" 
                   class="phone1"
                   value="010"
                   style="text-align:center; width:80px; margin-left:30px;"
                    />
                    <span class="dash">-</span>
                    <input type="tel"
                   placeholder="1234"
                   maxlength="4" 
                   class="phone2"
                   style="text-align:center; width:80px;"
                    />
               <span class="dash">-</span>
               <input type="tel"
                   placeholder="5678"
                   maxlength="4" 
                   class="phone3"
                   style="text-align:center; width:80px;"
                />
          </div>
      </li>
      <li class="order__item delivery__item__info">
          <span class="order__item__label">주소</span>
          <input class="order__item__area" type="text" readonly id="sample4_postcode">
          <button type="button" class="order__button" id="find-address" >배송지 변경</button>  
      </li>
      <li class="order__item delivery__item__info">
        <span class="order__item__label"></span>
        <input width = "200px" readonly id="sample4_roadAddress">
        <span class="dash"></span>
        <input type="text" class="order__item__area" placeholder="상세주소"/>
      </li>
      <li class="order__item order__item--overflow delivery__item__info">
          <span class="order__item__label">배송 요청사항</span>
          <div class="order__item__area order__item__area--column">
              <div class="order__select-wrap">
                  <select class="order__select" name="dlv_selectbox" id="dlv_selectbox" onchange="showEtc(this.value);">
                                                  <option value="" selected="selected">
                          배송 시 요청사항을 선택해주세요
                      </option>
                                                  <option value="부재 시 경비실에 맡겨주세요">
                          부재 시 경비실에 맡겨주세요
                      </option>
                                                  <option value="부재 시 택배함에 넣어주세요">
                          부재 시 택배함에 넣어주세요
                      </option>
                                                  <option value="부재 시 집 앞에 놔주세요">
                          부재 시 집 앞에 놔주세요
                      </option>
                                                  <option value="배송 전 연락 바랍니다">
                          배송 전 연락 바랍니다
                      </option>
                                                  <option value="파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.">
                          파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.
                      </option>
                                                  <option value="etc">
                          직접 입력
                      </option>
                                              </select>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="order__select__svg">
                      <path d="M3 6.60001L8.99965 12.6L15 6.60001" stroke="black"></path>
                  </svg>
              </div>
              <textarea class="order__textarea" name="etc_textarea" id="etc_textarea" style="display:none" maxlength="50" onkeyup="return textarea_maxlength(this)" placeholder="최대 50자까지 입력 가능합니다."></textarea>
          </div>
      </li>
        </div>
    </ul>
            <div class="order_product_info">
                <h3 class="order__title">주문 상품 정보</h3>
                <!--cart products-->
                <table class="table_basic order_cart_table">
                    <colgroup>
                        <col>
                        <col width="50px">
                        <col width="80px">
                        <col width="70px" class="charge ">
                        <col width="100px" class="charge ">
                        <col width="100px" class="charge ">
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">상품 정보</th>
                            <th scope="col">수량</th>
                            <th scope="col">상품 할인</th>
                            <th scope="col">배송 그룹</th>
                            <th scope="col">배송비</th>
                            <th scope="col">주문금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productTableRows}
                    </tbody>
                </table>
            </div>
            
            <div class="center-orderedit">
                <button type="submit" id="createOrder">주문하기</a>
            </div>
        </div>
    </div>
    `;
  }
}
