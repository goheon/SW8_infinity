const express = require('express');
const router = express.Router();

const usersRouter = require('../apis/users');
const adminRouter = require('../apis/admin');
const authRouter = require('../apis/auth');
const productRouter = require('../apis/product');
const orderRouter = require('../apis/orders');
const paymentsRouter = require('../apis/payments');
const categoryRouter = require('../apis/category');
const getUserFromJWT = require('../middlewares/get-user-from-jwt');
const imageRouter = require('../apis/image');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/product', productRouter);
router.use('/payments', paymentsRouter);
router.use('/orders', getUserFromJWT, orderRouter);
router.use('/category', categoryRouter);
router.use('/image', imageRouter);


module.exports = router;
