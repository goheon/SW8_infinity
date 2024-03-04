import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
  }

  async getHtml() {
    return `
    <div class="main-img">
    <div>
        <a>
            <img src="/static/images/main-img3.png">
        </a>
    </div>
    </div>
    <div class="title">
    <div class="main_line"></div>
    <h2>Weekly Best</h2>
    </div>
    <div class="weekly-best">
    <div class="main swiper">
        <div class="swiper-wrapper">
        <!-- Slides -->
            <div class="swiper-slide">
                <img src="/static/images/Mask group.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group-1.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group-2.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group-1.png">
            </div>
            <div class="swiper-slide">
                <img src="/static/images/Mask group-2.png">
            </div>
    
        </div>
        
    </div>
    <div class="swiper-button-prev">
        <img src="/static/images/arrow.png">
    </div>
    <div class="swiper-button-next">
        <img class="rotate" src="/static/images/arrow.png">
    </div>
    </div>
    
    <div class="title">
    <div class="main_line"></div>
    <h2>New Arrival</h2>
    </div>
    <div class="New-arrival">
    <ul class="products">
     
    </ul>
    </div>
    `;
  }
}
