import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('마이페이지수정');
  }

  getCss() {
    return '/static/css/mypageEdit.css';
  }

  async getHtml() {
    return `
    <div class="mypage-title">
    <h1>마이페이지</h1>
  </div>
  
  <div class="form-wrap">
    <div class="profile-img">
      <img src="/static/images/Mason.png" alt="프로필">
    </div>
  
    <form class="form">
      <div class="field">
        <div class="profile">
          <p class="profile-name">김인피 님</p>
          <br />
          <p class="profile-p">회원구분 *</p>
        </div>
  
        <div class="check-box">
          <input type="checkbox" id="personal" name="membership" />
          <label for="personal">개인회원</label>
          <input type="checkbox" id="admin" name="membership" />
          <label for="admin">관리자</label>
        </div>
  
        <div class="sentence">
          <label>아이디 *</label>
          <div class="sentence_txt">
            <span>(영어 소대문자/숫자, 4 - 16자)</span>
          </div>
          <p class="control">
            <input class="input idInput" type="text" placeholder="ID" />
          </p>
        </div>
  
        <div class="field passwordInput">
          <div class="sentence">
            <label>비밀번호 *</label>
            <div class="sentence_txt">
              <span>(영어 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자 - 16자)</span>
            </div>
          </div>
          <p class="control">
            <input class="input password" type="password" placeholder="Password" />
          </p>
        </div>
  
        <div class="password-Check">
          <label class="is-small">비밀번호 확인</label>
          <p class="control">
            <input class="input passwordCheck" type="password" placeholder="비밀번호 확인" />
          </p>
        </div>
  
        <div class="fulladdress">
          <label>주소 *</label>
          <div class="ad-Number">
            <input type="text" id="postcode" class="input" placeholder="우편번호" />
            <div>
              <input type="button" class="ad-btn" value="우편번호" />
            </div>
          </div>
          <br />
          <div class="ad-input">
            <input type="text" id="postcode" class="input" />
            <span class="dash">-</span>
            <div class="address-input">
              <input type="text" id="postcode" class="input" />
            </div>
          </div>
        </div>
        <br />
  
        <div class="phoneNumber">
          <label class="is-small">전화번호 *</label>
          <div class="number_box">
            <input class="input" type="tel" placeholder="010" maxlength="3" />
            <span class="dash">-</span>
            <input class="input" type="tel" placeholder="1234" maxlength="4" />
            <span class="dash">-</span>
            <input class="input" type="tel" placeholder="5678" maxlength="4" />
          </div>
        </div>
  
        <div class="name-InputBox">
          <label class="is-emall">이메일</label>
          <p class="control">
            <input class="input nameInput" type="text" placeholder="infinity@naver.com" />
          </p>
        </div>
      </div>
  
      <div class="edit_btn">
        <button type="submit" class="button is-black">수정</button>
      </div>
    </form>
  </div>
    `;
  }
}
