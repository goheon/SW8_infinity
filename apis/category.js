const { Router } = require('express');

const { ProdCategory } = require('../models');
const asyncHandler = require('../utils/async-handler');
const { NotFoundError } = require('../middlewares/error-handler');

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const categories = await ProdCategory.find({});
    if (!categories) {
      throw new NotFoundError('카테고리');
    }
    res.json(categories);
  })
);

module.exports = router;
