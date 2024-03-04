import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('회원가입');
  }

  async getHtml() {
    return `
    <div class="titleArea">
            <h2>Register</h2>
          </div>

          <div class="form-wrapper">
            <form class="form">
              <div class="field">
                <div class="sentence">
                  <label>이메일 *</label>
                  <div class="sentence_txt">
                    <span>(영어소문자/숫자, 4 - 16자)</span>
                  </div>
                </div>
                <p class="control">
                  <input
                    class="input emailInput"
                    type="email"
                    placeholder="Email"
                  />
                </p>
              </div>

              <div class="field">
                <div class="sentence">
                  <label>아이디 *</label>
                  <div class="sentence_txt">
                    <span>(영어소대문자/숫자, 8 - 32자)</span>
                  </div>
                </div>
                <p class="control">
                  <input
                    class="input idInput"
                    type="text"
                    placeholder="ID"
                  />
                </p>
              </div>

              <div class="field passwordInput">
                <div class="sentence">
                  <label>비밀번호 *</label>
                  <div class="sentence_txt">
                    <span
                      >(영어 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자 -
                      16자)</span
                    >
                  </div>
                </div>
                <p class="control">
                  <input
                    class="input password"
                    type="password"
                    placeholder="Password"
                  />
                </p>
              </div>

              <div class="field passwordCheck">
                <label class="is-small">비밀번호 확인</label>
                <p class="control">
                  <input
                    class="input passwordCheck"
                    type="password"
                    placeholder="비밀번호 확인"
                  />
                </p>
              </div>

              <div class="field nameInputBox">
                <label class="is-small">이름</label>
                <p class="control">
                  <input
                    class="input nameInput"
                    type="text"
                    placeholder="이름"
                  />
                </p>
              </div>

              <div class="field phoneNumber">
                <label class="is-small">전화번호 *</label>
                <div class="control is-grouped number_box">
                  <input
                    class="input"
                    type="tel"
                    placeholder="010"
                    maxlength="3"
                  />
                  <span class="dash">-</span>
                  <input
                    class="input"
                    type="tel"
                    placeholder="1234"
                    maxlength="4"
                  />
                  <span class="dash">-</span>
                  <input
                    class="input"
                    type="tel"
                    placeholder="5678"
                    maxlength="4"
                  />
                </div>
              </div>

              <div class="filed fulladdress">
                <label>주소 *</label>
                <div class="address-input">
                  <input
                    type="text"
                    id="sample4_postcode"
                    class="input"
                    placeholder="우편번호"
                  />
                  <input
                    type="button"
                    class="add_button mt_add_2"
                    value="우편번호 찾기"
                  />
                  <br /><br />
                  <input
                    type="text"
                    id="sample4_roadAddress"
                    class="input"
                    placeholder="도로명주소"
                  />
                  <input
                    type="text"
                    id="sample4_jibunAddress"
                    class="input"
                    placeholder="지번주소"
                  />
                  <br /><br />
                  <span id="guide" style="color: #999; display: none"></span>
                  <input
                    type="text"
                    id="sample4_detailAddress"
                    class="input"
                    placeholder="상세주소"
                  />
                  <input
                    type="text"
                    id="sample4_extraAddress"
                    class="input"
                    placeholder="참고항목"
                  />
                  <!-- <input
                    class="input address"
                    type="text"
                    placeholder="주소"
                    disabled
                  />
                  <button
                    type="button"
                    class="button is-light"
                    onclick="postalCode(this)"
                  >
                    우편번호
                  </button> -->
                </div>
              </div>

              <div class="feild pt-6">
                <p class="signup_title_txt mb-2">[필수] 이용약관 동의</p>
                <div class="termsOfUse">
                  본 Infinity에서는 다양한 상품 및 서비스를 제공합니다. 제품
                  정보, 가격 및 구매 절차에 대한 자세한 내용은 쇼핑몰 내에서
                  확인하실 수 있습니다. 이용자의 의무: 회원 가입 시 제공하는
                  정보는 정확하게 기입하여야 합니다. 본 쇼핑몰을 이용하는 동안
                  타인의 권리를 침해하거나 법률을 위반하는 행위를 하여서는 안
                  됩니다. 제품의 구매나 환불, 교환 등의 경우 쇼핑몰의 정책에
                  따라 이용해야 합니다. 개인정보 처리 및 보호 정책: 개인정보
                  수집, 이용, 보호에 관한 내용은 별도의 개인정보 처리 및 보호
                  정책에 따릅니다. 주문 및 결제: 상품 주문 시 주문 내용을 정확히
                  확인하고 결제를 진행하여야 합니다. 결제 방법은 쇼핑몰에서
                  제시한 방법에 따라야 합니다. 반품 및 교환 정책: 제품의 반품 및
                  교환은 쇼핑몰의 정책에 따라 처리됩니다. 귀하의 쇼핑몰에서
                  제공하는 반품 및 교환 절차를 준수해야 합니다. 책임 제한: 본
                  쇼핑몰은 제품의 하자나 배송 지연 등으로 인한 손해에 대해
                  책임을 지지 않습니다. 다만 관련 법령에 따라 소비자의 권리를
                  보장해드립니다. 분쟁 해결 및 관할 법원: 본 쇼핑몰 이용으로
                  인한 분쟁은 상호 협의를 통해 해결하며, 합의에 이르지 않는 경우
                  관할 법원에 소를 제기할 수 있습니다. 서비스 제공자 정보: 상호:
                  [회사명] 대표자: [대표자명] 주소: [회사 소재지 주소] 전화번호:
                  [연락처] 이메일: [이메일 주소] 변경 사항 고지: 이용 약관의
                  내용이 변경될 경우, 변경 사항을 쇼핑몰 내에서 공지하며, 변경된
                  약관은 공지 후 적용됩니다.
                </div>
                <div class="control accept-area">
                  <p class="accept-txt">이용약관에 동의하십니까?</p>
                  <div class="accept-box">
                    <label class="radio">
                      <input type="radio" name="radio1" />
                    </label>
                    <p class="accept-txt pb-1">동의함</p>
                  </div>
                </div>
              </div>

              <div class="feild pt-6">
                <p class="signup_title_txt mb-2">[필수] 이용약관 동의</p>
                <div class="termsOfUse is-rounded">
                  본 Infinity에서는 다양한 상품 및 서비스를 제공합니다. 제품
                  정보, 가격 및 구매 절차에 대한 자세한 내용은 쇼핑몰 내에서
                  확인하실 수 있습니다. 이용자의 의무: 회원 가입 시 제공하는
                  정보는 정확하게 기입하여야 합니다. 본 쇼핑몰을 이용하는 동안
                  타인의 권리를 침해하거나 법률을 위반하는 행위를 하여서는 안
                  됩니다. 제품의 구매나 환불, 교환 등의 경우 쇼핑몰의 정책에
                  따라 이용해야 합니다. 개인정보 처리 및 보호 정책: 개인정보
                  수집, 이용, 보호에 관한 내용은 별도의 개인정보 처리 및 보호
                  정책에 따릅니다. 주문 및 결제: 상품 주문 시 주문 내용을 정확히
                  확인하고 결제를 진행하여야 합니다. 결제 방법은 쇼핑몰에서
                  제시한 방법에 따라야 합니다. 반품 및 교환 정책: 제품의 반품 및
                  교환은 쇼핑몰의 정책에 따라 처리됩니다. 귀하의 쇼핑몰에서
                  제공하는 반품 및 교환 절차를 준수해야 합니다. 책임 제한: 본
                  쇼핑몰은 제품의 하자나 배송 지연 등으로 인한 손해에 대해
                  책임을 지지 않습니다. 다만 관련 법령에 따라 소비자의 권리를
                  보장해드립니다. 분쟁 해결 및 관할 법원: 본 쇼핑몰 이용으로
                  인한 분쟁은 상호 협의를 통해 해결하며, 합의에 이르지 않는 경우
                  관할 법원에 소를 제기할 수 있습니다. 서비스 제공자 정보: 상호:
                  [회사명] 대표자: [대표자명] 주소: [회사 소재지 주소] 전화번호:
                  [연락처] 이메일: [이메일 주소] 변경 사항 고지: 이용 약관의
                  내용이 변경될 경우, 변경 사항을 쇼핑몰 내에서 공지하며, 변경된
                  약관은 공지 후 적용됩니다.
                </div>
                <div class="control accept-area">
                  <p class="accept-txt">이용약관에 동의하십니까?</p>
                  <div class="accept-box">
                    <label class="radio">
                      <input type="radio" name="radio2" />
                    </label>
                    <p class="accept-txt pb-1">동의함</p>
                  </div>
                </div>
              </div>

              <div class="submit_btn">
                <button type="submit" class="button is-black">Register</button>
              </div>
            </form>
          </div>
        `;
  }
}
