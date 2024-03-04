import { categorysEnum } from '../static/js/constant/categorys.js';
import { BASE_URI } from '../static/js/constant/url.js';
import { getCookie } from '../static/js/lib/getCookie.js';
export const rightbar = async () => {
  const $rightBar = document.getElementById('rightbar');
  const $leftBar = document.querySelector('.menu-list');

  const res = await fetch(`${BASE_URI}/api/category`, {
    method: 'GET'
  });
  const categorys = await res.json();
  // console.log(categorys);
  // categorys.map((category) => {
  //   $leftBar.innerHTML = `
  //     <li><a href="${BASE_URI}/categorys/${categorysEnum[category.prodMajorCategory]}" data-link>${categorysEnum[category.prodMajorCategory]}</a></li>
  //   `;
  // });

  // 중복을 제거한 prodMajorCategory 목록
  const uniqueMajorCategories = Array.from(
    new Set(
      categorys.map((category) => [category._id, category.prodMajorCategory])
    )
  );

  // 메뉴 아이템을 담을 변수
  let menuItems = '';
  // 각 prodMajorCategory에 대한 메뉴 아이템을 생성
  uniqueMajorCategories.forEach((majorCategory, index) => {
    const category = categorys.find(
      (category) => category.prodMajorCategory === majorCategory[1]
    );
    menuItems += `
      <li><a href="${BASE_URI}/categorys/${categorysEnum[category.prodMajorCategory]}?prodMajorCategoryId=${majorCategory[0]}" data-link>${categorysEnum[category.prodMajorCategory]}</a></li>
  `;
  });

  // HTML에 메뉴 아이템을 추가
  $leftBar.innerHTML = menuItems;

  document.querySelectorAll('.menu-list li a').forEach((item) => {
    item.addEventListener('click', function (event) {
      // 현재 클릭한 항목에 이미 is-active 클래스가 있을 경우에는 토글 동작을 수행하지 않습니다.
      if (!this.classList.contains('is-active')) {
        // 기존에 is-active 클래스가 지정된 항목들을 모두 찾습니다.
        const activeItems = document.querySelectorAll(
          '.menu-list li a.is-active'
        );

        // 기존에 is-active 클래스가 지정된 항목들에서 현재 클릭한 항목을 제외한 나머지 항목들의 is-active 클래스를 제거합니다.
        activeItems.forEach((activeItem) => {
          if (activeItem !== this) {
            activeItem.classList.remove('is-active');
          }
        });

        // 현재 클릭한 항목에 is-active 클래스를 토글합니다.
        this.classList.toggle('is-active');
      }
    });
  });

  const cookie = getCookie('token');

  if (!cookie) {
    $rightBar.innerHTML = `
    <div class="cart-txt">
      <a href="/shoppingCart" data-link class="totalCartCount">Cart ― 0</a>
    </div>
    <div class="right-element">
      <a href="/login" class="log" data-link>Log in</a>
      <a href="/signup" data-link>Register</a>
    </div>`;
    return;
  }

  $rightBar.innerHTML = `
      <div class="cart-txt">
        <a href="/shoppingCart" data-link class="totalCartCount">Cart ― 0</a>
      </div>
      <div class="right-element">
        <a href="/order" data-link>Order</a>
        <a href="/mypage" data-link>My Page</a>
        <button id="logout">Log out</button>
      </div>
`;

  const $logoutBtn = document.getElementById('logout');
  $logoutBtn.addEventListener('click', () => {
    document.cookie =
      'token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  });

  return;
};
