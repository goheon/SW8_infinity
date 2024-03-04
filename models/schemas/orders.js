const { Schema } = require('mongoose');

const orderSchema = new Schema({
  /*
    -> orderNum => mongoDB.objectId로 대체됨.
    orderNum: {
        type: Number,
        required: true,
    }
    */
  //주문자 id
  orderId: {
    type: String,
    required: true
  },
  //주문일자
  orderDate: {
    type: Date,
    required: true,
    default: Date.now() + 9 * 60 * 60 * 1000
  },
  orderProds: {
    type: [
      {
        prodNum: {
          type: Schema.Types.ObjectId,
          required: true
        },
        orderProdCount: {
          type: Number,
          required: true
        }
      }
    ]
    // type: [orderProd],
  },
  //배송주소
  orderAddress: {
    type: String,
    required: true
  },
  //배송 상세주소
  orderDetailAddress: {
    type: String,
    required: true
  },
  //배송 우편번호
  orderZipCode: {
    type: String,
    required: true
  },
  //주문자명
  orderName: {
    type: String,
    required: true
  },
  //주문자 연락처
  orderPhoneNum: {
    type: String,
    required: true
  },
  //배송요청사항
  orderReq: {
    type: String
  },
  //주문 처리상태 - 값이 있으면 주문 처리 시작
  orderState: {
    type: String,
    default: '처리전'
  },
  //주문 수정일 - 값이 있으면 주문 수정 반영
  orderUpdateDate: {
    type: Date
  },
  //주문 삭제일 - 값이 있으면 주문 취소 반영
  orderDeleteDate: {
    type: Date
  }
});

module.exports = orderSchema;
