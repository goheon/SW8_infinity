import { errorFnc } from '../static/js/errorFnc.js';
import { totalCountCalc } from '../static/js/lib/shoppingcart.js';
import ErrorPage from '../static/pages/ErrorPage.js';
import { getParams, pathToRegex } from './navigate.js';
import { rightbar } from './navigation.js';
import { routes } from './routes.js';

const router = async () => {
  const potentialMatches = routes.map((route) => ({
    route,
    result: window.location.pathname.match(pathToRegex(route.Path))
  }));
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  // route에 정의된 곳으로 이동하지 않는다면 기본값으로 되돌린다.
  if (!match) {
    match = {
      route: { Path: '/error', View: ErrorPage, Script: errorFnc },
      result: [window.location.pathname]
    };
    window.history.pushState(null, '', '/error');
  }
  const view = new match.route.View(getParams(match));
  // contents_main element 에 추가https://eslint.org/docs/latest/rules/new-cap
  if (match.route.Path.includes('/admin')) {
    document.body.innerHTML = await view.getHtml();
  } else {
    // 일반 페이지일 때는 contents_main element에 view의 HTML을 설정합니다.
    document.querySelector('#container>#contents_main').innerHTML =
      await view.getHtml();
  }
  match.route.Script();

  await totalCountCalc();
};

export const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  rightbar();
  document.body.addEventListener('click', (e) => {
    if (
      e.target.tagName === 'IMG' &&
      e.target.parentElement.tagName === 'A' &&
      e.target.parentElement.hasAttribute('data-link')
    ) {
      // 이미지가 클릭된 경우 부모 <a> 태그의 기본 동작 막기
      e.preventDefault();
      window.scroll({ top: 0 });
      navigateTo(e.target.parentElement.href);
    } else if (e.target.tagName === 'A' && e.target.hasAttribute('data-link')) {
      // 클릭된 요소가 <a> 태그이고 data-link 속성을 가지고 있는 경우
      e.preventDefault(); // 기본 동작 막기
      navigateTo(e.target.href); // 링크 처리
    }
  });
  router();
});
document.querySelector('.logo').addEventListener('click', (e) => {
  const activeItems = document.querySelectorAll('.menu-list li a.is-active');

  // 기존에 is-active 클래스가 지정된 항목들에서 현재 클릭한 항목을 제외한 나머지 항목들의 is-active 클래스를 제거합니다.
  activeItems.forEach((activeItem) => {
    activeItem.classList.remove('is-active');
  });
});
