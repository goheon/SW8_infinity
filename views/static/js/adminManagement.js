import { BASE_URI } from './constant/url.js';
import { navigateTo } from '../../router/index.js';
import { getCookie } from './lib/getCookie.js';

export const adminManagement = async () => {
  const cookie = getCookie('token');
  if (!cookie) {
    navigateTo(BASE_URI);
    return; // 함수 종료
  }

  try {
    // 주문 정보 가져오기
    const response = await fetch(`/api/admin/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('Authorization')
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Order List');
    }

    const ordersData = await response.json();

    // 주문 테이블에 주문 행을 추가합니다.
    const $tableBody = document.querySelector('.adminTbody2');
    $tableBody.innerHTML = ''; // Clear previous data

    for (let [index, order] of ordersData.entries()) {
      const $orderRow = document.createElement('tr');
      $orderRow.classList.add('adminTbodyTr2');

      // 체크박스 셀을 추가합니다.
      const $checkboxCell = document.createElement('td');
      const $checkboxInput = document.createElement('input');
      $checkboxInput.setAttribute('type', 'checkbox');
      $checkboxInput.setAttribute('id', `checkbox${index + 1}`);
      $checkboxCell.appendChild($checkboxInput);
      $orderRow.appendChild($checkboxCell);

      // 주문 행을 추가한 후에 상품 정보를 가져와서 이미지 셀에 추가합니다.
      for (let orderProd of order.orderProds) {
        try {
          const productResponse = await fetch(
            `/api/product?prodNum=${orderProd.prodNum}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          if (!productResponse.ok) {
            const $newImageCell = document.createElement('td');
            const $imgTableAdmin = document.createElement('div');
            $imgTableAdmin.classList.add('admin-order-table');
            $newImageCell.appendChild($imgTableAdmin);

            $imgTableAdmin.innerHTML = `
              <div style="color:red">상품 정보를 가져올 수 없습니다.</div>
            `;
            $orderRow.appendChild($newImageCell);
            throw new Error('Failed to fetch Product Info');
          }

          const productData = await productResponse.json();

          // 새로운 이미지 셀을 만듭니다.
          const $newImageCell = document.createElement('td');
          const $imgTableAdmin = document.createElement('div');
          $imgTableAdmin.classList.add('admin-order-table');
          $newImageCell.appendChild($imgTableAdmin);

          // 상품 데이터가 존재하는 경우에만 이미지 셀에 상품 정보를 추가합니다.
          if (productData) {
            // 상품 이미지를 표시합니다.

            const $productImage = document.createElement('img');
            $productImage.classList.add('img-table');
            $productImage.setAttribute('src', productData.prodImgs[0]); // 첫 번째 이미지를 사용하거나 상황에 맞게 선택합니다.
            $imgTableAdmin.appendChild($productImage);

            const $productWrap = document.createElement('div');

            // 상품 이름을 표시합니다.
            const $productName = document.createElement('div');
            $productName.textContent = productData.prodName;
            $productWrap.appendChild($productName);

            // 가격을 표시합니다.
            const $price = document.createElement('div');
            $price.style.color = 'red';
            $price.textContent = `가격: ${productData.prodCost}원`;
            $productWrap.appendChild($price);
            $imgTableAdmin.appendChild($productWrap);
          }
          // 주문 행에 새로운 이미지 셀을 추가합니다.
          $orderRow.appendChild($newImageCell);
        } catch (error) {
          console.error('Error fetching product info:', error);
        }
      }

      // 나머지 주문 정보를 추가합니다.
      const $orderDate = new Intl.DateTimeFormat('ko-kr').format(
        new Date(order.orderDate)
      );

      $orderRow.innerHTML += `
        <td>${order.orderId}</td>
        <td>
        ${order.orderState === '처리전' ? '배송중' : order.orderState}
        </td>
        <td>${$orderDate}</td>
        <td>카드결제</td>
        <td>${index + 1}</td>
      `;

      // 주문 테이블에 주문 행을 추가합니다.
      $tableBody.appendChild($orderRow);
    }
  } catch (error) {
    console.error('Error fetching order list:', error);
  }
};
