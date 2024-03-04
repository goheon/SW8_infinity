const { Schema } = require('mongoose');

const prodSubCategorySchema = new Schema({
  prodSubCategory: {
    type: String,
    required: true
  }
});

module.exports = prodSubCategorySchema;
