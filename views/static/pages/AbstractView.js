// 모든 view가 상속받을 일종의 템플릿
export default class {
  constructor(params) {
    this.params = params;
  }
  /**
   *
   * @param {string} title 문서의 제목을 변경한다
   */
  setTitle(title) {
    document.title = title;
  }

  /**
   *
   * @returns {string} - content에 사용할 element 정의
   */
  async getHtml() {
    return '';
  }

  /**
   *
   * @returns {string} - css의 주소(기준은 index.html)
   */
  getCss() {
    return '';
  }

  /**
   *
   * @returns {string} - js의 주소 string (기준은 index.html)
   */
  getJs() {
    return '';
  }
}