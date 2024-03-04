import { colorSizeRegex } from './constant/regex.js';
import {
  addItemToCart,
  getCartItemByKey,
  getCartItems,
  getNextKey,
  removeItemFromCart,
  updateCart
} from './lib/shoppingcart.js';

export const product = async () => {
  // eslint-disable-next-line no-undef
  const swiper = new Swiper('.mySwiper.detail2', {
    spaceBetween: 5,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true
  });
  // eslint-disable-next-line no-undef, no-unused-vars
  const swiper2 = new Swiper('.mySwiper2.detail1', {
    spaceBetween: 10,
    thumbs: {
      swiper
    }
  });

  await loadShopppingCart();

  // 장바구니 추가
  const $ulElements = document.querySelectorAll('.result>ul');
  const $color = document.getElementById('clothColor');
  const $price = document.querySelector('.price');
  const $size = document.getElementById('clothSize');
  const $titleName = document.getElementById('titleName');
  const $addProductBtn = document.querySelector('.add-product-btn');
  const $totalPrice = document.getElementById('total-price');
  const $totalQuantity = document.getElementById('quantity2');
  const totalCalc = (result) => {
    let totalPrice = 0;
    let totalQuantity = 0;

    result.forEach((prod) => {
      // 계산 후 결과 업데이트
      totalPrice += parseInt(prod.price) * parseInt(prod.count);
      totalQuantity += parseInt(prod.count);
    });

    // 결과를 화면에 업데이트
    $totalQuantity.innerHTML = totalQuantity;
    $totalPrice.innerHTML = totalPrice.toLocaleString();
  };
  await getCartItems(totalCalc);

  $addProductBtn.addEventListener('click', async () => {
    console.log('addProductBtn');
    if ($color.value !== '선택해주세요' && $size.value !== '선택해주세요') {
      const nextKey = await getNextKey();
      await updateCartItemList({
        color: $color.value,
        size: $size.value,
        name: $titleName.innerHTML,
        price: parseInt($price.innerHTML),
        id: nextKey,
        count: 1
      });
      await getCartItems(totalCalc);
      return;
    }
    alert('선택해주세요');
    return;
  });
  $ulElements.forEach((prod) => {
    prod.addEventListener('click', async (e) => {
      console.log('-----------------ulElementsProduct');

      const $prodPrice = document.querySelector('.price');
      const $quantity = prod.querySelector('.quantity');
      const $prodTotalPrice = prod.querySelector('.result-number');
      const colorSize = prod.querySelector('.colorSize').innerHTML;
      const [_, color, size] = colorSize.match(colorSizeRegex);
      const $prodName = prod.querySelector('.titleName');

      if (e.target.id === 'increase') {
        await updateCartItemList({
          color,
          size,
          name: $prodName.innerHTML,
          price: parseInt($prodPrice.innerHTML)
        });
      }
      if (e.target.id === 'decrease') {
        const product = await getCartItemByKey(parseInt(prod.id));
        if (product.count <= 0) {
          const temp = await removeItemFromCart(parseInt(prod.id));
          console.log(temp);
          prod.remove();
          return;
        }
        await updateCart(parseInt(prod.id), product.count - 1);
        $quantity.innerHTML = parseInt($quantity.innerHTML) - 1; // 개수 -1
        $prodTotalPrice.innerHTML = (
          parseInt($prodPrice.innerHTML) * parseInt($quantity.innerHTML)
        ).toLocaleString();
      }
      if (e.target.className === 'delete-item') {
        const temp = await removeItemFromCart(parseInt(prod.id));
        console.log(temp);
        prod.remove();
        return;
      }
      await getCartItems(totalCalc);
    });
  });
};

// 페이지 로드 시 장바구니 불러오기
const loadShopppingCart = async () => {
  await getCartItems(loadCreateElement);
};

const updateCartItemList = async (prod) => {
  const $results = document.querySelector('.result');
  let product;
  const result = await addItemToCart(prod);
  console.log(result);
  // 상품이 존재하는 체크 후 +1
  if (result?.check) {
    product = await getCartItemByKey(result.id);
    const $result = document.getElementById(result.id);
    console.log($result);
    const $quantity = $result.querySelector('.quantity');
    const $resultNumber = $result.querySelector('.result-number');

    $quantity.innerHTML = parseInt($quantity.innerHTML) + 1;
    $resultNumber.innerHTML = (product.price * product.count).toLocaleString(); // 버그
    return;
  }
  // 상품이 없을 시에 추가

  const prodId = document.createElement('ul');
  prodId.id = 1;

  prodId.innerHTML = `
      <li>
          <div>
              <p class="titleName">${prod.name}</p>
              <span class="colorSize">- ${prod.color} / ${prod.size}</span>
          </div>
      </li>
      <li>
          <div class="result-wrap">
              <p class="quantity">${prod.count}</p><div id="increase" id="cursor">+</div><div id="decrease" id="cursor">-</div>
          </div>
      </li>
      <li>
          <div class="result-number">${(parseInt(prod.price) * parseInt(prod.count)).toLocaleString()}</div>
      </li>
      <li>
          <div>
              <div class="delete-item" id="cursor">X</div>
          </div>
      </li>
  `;
  $results.appendChild(prodId);
  return;
};

// page 로드 시 장바구니 제품 담기
const loadCreateElement = (prod) => {
  const $result = document.querySelector('.result');
  let $productUl;
  prod.map((product) => {
    let $productUl = document.createElement('ul');
    $productUl.id = product.id;
    $productUl.innerHTML += `
      <li>
          <div>
              <p class="titleName">${product.name}</p>
              <span class="colorSize">- ${product.color} / ${product.size}</span>
          </div>
      </li>
      <li>
          <div class="result-wrap">
              <p class="quantity">${product.count}</p><div id="increase" class="cursor">+</div><div id="decrease" class="cursor">-</div>
          </div>
      </li>
      <li>
          <div class="result-number">${(product.price * product.count).toLocaleString()}</div>
      </li>
      <li>
          <div>
              <div class="delete-item" id="cursor">X</div>
          </div>
      </li>
    `;
    $result.appendChild($productUl);
  });
};
