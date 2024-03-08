import { BASE_URI } from '../js/constant/url.js';

export const adminCategory = () => {
  // 버튼 클릭 이벤트를 부모 요소에 위임하여 처리
  document
    .querySelector('.admin-ct-control-btn')
    .addEventListener('click', (event) => {
      if (event.target.classList.contains('submitAddCategory')) {
        const majorInput = document.querySelector('.MajorInput').value;
        const subInput = document.querySelector('.SubInput').value;
        // 입력된 값으로 카테고리 추가하는 로직 구현
        console.log('대분류:', majorInput);
        console.log('소분류:', subInput);
      } else if (event.target.classList.contains('edit-product')) {
        if (event.target.textContent === '추가') {
          console.log('추가 버튼이 클릭되었습니다.');
        } else if (event.target.textContent === '수정') {
          console.log('수정 버튼이 클릭되었습니다.');
        } else if (event.target.textContent === '삭제') {
          console.log('삭제 버튼이 클릭되었습니다.');
        }
      }
    });

  async function fetchDataAndRender() {
    const res = await fetch(`${BASE_URI}/api/category`, {
      method: 'GET'
    });
    const categoriesData = await res.json();

    // 버튼을 생성하고 클릭 이벤트 리스너를 추가하는 함수
    function createButton(text, id, clickHandler) {
      const button = document.createElement('div');
      button.classList.add('button', 'is-link', 'edit-product');
      button.textContent = text;
      button.id = id;
      button.addEventListener('click', clickHandler);
      return button;
    }

    // 카테고리 데이터를 순회하면서 UI 생성
    const categoriesUI = categoriesData.map((majorCategory) => {
      // 대분류 카테고리 UI 생성
      const majorCategoryUI = document.createElement('form');
      majorCategoryUI.setAttribute('action', '');
      majorCategoryUI.classList.add('form-box');
      majorCategoryUI.innerHTML = `
        <div class="ct-box" id="ct-${majorCategory.prodMajorCategory}">
          <span class="ct-product">${majorCategory.prodMajorCategory}</span>
          <div class="ct-button-box">
          </div>
        </div>
      `;

      // 클릭 이벤트 리스너를 가지고 있는 버튼들 생성
      const addButton = createButton(
        '추가',
        `add-${majorCategory.prodMajorCategory}`,
        () =>
          alert(
            `추가 버튼이 클릭되었습니다. ID: add-${majorCategory.prodMajorCategory}`
          )
      );
      const editButton = createButton(
        '수정',
        `edit-${majorCategory.prodMajorCategory}`,
        () =>
          alert(
            `수정 버튼이 클릭되었습니다. ID: edit-${majorCategory.prodMajorCategory}`
          )
      );
      const deleteButton = createButton(
        '삭제',
        `delete-${majorCategory.prodMajorCategory}`,
        () =>
          alert(
            `삭제 버튼이 클릭되었습니다. ID: delete-${majorCategory.prodMajorCategory}`
          )
      );

      const buttonTemplate = document.createElement('div');
      buttonTemplate.classList.add('new-admin-box');
      buttonTemplate.appendChild(addButton);
      buttonTemplate.appendChild(editButton);
      buttonTemplate.appendChild(deleteButton);

      // 버튼 요소 추가
      majorCategoryUI
        .querySelector('.ct-button-box')
        .appendChild(buttonTemplate);
      //////////////////
      // 소분류 버튼을 생성하고 클릭 이벤트 핸들러를 추가하는 함수
      function createSubButton(text, id, clickHandler) {
        const button = document.createElement('div');
        button.classList.add('button', 'is-link', 'edit-product');
        button.textContent = text;
        button.id = id;
        button.addEventListener('click', clickHandler); // 클릭 이벤트 핸들러 추가
        return button;
      }

      // 소분류 카테고리 UI 생성
      const subCategoriesUI = majorCategory.prodSubCategories.map(
        (subCategory) => {
          const subCategoryUI = document.createElement('div');
          subCategoryUI.classList.add('acform-box');
          subCategoryUI.innerHTML = `
    <div class="ac-box" id="ad-${subCategory._id}">
      <span class="ac-product">${subCategory.prodSubCategory}</span>
      <div class="ac-button-box">
      </div>
    </div>
  `;

          // 클릭 이벤트 리스너를 가지고 있는 버튼들 생성
          const addButton = createSubButton(
            '추가',
            `add-${subCategory._id}`,
            () =>
              alert(`추가 버튼이 클릭되었습니다. ID: add-${subCategory._id}`)
          );
          const editButton = createSubButton(
            '수정',
            `edit-${subCategory._id}`,
            () =>
              alert(`수정 버튼이 클릭되었습니다. ID: edit-${subCategory._id}`)
          );
          const deleteButton = createSubButton(
            '삭제',
            `delete-${subCategory._id}`,
            () =>
              alert(`삭제 버튼이 클릭되었습니다. ID: delete-${subCategory._id}`)
          );

          const buttonTemplate = document.createElement('div');
          buttonTemplate.classList.add('new-admin-box');
          buttonTemplate.appendChild(addButton);
          buttonTemplate.appendChild(editButton);
          buttonTemplate.appendChild(deleteButton);

          // 버튼 요소 추가
          subCategoryUI
            .querySelector('.ac-button-box')
            .appendChild(buttonTemplate);

          return subCategoryUI;
        }
      );

      const majorCategorySubCategoriesUI = document.createElement('div');
      majorCategorySubCategoriesUI.classList.add('form-box');
      majorCategorySubCategoriesUI.setAttribute('action', '');
      majorCategorySubCategoriesUI.innerHTML = subCategoriesUI
        .map((ui) => ui.outerHTML)
        .join('');

      majorCategoryUI.appendChild(majorCategorySubCategoriesUI);

      return majorCategoryUI;
    });

    // 카테고리 UI를 DOM에 추가
    const categoriesContainer = document.querySelector('.admin-ct-all-content');
    categoriesContainer.innerHTML = ''; // 기존 내용 비우기
    categoriesUI.forEach((categoryUI) => {
      categoriesContainer.appendChild(categoryUI);
    });
  }

  // fetchDataAndRender 함수 호출
  fetchDataAndRender();
};
