const { Product } = require('../models/index');

module.exports = async (orderProds) => {
  //조건체크
  let errorMessages = '';
  for (product of orderProds) {
    const target = await Product.findOne({ _id: product.prodNum });
    if (target.prodUseYn) {
      throw new Error(`판매종료된 상품입니다.`);
    }
    if (target.prodRemains - product.orderProdCount < 0) {
      errorMessages += `${target.prodName} 상품의 재고 수량이 ${product.orderProdCount - target.prodRemains}개\n`;
    }
  }
  if (errorMessages.length !== 0) {
    throw new Error(`${errorMessages} 부족합니다.`);
  }
  //작업
  for (product of orderProds) {
    const target = await Product.findOne({ _id: product.prodNum });
    //재고 소진으로 인한 판매 종료
    if (target.prodRemains - product.orderProdCount === 0) {
      //재고 0개 변경, 판매 종료
      await Product.updateOne(
        { _id: product.prodNum },
        {
          prodRemains: target.prodRemains - product.orderProdCount,
          prodCount: target.prodCount + product.orderProdCount,
          prodUseYn: Date.now() + 9 * 60 * 60 * 1000
        }
      );
      continue;
    }
    await Product.updateOne(
      { _id: product.prodNum },
      {
        prodRemains: target.prodRemains - product.orderProdCount,
        prodCount: target.prodCount + product.orderProdCount
      }
    );
  }
};
