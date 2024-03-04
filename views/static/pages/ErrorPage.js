import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('404');
  }



  async getHtml() {
    return `
      <div class="errorContainer">
        <img src="./static/images/ErrorImage.png" class="errorImg">
        <a href="/" data-link>홈페이지로 이동하기  <i class="fas fa-arrow-right"></i></a>
      </div>
    `;
  }
}
