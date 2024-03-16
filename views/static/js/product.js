import { colorSizeRegex } from './constant/regex.js';
import {
  addItemToCart,
  getCartItemByKey,
  getCartItems,
  getNextKey,
  removeItemFromCart,
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
  const prodNum = document.querySelector('#prodNum');
  const $ulElements = document.querySelectorAll('.result>ul');
  const $color = document.getElementById('clothColor');
  const $price = document.querySelector('.price');
  const $size = document.getElementById('clothSize');
  const $titleName = document.getElementById('titleName');
  const $addProductBtn = document.querySelector('.add-product-btn');
  const $totalPrice = document.getElementById('total-price');
  const $totalQuantity = document.getElementById('quantity2');
  
  //상품 장바구니 내 상품 목록의 총액을 계산하는 콜백함수
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

  $addProductBtn.addEventListener('click', async () => {
    if ($color.value !== '선택해주세요' && $size.value !== '선택해주세요') {
      const nextKey = await getNextKey();
      await updateCartItemList({
        color: $color.value,
        size: $size.value,
        name: $titleName.innerHTML,
        price: parseInt($price.innerHTML),
        id: nextKey,
        prodNum: prodNum.innerHTML,
        count: 1
      }, 'increase');
      await getCartItems(totalCalc);
      return;
    }
    alert('선택해주세요');
    return;
  });

  $ulElements.forEach((prod) => {
    prod.addEventListener('click', async (e) => {

      const $prodPrice = document.querySelector('.price');
      const colorSize = prod.querySelector('.colorSize').innerHTML;
      const [_, color, size] = colorSize.match(colorSizeRegex);
      const $prodName = prod.querySelector('.titleName');

      if (e.target.id === 'increase') {
        await updateCartItemList({
          color,
          size,
          name: $prodName.innerHTML,
          price: parseInt($prodPrice.innerHTML)
        }, e.target.id);
      }

      if (e.target.id === 'decrease') {
        const product = await getCartItemByKey(parseInt(prod.id));
        
        //상품 0개가 되는 경우 체크
        if (product.count <= 1) {
          await removeItemFromCart(parseInt(prod.id));
          prod.remove();
          await getCartItems(totalCalc);
          return;
        }
        await updateCartItemList({
          color,
          size,
          name: $prodName.innerHTML,
          price: parseInt($prodPrice.innerHTML)
        }, e.target.id);
      }

      if (e.target.className === 'delete-item') {
        await removeItemFromCart(parseInt(prod.id));
        prod.remove();
        await getCartItems(totalCalc);
        return;
      }
      await getCartItems(totalCalc);
    });
  });
  const updateCartItemList = async (prod, type) => {
    const $results = document.querySelector('.result');

    const result = await addItemToCart(prod, type);
    // 상품 체크 후 increase인 경우 html +1
    if (result?.check && type ==='increase') {
      const product = await getCartItemByKey(result.id);
      const $result = document.getElementById(result.id);
      const $quantity = $result.querySelector('.quantity');
      const $resultNumber = $result.querySelector('.result-number');
  
      $quantity.innerHTML = parseInt($quantity.innerHTML) + 1;
      $resultNumber.innerHTML = `${(product.price * product.count).toLocaleString()} ₩`;
      return;
    }
    //상품 체크 후 decrease 인 경우 html에서 -1
    if (result?.check && type ==='decrease') {
      const product = await getCartItemByKey(result.id);
      const $result = document.getElementById(result.id);
      const $quantity = $result.querySelector('.quantity');
      const $resultNumber = $result.querySelector('.result-number');
  
      $quantity.innerHTML = parseInt($quantity.innerHTML) - 1;
      $resultNumber.innerHTML = `${(product.price * product.count).toLocaleString()} ₩`;
      return;
    }
  
    // 상품이 없을 시에 추가
    const newProd = document.createElement('ul');
    newProd.id = prod.id;
    newProd.innerHTML = `
    <li>
        <div>
            <p class="titleName">${prod.name}</p>
            <span class="colorSize">- ${prod.color} / ${prod.size}</span>
        </div>
    </li>
    <li>
        <div class="result-wrap">
            <p class="quantity">${prod.count}</p><a id="increase">+</a><a id="decrease">-</a>
        </div>
    </li>
    <li>
        <div class="result-number">${(parseInt(prod.price) * parseInt(prod.count)).toLocaleString()} ₩</div>
    </li>
    <li>
        <div>
            <a class="delete-item">X</a>
        </div>
    </li>
    `;
    // 같은 상품을 장바구니에 담았을 때 검사 후 인덱스디비 안에서 추가해야 함

    $results.append(newProd);
    const addedProd = $results.lastChild
  
    addedProd.addEventListener('click', async (e) => {
      const $prodPrice = document.querySelector('.price');
      const colorSize = addedProd.querySelector('.colorSize').innerHTML;
      const [_, color, size] = colorSize.match(colorSizeRegex);
      const $prodName = addedProd.querySelector('.titleName');
  
      if (e.target.id === 'increase') {
        await updateCartItemList({
          color,
          size,
          name: $prodName.innerHTML,
          price: parseInt($prodPrice.innerHTML)
        }, e.target.id);
      }
  
      if (e.target.id === 'decrease') {
        const product = await getCartItemByKey(parseInt(addedProd.id));
        
        //상품 0개가 되는 경우 체크
        if (product.count <= 1) {
          await removeItemFromCart(parseInt(addedProd.id));
          addedProd.remove();
          await getCartItems(totalCalc);
          return;
        }
        await updateCartItemList({
          color,
          size,
          name: $prodName.innerHTML,
          price: parseInt($prodPrice.innerHTML)
        }, e.target.id);
      }
  
      if (e.target.className === 'delete-item') {
        await removeItemFromCart(parseInt(addedProd.id));
        addedProd.remove();
        await getCartItems(totalCalc);
        return;
      }
      await getCartItems(totalCalc);
    })
    return;
  };
};

// 페이지 로드 시 장바구니 불러오기
const loadShopppingCart = async () => {
  await getCartItems(loadCreateElement);
};


// page 로드 시 장바구니 제품 html 추가 함수
const loadCreateElement = (prod) => {
  const $result = document.querySelector('.result');

  prod.map((product) => {
    $result.innerHTML += `
      <ul id="${product.id}">
        <li>
            <div>
                <p class="titleName">${product.name}</p>
                <span class="colorSize">- ${product.color} / ${product.size}</span>
            </div>
        </li>
        <li>
            <div class="result-wrap">
                <p class="quantity">${product.count}</p><a id="increase">+</a><a id="decrease">-</a>
            </div>
        </li>
        <li>
            <div class="result-number">${(product.price * product.count).toLocaleString()} ₩</div>
        </li>
        <li>
            <div>
                <a class="delete-item">X</a>
            </div>
        </li>
    </ul>
      `;
  });
};
