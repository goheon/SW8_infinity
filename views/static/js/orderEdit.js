import { BASE_URI } from '../js/constant/url.js';
import { getCookie } from './lib/getCookie.js';
import { ExecDaumPostcode } from './lib/daumPostCode.js';

export const orderEdit = async () => {
    const cookie = getCookie('token');
    if (!cookie) {
        navigateTo(BASE_URI);
    }

    const $orderName = document.querySelector('#delivery-name');
    const $orderPhone1 = document.querySelector('.phone1');
    const $orderPhone2 = document.querySelector('.phone2');
    const $orderPhone3 = document.querySelector('.phone3');
    const $orderZipCode = document.querySelector('#sample4_postcode');
    const $orderAddress = document.querySelector('#sample4_roadAddress');
    const $orderDetailAddress = document.querySelector('#sample4_detailAddress');
    const $orderReq = document.querySelector("#dlv_selectbox");

    const $findAddress = document.querySelector('#find-address');
    $findAddress.addEventListener('click', ExecDaumPostcode);
    
    const phoneNumber =
            $orderPhone1.value + $orderPhone2.value + $orderPhone3.value;
    
    const editButton = document.querySelector('#orderEditLink');

    editButton.addEventListener('click', async function(event) {
        event.preventDefault();
        const response = await fetch(`${BASE_URI}/api/orders?orderNum=${orderNum}`, {
            method: 'PUT',
            body: JSON.stringify({
                orderName: $orderName.value,
                orderZipCode: $orderZipCode.value,
                orderAddress: $orderAddress.value,
                orderDetailAddress: $orderDetailAddress.value,
                orderPhoneNum: phoneNumber,
                orderReq: $orderReq.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            alert('주문정보 수정에 실패했습니다.');
            throw new Error('주문정보 수정에 실패했습니다.');
        } else {
            response.json();
        }
    });  
};
