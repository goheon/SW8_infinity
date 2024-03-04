let db;
export const openDatabase = async () => {
  if (db) {
    return db;
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('cartDB', 1);

    request.onerror = function (event) {
      console.log('Database error: ' + event.target.errorCode);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      console.log('Database opened successfully');
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = function (event) {
      console.log('Database upgrade needed');
      db = event.target.result;
      const objectStore = db.createObjectStore('cart', {
        keyPath: 'id',
        autoIncrement: true
      });
      objectStore.createIndex('itemName', 'itemName', { unique: false });
    };
  });
};

// 장바구니에 아이템 추가
export const addItemToCart = async (item) => {
  await openDatabase();

  const existingItem = await checkCartItem(item);

  if (existingItem) {
    // 이미 장바구니에 있는 상품인 경우
    existingItem.count += 1; // 수량 증가
    return await updateCartItem(existingItem);
  } else {
    // 장바구니에 없는 상품인 경우
    const transaction = db.transaction(['cart'], 'readwrite');
    const objectStore = transaction.objectStore('cart');
    const request = await objectStore.add(item);
    return new Promise((resolve, reject) => {
      request.onsuccess = function (event) {
        console.log('Item added to the cart');
        resolve({ id: event.target.result, check: false });
      };
      request.onerror = function (event) {
        console.log('Error adding item to the cart');
        reject(event.target.error);
      };
    });
  }
};

// 장바구니에 이미 있는 상품인지 확인하는 함수
const checkCartItem = async (item) => {
  await openDatabase();
  const transaction = db.transaction(['cart'], 'readonly');
  const objectStore = transaction.objectStore('cart');
  const request = objectStore.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      const cartItems = event.target.result;
      const existingItem = cartItems.find(
        (prod) =>
          prod.name === item.name &&
          prod.size === item.size &&
          prod.color === item.color
      );
      resolve(existingItem);
    };
    request.onerror = function (event) {
      console.log('Error fetching cart items');
      reject(event.target.error);
    };
  });
};

// 장바구니에 있는 상품의 수량을 업데이트하는 함수
const updateCartItem = async (item) => {
  await openDatabase();
  const transaction = db.transaction(['cart'], 'readwrite');
  const objectStore = transaction.objectStore('cart');
  const request = objectStore.put(item);

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      console.log('Item count updated in the cart');
      resolve({ id: event.target.result, check: true });
    };
    request.onerror = function (event) {
      console.log('Error updating item count in the cart');
      reject(event.target.error);
    };
  });
};

// 장바구니 항목 읽기
export const getCartItems = async (callback) => {
  await openDatabase();
  let transaction = db.transaction(['cart'], 'readonly');
  let objectStore = transaction.objectStore('cart');
  let request = await objectStore.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      callback(event.target.result);
      resolve(event.target.result);
    };
    request.onerror = function (event) {
      console.log('Error reading items from the cart');
      reject(event.target.error);
    };
  });
};

// 특정 key 값에 대한 항목 가져오기
export const getCartItemByKey = async (key) => {
  await openDatabase(); // 데이터베이스 열기
  console.log(key);
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(['cart'], 'readonly');
    let objectStore = transaction.objectStore('cart');

    let request = objectStore.get(key);

    request.onsuccess = function (event) {
      console.log('Success item from the cart');
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      console.log('Error reading item from the cart');
      reject(event.target.error);
    };
  });
};

// 장바구니에서 특정 항목 삭제
export const removeItemFromCart = async (id) => {
  await openDatabase();
  let transaction = db.transaction(['cart'], 'readwrite');
  let objectStore = transaction.objectStore('cart');
  let request = await objectStore.delete(id);
  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      console.log('Item removed from the cart');
      resolve(event.target.result);
    };
    request.onerror = function (event) {
      console.log('Error removing item from the cart');
      reject(event.target.error);
    };
  });
};

// 장바구니 빼기 업데이트(레거시 코드)
export const updateCart = async (id, count) => {
  await openDatabase();
  const transaction = db.transaction(['cart'], 'readwrite');
  const objectStore = transaction.objectStore('cart');
  const request = objectStore.get(id);

  request.onerror = function (event) {
    console.error('Error in getting product:', event.target.error);
  };
  let temp;
  const product = await new Promise((resolve, reject) => {
    request.onerror = function (event) {
      console.error('Error in getting product:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      temp = event.target.result;
      resolve(event.target.result);
    };
  });

  const updateRequest = await objectStore.put({
    ...temp,
    count
  });

  return new Promise((resolve, reject) => {
    updateRequest.onerror = function (event) {
      console.error('Error in updating product:', event.target.error);
      reject(event.target.error);
    };

    updateRequest.onsuccess = function (event) {
      console.log('Product updated successfully:', product);
      resolve(event.target.result);
    };
  });
};

// 장바구니 갯수
export const getProductKeys = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(['cart'], 'readonly');
  const objectStore = transaction.objectStore('cart');
  const countRequest = await objectStore.count();
  return new Promise((resolve, reject) => {
    countRequest.onsuccess = () => {
      resolve(countRequest);
    };
    countRequest.onerror = () => reject('개수 가져오기 실패');
    transaction.onerror = () => reject('트랜잭션 실패');
  });
};

// 마지막으로 사용한 키 값 가져오기
export const getNextKey = async () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['cart'], 'readwrite');
    const objectStore = transaction.objectStore('cart');

    const cursorRequest = objectStore.openCursor(null, 'prev');

    cursorRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const lastKey = cursor.key;
        resolve(lastKey + 1);
      } else {
        resolve(1);
      }
    };

    cursorRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const productCartHtml = (item) => {
  const ul = document.querySelector('.result');
  // 변경된 부분: data-id 속성 추가
  ul.dataset.id = item.id;
  ul.innerHTML += `
  <ul id="cart-items">
    <li>
      <div>
          <p class="titleName">${item.title}</p>
          <span class="colorSize">- ${item.color} / ${item.size}</span>
      </div>
    </li>
    <li>
      <div class="result-wrap">
          <p id="quantity">1</p><a id="increase">+</a><a id="decrease">-</a>
      </div>
    </li>
    <li>
      <div class="result-number">36,000</div>
    </li>
    <li>
      <div>
          <!-- 변경된 부분: data-id 속성 추가 -->
          <a class="delete-item" data-id="${item.id}">X</a>
      </div>
    </li>
  </ul>`;
};

export const totalCountCalc = async () => {
  const $totalCartCount = document.querySelector('.totalCartCount');
  const totalCartCount = await getProductKeys();
  $totalCartCount.innerHTML = `Cart - ${totalCartCount.result}`;
};
