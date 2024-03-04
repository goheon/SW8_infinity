const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const { Product } = require('../models/index');
const asyncHandler = require('../utils/async-handler');
const { NotFoundError } = require('../middlewares/error-handler');

const router = express.Router();

// 상품 단일 조회 API
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { prodNum } = req.query;
    const prodObjectId = new ObjectId(prodNum);
    const product = await Product.findOne({ _id: prodObjectId });
    if (!product) {
      throw new NotFoundError('상품');
    }
    res.json(product);
  })
);

//상품 목록 조회 API, 무한 스크롤 폼 count default = 1, 요청시마다 ++
router.get(
  '/list',
  asyncHandler(async (req, res) => {
    const count = req.query.count || 1;
    const product = await Product.find({})
      .sort({ _id: -1 })
      .skip(12 * (count - 1))
      .limit(12);
    if (!product) {
      throw new NotFoundError('상품');
    }
    res.json(product);
  })
);

module.exports = router;
