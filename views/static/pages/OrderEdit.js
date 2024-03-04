import AbstractView from './AbstractView.js';
import { BASE_URI } from '../js/constant/url.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Order Edit');
  }

  async getHtml() {
    const res = await fetch(`${BASE_URI}/api/payments?${this.params.orderNum}`, {
        method: 'GET'
      });
      const targetOrder = await res.json();
    return `
    <div class="titleArea">
        <h2>주문내역수정</h2>
    </div>
    <div>
        <div class="delivery-title">
            <h4 class="order__title">배송정보 수정</h4>
        </div>
        <div>
            <ul class="order-list">
                <li class="order__item delivery__item__info">
                    <span class="order__item__label">이름</span>
                    <div class="order__item__area">
                        <ul class="order__delivery__user">
                            <input type="text" id="delivery-name" placeholder="주문자명을 입력해주세요" value="${targetOrder.orderName}"/>
                        </ul>
                    </div>
                </li>
                <li class="order__item delivery__item__info">
                    <span class="order__item__label">연락처</span>
                    <div class="order__item__area">
                        <ul class="order__delivery__user">
                            <input type="tel"
                                placeholder="010"
                                maxlength="3" 
                                class="phone1"
                                value="010"
                            />
                            <span class="dash">-</span>
                            <input type="tel"
                                placeholder="1234"
                                maxlength="4" 
                                class="phone2"
                                value="${targetOrder.orderPhoneNum.substr(3,4)}"
                            />
                            <span class="dash">-</span>
                            <input type="tel"
                                placeholder="5678"
                                maxlength="4" 
                                class="phone3"
                                value="${targetOrder.orderPhoneNum.substr(7,4)}"
                            />
                        </ul>
                    </div>
                </li>
                <li class="order__item delivery__item__info">
                    <span class="order__item__label">주소</span>
                    <input class="order__item__area" id="sample4_postcode" readonly value="(${targetOrder.orderZipCode})">
                    <button type="button" class="order__button" id="find-address" >배송지 변경</button>                    
                </li> 
                <li class="order__item delivery__item__info">
                    <span class="order__item__label"></span>
                    <input width = "200px" id="sample4_roadAddress" readonly value="${targetOrder.orderAddress}">
                    <span class="dash"></span>
                    <input type="text" class="order__item__area" value="${targetOrder.orderDetailAddress}" />
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
            </ul>
            <div class="order_product_info">
                <h3 class="order__title">상품정보 수정</h3>
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
                        <tr>
                            <td class="td_product">
                                <div class="connect_img">
                                    <a href="#" target="_blank">
                                        <img src="/static/images/product.png" alt="셔츠">
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
                                            <a href="#" target="_blank">인피니티 플렌티 스웻 팬츠</a>
                                        </span>
                                    </div>
                                    <div class="order_option_box"><p></p></div>
                                </div>
                            </td>
                            <td><strong>1 개</strong></td>
                            <td>- 55,500 원</td>
                            <td rowspan="1">그룹1</td>
                            <td rowspan="1">
                                <span class="box_normal-dlv-amt">무료</span>
                            </td>
                            <td class="price">
                                <del class="box_origin_price">92,500 원</del>
                                <strong>37,000 원</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="center-orderedit">
                <button type="submit" id="orderEditLink">정보수정</a>
            </div>
        </div>
    </div>
    `;
  }
}
