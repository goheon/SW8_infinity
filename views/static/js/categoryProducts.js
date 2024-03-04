// 카테고리별 상품을 나열할 함수

import { pathRegex } from './constant/regex.js';
import { infinityScroll } from './lib/infinityScroll.js';
export const categoryProducts = () => {
  const path = window.location.pathname;
  const pathParameter = path.match(pathRegex)[1];
  infinityScroll(pathParameter);
};
