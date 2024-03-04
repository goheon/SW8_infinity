const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const { Product, Orders, ProdCategory } = require('../models/index');

const asyncHandler = require('../utils/async-handler');
const getUserFromJWT = require('../middlewares/get-user-from-jwt');
const isAdmin = require('../middlewares/isAdmin');
const { NotFoundError } = require('../middlewares/error-handler');

const router = express.Router();

/* ----------------------상품 API----------------------------- */
//상품 추가 API
router.post(
  '/products',
  getUserFromJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const {
      prodName,
      prodSubCategory,
      prodCost,
      prodContent,
      prodImgs,
      prodUseYn,
      prodRemains,
      prodSize,
      prodColor,
      prodCount
    } = req.body;
    await Product.create({
      prodName,
      prodSubCategory,
      prodCost,
      prodContent,
      prodImgs,
      prodUseYn,
      prodRemains,
      prodSize,
      prodColor,
      prodCount
    });
    const product = await Product.find().sort({ _id: -1 }).limit(1);
    res.send(product);
  })
);

//상품 수정
router.put(
  '/products',
  getUserFromJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { prodNum } = req.query;
    const prodObjectId = new ObjectId(prodNum);
    const {
      prodName,
      prodSubCategory,
      prodCost,
      prodContent,
      prodImgs,
      prodUseYn,
      prodRemains,
      prodSize,
      prodColor,
      prodCount
    } = req.body;

    await Product.findOneAndUpdate(
      { _id: prodObjectId },
      {
        prodName,
        prodSubCategory,
        prodCost,
        prodContent,
        prodImgs,
        prodUseYn,
        prodRemains,
        prodSize,
        prodColor,
        prodCount
      }
    );

    const product = await Product.find({ _id: prodObjectId });
    res.json({ product });
  })
);

//상품 삭제 -> 상품 삭제일 등록
router.delete(
  '/products',
  getUserFromJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { prodNum } = req.query;
    const prodObjectId = new ObjectId(prodNum);
    const productFounded = await Product.findOne({ _id: prodObjectId });

    if (productFounded === null || productFounded.prodUseYn) {
      throw new NotFoundError('상품');
    }

    await Product.findOneAndUpdate(
      { _id: prodObjectId },
      { prodUseYn: Date.now() + 9 * 60 * 60 * 1000 }
    );

    const deletedProduct = await Product.findOne({ _id: prodObjectId });
    const deletedTime = deletedProduct.prodUseYn;
    res.json({ deletedTime });
  })
);
/* ----------------------주문 API----------------------------- */

/**
 * 작성자 : 이정은
 * 작성 시작일: 2024.02.23
 * 생성된 모든 주문 정보를 조회해오는 API입니다.
 */
router.get(
  '/orders',
  getUserFromJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const orders = await Orders.find({});
    if (orders.length === 0) {
      throw new NotFoundError('주문');
    }
    res.json(orders);
  })
);

/**
 * 작성자 : 이정은
 * 작성 시작일: 2024.02.23
 * 추가된 상품의 주문 상태를 변경합니다.
 * flag :: (처리전: 상품준비/배송준비 등이 아직 완료가 안된 상태 & 처리중: 상품준비 || 배송 준비중 상태)
 */
router.put(
  '/orders',
  getUserFromJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { orderNum } = req.query;
    const { orderState } = req.body;

    const order = await Orders.findOne({ _id: orderNum });
    if (order) {
      if (!order.orderDeleteDate) {
        await Orders.updateOne({ _id: orderNum }, { orderState: orderState });
        const updatedOrder = await Orders.findOne({ _id: orderNum });
        res.json(updatedOrder);
      } else {
        throw new Error(
          '사용자가 주문을 취소했습니다. 주문상태를 수정할 수 없습니다.'
        );
      }
    } else {
      // 주문을 찾을 수 없는 경우 에러 처리
      throw new NotFoundError('주문');
    }
  })
);

/**
 * 작성자 : 이정은
 * 작성 시작일: 2024.02.23
 * 생성된 주문 정보를 관리자가 삭제합니다.
 * flag :: orderDeleteDate에는 관리자가 주문을 삭제하는 현재 시점의 시간값이 들어갑니다.
 */
router.delete(
  '/orders',
  getUserFromJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { orderNum } = req.query;
    const order = await Orders.findOne({ _id: orderNum });

    if (order) {
      if (!order.orderDeleteDate) {
        await Orders.updateOne(
          { _id: orderNum },
          { orderDeleteDate: Date.now() + 9 * 60 * 60 * 1000 }
        );
        const deletedOrder = await Orders.findOne({ _id: orderNum });
        res.json({ deletedOrder });
      } else {
        throw new Error('이미 사용자가 취소한 주문입니다.');
      }
    } else {
      throw new NotFoundError('주문');
    }
  })
);

/* ----------------------카테고리 API----------------------------- */
// 카테고리 추가 API
router.post(
  '/category',
  getUserFromJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { prodMajorCategory, prodSubCategory } = req.body;
    let prodCategory = await ProdCategory.find({ prodMajorCategory });

    let errorMessages = '';
    if (!prodSubCategory) {
      errorMessages += '소분류 ';
    }
    if (!prodMajorCategory) {
      errorMessages += '대분류 ';
    }
    if (errorMessages !== '') {
      errorMessages += '를 입력해주세요.';
      throw new Error(errorMessages);
    }

    // 대분류가 없는 경우 카테고리 추가
    if (prodCategory.length === 0) {
      prodCategory = await ProdCategory.create({
        prodMajorCategory,
        prodSubCategories: [{ prodSubCategory }]
      });
      res.json({ prodCategory });
    } else {
      //대분류가 있는 경우 서브카테고리 추가
      let tempProdSubCategory = {
        prodSubCategory: `${prodSubCategory}`
      };

      prodCategory = await ProdCategory.updateOne(
        { prodMajorCategory },
        { $push: { prodSubCategories: tempProdSubCategory } }
      );
      prodCategory = await ProdCategory.find({ prodMajorCategory });
      res.json({ prodCategory });
    }
  })
);

// 카테고리 수정 API
router.put(
  '/category/:prodMajorCategory/prodSubCategories/:prodSubCategory?',
  getUserFromJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const prodMajorCategory = Number(req.params.prodMajorCategory);
    const { prodSubCategory } = req.params;
    const { updateProdMajorCategory, updateProdSubCategory } = req.body;

    //입력 정보로 대분류 조회(서브카테고리 포함 모두)
    let prodCategory = await ProdCategory.find({ prodMajorCategory });
    //대분류 카테고리가 없는 경우
    if (prodCategory.length === 0) {
      throw new NotFoundError('카테고리 대분류');
    }

    //update 정보가 Major, Sub 둘 다 없는 경우
    if (!updateProdMajorCategory && !updateProdSubCategory) {
      throw new Error('수정할 내용을 입력해주세요.');

      //소분류 업데이트 정보가 있으나 업데이트할 소분류를 지정하지 않은 경우
    } else if (prodMajorCategory && !prodSubCategory && updateProdSubCategory) {
      throw new Error('업데이트할 소분류를 입력해주세요.');

      //소분류만 변경
    } else if (
      prodSubCategory &&
      !updateProdMajorCategory &&
      updateProdSubCategory
    ) {
      const categoryFounded = await ProdCategory.find({
        prodMajorCategory,
        'prodSubCategories.prodSubCategory': prodSubCategory
      });
      if (categoryFounded.length === 0) {
        throw new NotFoundError('카테고리 소분류');
      }

      await ProdCategory.updateOne(
        {
          prodMajorCategory,
          'prodSubCategories.prodSubCategory': prodSubCategory
        },
        {
          $set: { 'prodSubCategories.$.prodSubCategory': updateProdSubCategory }
        }
      );
      prodCategory = await ProdCategory.find({ prodMajorCategory });

      //대분류만 변경
    } else if (updateProdMajorCategory && !updateProdSubCategory) {
      await ProdCategory.updateOne(
        { prodMajorCategory },
        { prodMajorCategory: updateProdMajorCategory }
      );
      prodCategory = await ProdCategory.find({
        prodMajorCategory: updateProdMajorCategory
      });

      //모두 변경
    } else {
      await ProdCategory.updateOne(
        {
          prodMajorCategory,
          'prodSubCategories.prodSubCategory': prodSubCategory
        },
        {
          prodMajorCategory: updateProdMajorCategory,
          $set: { 'prodSubCategories.$.prodSubCategory': updateProdSubCategory }
        }
      );
      prodCategory = await ProdCategory.find({
        prodMajorCategory: updateProdMajorCategory
      });
    }
    res.json(prodCategory);
  })
);

//카테고리 삭제
router.delete(
  '/category/:prodMajorCategory/prodSubCategories/:prodSubCategory?',
  getUserFromJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const prodMajorCategory = Number(req.params.prodMajorCategory);
    const { prodSubCategory } = req.params;

    console.log(prodMajorCategory, prodSubCategory);

    if (!prodMajorCategory && !prodSubCategory) {
      throw new Error('삭제할 카테고리를 입력해주세요.');
    }

    if (!Number.isInteger(prodMajorCategory)) {
      throw new Error('대분류는 숫자 형태로 입력되어야 합니다.');
    }

    if (!prodSubCategory) {
      //대분류 삭제
      const categoryFounded = await ProdCategory.find({ prodMajorCategory });
      if (categoryFounded.length === 0) {
        throw new NotFoundError('대분류');
      }
      await ProdCategory.deleteOne({ prodMajorCategory });
    } else {
      //소분류 삭제
      const categoryFounded = await ProdCategory.find({
        prodMajorCategory,
        'prodSubCategories.prodSubCategory': prodSubCategory
      });
      if (categoryFounded.length === 0) {
        let errorMessages = '';
        const majorCategoryFounded = await ProdCategory.find({
          prodMajorCategory
        });
        if (majorCategoryFounded.length === 0) {
          errorMessages += '대분류 ';
        }
        errorMessages += '소분류';
        throw new NotFoundError(errorMessages);
      }
      await ProdCategory.updateOne(
        { prodMajorCategory: prodMajorCategory },
        { $pull: { prodSubCategories: { prodSubCategory: prodSubCategory } } }
      );
    }
    const prodCategory = await ProdCategory.find({});
    res.json(prodCategory);
  })
);

module.exports = router;
