const mongoose = require('mongoose');
const UserSchema = require('./schemas/user');
const ProductSchema = require('./schemas/product');
const prodCategorySchema = require('./schemas/prodCategory');
const orderSchema = require('./schemas/orders');

exports.User = mongoose.model('User', UserSchema);
exports.Product = mongoose.model('Product', ProductSchema);
exports.ProdCategory = mongoose.model('ProdCategory', prodCategorySchema);
exports.Orders = mongoose.model('orders', orderSchema);
