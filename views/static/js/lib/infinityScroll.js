import { BASE_URI } from '../constant/url.js';

export const infinityScroll = () => {
  const $productsContainer = document.querySelector('.products');
  let $lastContainer = document.querySelector('.products:last-child');
  let fetchCount = 1;

  // 상품 요소 생성 함수
  const createProduct = (product) => {
    const $prodElement = document.createElement('li');
    $prodElement.innerHTML = `
        <a href=/product/${product._id} data-link>
          <img src="${product.prodImgs[0]}" alt="${product.prodName}" >
          <div>
            <p>${product.prodName}</p>
            <span class="sale-before">₩${product.prodCost}</span><br/>
            <span>${product.prodCost} (7%)</span>
          </div>
        </a>`;
    return $productsContainer.appendChild($prodElement); // 상품 요소를 추가합니다.
  };

  // 데이터 로드 함수
  const loadProducts = async () => {
    const res = await fetch(
      `${BASE_URI}/api/product/list?count=${fetchCount}`,
      {
        method: 'GET'
      }
    );
    const product = await res.json();

    // 받을 상품이 없으면 return
    if (!product.length) {
      observer.unobserve($lastContainer);
      return;
    }
    product.map((prod, index) => {
      createProduct(prod);
      if (index === 11) {
        // 마지막 상품일 때 observe 변경
        $lastContainer = createProduct(prod);
      }
    });
    fetchCount++;
  };

  const getProduct = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        // 데이터 로드 함수 호출
        observer.unobserve($lastContainer);
        await loadProducts();
        observer.observe($lastContainer);
      }
    });
  };
  const io = new IntersectionObserver(getProduct, { threshold: 0.7 });

  // Intersection Observer를 상품 요소에 연결
  io.observe($lastContainer);
};
