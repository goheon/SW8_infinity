import {
  getCartItemByKey,
  getCartItems,
  removeItemFromCart,
  updateCart
} from './lib/shoppingcart.js';
import { BASE_URI } from '../js/constant/url.js';

//장바구니 상품 +, - 버튼 기능, 체크박스 선택 상품 삭제 기능, 상품 별 삭제하기 버튼 기능 

export const shoppingcartPro = async (type) => {
  //  데이터 초반 로딩
  await loadShopppingCart();
  removeCategory();

  const $products = document.querySelectorAll('.tr2');

  $products.forEach((prod, index, array) => {
    prod.addEventListener('click', async (event) => {
      event.preventDefault();
      const tr2 = document.querySelector('.tbody>.tr2');
      const $count = prod.querySelector('#result');
      const $prodPrice = prod.querySelector('.prodPrice');
      let id = parseInt(prod.querySelector('.img').alt);

      const prodCart = await getCartItemByKey(id); // 장바구니

      // 장바구니 +1
      if (event.target.className === 'plus') {
        await updateCart(id, parseInt($count.innerHTML) + 1);
        $count.innerHTML = parseInt($count.innerHTML) + 1;
        $prodPrice.innerHTML = `${(prodCart.price * parseInt($count.innerHTML)).toLocaleString()}₩`;
      }

      // 장바구니 -1
      if (event.target.className === 'minus') {
        if (parseInt($count.innerHTML) <= 1) {
          await removeItemFromCart(id);
          tr2.remove();
          await getCartItems(totalElement);
          await getCartItems(paymentPrice);
          return;
        }
        await updateCart(id, parseInt($count.innerHTML) - 1);
        $count.innerHTML = parseInt($count.innerHTML) - 1;
        $prodPrice.innerHTML = `${(prodCart.price * parseInt($count.innerHTML)).toLocaleString()}₩`;
      }

      if (event.target.className === 'delete_product') {
        //¿¿왜 remove가 안되는 건지?????????
        // await removeItemFromCart(id);
        // const greatGrandparentElement = event.target.parentNode.parentNode.parentNode;
        // console.log(greatGrandparentElement);
        // greatGrandparentElement.remove();

        await getCartItems(totalElement);
        await getCartItems(paymentPrice);
        return;
      }
      await getCartItems(totalElement);
      await getCartItems(paymentPrice);
    });
  });
};

const loadShopppingCart = async () => {
  await getCartItems(createElement);
  await getCartItems(totalElement);
  await getCartItems(paymentPrice);
};

const removeCategory = () => {
  const $bestCheckbox = document.getElementById('checkbox1');
  const $checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const $selectDeleteBtn = document.querySelector('.select_delete');
  $bestCheckbox.addEventListener('change', () => {
    $checkboxes.forEach((checkbox) => {
      if (!$bestCheckbox.checked) {
        checkbox.checked = false;
      } else if ($bestCheckbox.checked) {
        checkbox.checked = true;
      }
    });
  });
  const deleteSelectProd = () => {
    const checkboxes = document.querySelectorAll('.checkbox');

    // 선택된 체크박스를 반복하여 처리
    checkboxes.forEach((checkbox) => {
      const greatGrandparentElement = checkbox.parentNode.parentNode.parentNode;
      console.log(greatGrandparentElement);
      console.log('dsadsds');
      // 체크된 체크박스인 경우
      if (checkbox.checked) {
        // 해당 항목 삭제
        console.log('삭제');
      }
    });
  };
  // $selectDeleteBtn.addEventListener('click', deleteSelectProd);
};

const allRemoveCategory = () => {};

const createElement = (categoryProd) => {
  //상품 이미지 src 수정, 
  const $tbody = document.querySelector('.tbody');
  categoryProd.map((product) => {
    $tbody.insertAdjacentHTML(
      'afterbegin',
      `
        <tr class="tr2">
        <td class="tr2_td">
          <input type="checkbox" />
        </td>
        <td class="tr2_td1">
            <div class="product_infor">
              <img
                alt=${product.id}
                src=${product.src || `${BASE_URI}/static/images/product/452140f0091654da13168df50481dc70.webp`}
                class="img"
              />
            </div>
        </td>
          <td>
            <p class="productName">${product.name}</p>
          </td>
        <td>
          <input
            type="button"
            class="plus"
            value="+"
          />
          <input
            type="button"
            class="minus"
            value="-"
          />
          <div id="result">${product.count}</div>
        </td>
        <td class="prodPrice">${(product.price * product.count).toLocaleString()}₩</td>
        <td>기본배송</td>
        <td>무료</td>
        <td>
          <div class="order_delete">
            <a href="/payment" class="select_order" data-link>주문하기</a>
            <a href="#" class="delete_product" data-link>삭제하기</a>
          </div>
        </td>
      </tr>
      `
    );
  });
};

const totalElement = (categoryProd) => {
  let totalPrice = 0;
  categoryProd.forEach((prod) => {
    totalPrice += prod.price * prod.count;
  });
  const $totalPrice = document.querySelector('.tr3_td2');
  $totalPrice.innerHTML = `상품구매금액 ${totalPrice.toLocaleString()}₩
`;
};

const paymentPrice = (categoryProd) => {
  let totalPrice = 0;
  categoryProd.forEach((prod) => {
    totalPrice += prod.price * prod.count;
  });
  const $paymentPrice = document.querySelector('.paymentPrice');
  $paymentPrice.innerHTML = `
    <tr>
      <td class="paymentPrice">${totalPrice.toLocaleString()}₩</td>
      <td>+ ₩0</td>
      <td class="paymentPrice">= ${totalPrice.toLocaleString()}₩</td>
    </tr>
  `;
};
