const { Schema } = require('mongoose');
const prodSubSchema = require('./prodSubCategory');

const prodCategorySchema = new Schema({
  prodMajorCategory: {
    type: Number,
    required: true
  },
  prodSubCategories: {
    type: [prodSubSchema],
    required: true
  }
});

module.exports = prodCategorySchema;
