const { Schema } = require('mongoose');
const prodSubCategory = require('./prodSubCategory');

const productSchema = new Schema({
  prodName: {
    type: String,
    required: true
  },
  prodSubCategory: {
    type: prodSubCategory,
    required: true
  },
  prodCost: {
    type: Number,
    required: true
  },
  prodContent: {
    type: String
  },
  prodImgs: {
    type: [String]
  },
  prodUseYn: {
    type: Date
  },
  prodRegDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 9 * 60 * 60 * 1000
  },
  prodRemains: {
    type: Number,
    required: true
  },
  prodSize: {
    type: String,
    required: true
  },
  prodColor: {
    type: String,
    required: true
  },
  prodCount: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = productSchema;
