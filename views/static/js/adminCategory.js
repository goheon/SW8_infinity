import { BASE_URI } from '../js/constant/url.js';

export const adminCategory = () => {

  document.querySelector('.con-add').addEventListener('click', () => {
    document.querySelector('.admin-ct-control-btn').innerHTML += `
            <input class="input MajorInput" type="text" placeholder="대분류" />
            <input class="input SubInput" type="text" placeholder="소분류" />
            <input class="input submitAddCategory" type="submit" value="추가"/>
            `;
  });

  
};