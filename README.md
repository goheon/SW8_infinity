# Infinity

![Infinity Image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdMalsj%2FbtsEZpgd1dd%2FgjJreNfvifmM9NFBSTNST0%2Fimg.png)
_We Are Infinity_

---

### 프로젝트

저희는 의류 상품을 판매하는 쇼핑몰입니다.
무한한 잠재력을 지니고 있기에 Infinity 로 이름을 지었습니다.

---

### 프로젝트 기간

_2023.02.19 ~ 2023.03.01_

---

## 프로젝트 설명

| 의류 쇼핑몰 개발 프로젝트 이며, 고객과 관리자 role 이 존재합니다.  
| 관리자는 고객의 주문 상태를 수정할 수 있으며, 고객은 상품을 주문,결제하여 상품을 받을 수 있습니다.  
| 로그인을 하지 않은 사용자도 상품들을 볼 수 있으며, 장바구니에 담을 수 있습니다.(비회원 구매는는 고려중)

### 설계

##### 쇼핑몰 이름 : `인피니티` (`infinity`)

- **목적**: 의류 상품을 빠르고 쉽게, 구매 및 판매할 수 있는 20, 30대를 위한 쇼핑몰을 구현합니다.
- **목표**
  - 홈 화면에서 의류 상품 종류를 확인할 수 있습니다.
  - 회원 가입을 하지 않아도 상품을 구경하고 장바구니에 넣을 수 있습니다.
  - 최소한의 클릭으로 상품을 구매하거나 판매할 수 있습니다.
  - 접근성과 사용자의 경험을 중시하며 보다 간편하게 이용할 수 있는 쇼핑몰 구현.

##### 페르소나

남성

<!-- 남성페르소나 이미지 -->
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbD2c0y%2FbtsE9LQnqLY%2FmDZhxo6QEqbNDy2oApKFP0%2Fimg.png" alt="여성페르소나" width="200px" height="200px">

여성

<!-- 여성페르소나 이미지 -->
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc5IVaR%2FbtsE9GVSCyr%2FA1o27EIevvjwDlk5wjwf51%2Fimg.png" alt="여성페르소나" width="300px" height="200px">

### 백엔드

`Express` 서버를 이용하여 `RESTful API`를 구축하여 독립적인 서버를 만들었습니다.

DB 명세서를 작성하여 데이터 구조를 계획하고 정의하였습니다.

<!-- 백엔드 DB 모델링 이미지 -->
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FqoNhx%2FbtsFb5UrsWB%2F3tXx26uzikNKaNiVgn5FMK%2Fimg.png" alt="DB 모델링" width="300px" height="200px">

---

### 프론트엔드

설계 부분에서는 Figma로 UI를 먼저 작성하였습니다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FqoNhx%2FbtsFb5UrsWB%2F3tXx26uzikNKaNiVgn5FMK%2Fimg.png" alt="피그마 디자인" width="300px" height="200px">

클라이언트 서버를 띄우려고 하였지만 `CORS`, 네트워크 비용증가... 등의 이유로 `express` 안에서 동작하게 하였습니다.

`Express` 에서는 `exprses.static` 으로 정적인 파일을 제공하는 기능을 지원합니다.

하지만 쇼핑몰 같은 경우는 `SPA` 인 경우가 대부분이지만  
`express` 에서는 path를 적어 라우팅을 하고 `<a href>` 를 이용하여 이동하면 페이지 이동하면
현재 적용하고 있는 resource들을 다시 불러와서 적용시킵니다.

이러한 resource 방지를 위해 `history` 전역객체를 이용하여 페이지 이동을 막을 수 있습니다.

---

## 프로젝트 기술 스택

### Front-End

- Bulma (CSS 프레임워크)
- VanillaJS

### BackEnd

- Express
- Mongoose (ODM)
- MongoDB (DB)
- passport
- jwt

---

## 실행방법

`npm install` 의존성 설치 후

.env 를 만들어서 Mongodb 정보, PORT 를 입력 후

`npm start`

pm2 로 서버 시작할 경우

```shell
npm install -g pm2

npm run deploy
```
