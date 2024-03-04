import { categorysEnum } from '../js/constant/categorys.js';
import AbstractView from './AbstractView.js';

// 무한스크롤 구현
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('categoryProducts');
    console.log(this.params);
    // data fetching 후 변경 예정

    this.count = 12; // 검색 결과에 따른 count
  }

  async getHtml() {
    const enumValues = Object.values(categorysEnum);
    const paramValues = Object.values(this.params);

    // enum 과 parameter 비교
    const hasMatch = paramValues.some((value) => enumValues.includes(value));
    if (!hasMatch) {
      window.history.pushState(null, '', '/error');
      return '';
    }
    return `
    <div class="titleContainer">
        <strong class="categoryTitle">${paramValues}</strong>
    </div>
    <div class="New-arrival">
    <p class="searchCount">검색 결과 ${this.count}개 검색.</p>
      <ul class="products">
      </ul>
    </div>
    `;
  }
}
