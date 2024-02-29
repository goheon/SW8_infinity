import { errorFnc } from '../static/js/errorFnc.js';
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
  document.querySelector('#container>#contents_main').innerHTML =
    await view.getHtml();
  match.route.Script();
};

export const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  rightbar();
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

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
