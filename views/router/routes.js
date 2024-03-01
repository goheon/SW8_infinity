import { categoryProducts } from '../static/js/categoryProducts.js';
import { errorFnc } from '../static/js/errorFnc.js';
import { home } from '../static/js/home.js';
import { login } from '../static/js/login.js';
import { mypage } from '../static/js/mypage.js';
import { mypageEdit } from '../static/js/mypageEdit.js';
import { order } from '../static/js/order.js';
import { orderCompleted } from '../static/js/orderCompleted.js';
import { payment } from '../static/js/payment.js';
import { product } from '../static/js/product.js';
import { shoppingcartPro } from '../static/js/shoppingcartPro.js';
import { signup } from '../static/js/signup.js';
import { admin } from '../static/js/admin.js';
import { adminManagement } from '../static/js/adminManagement.js';
import { adminSetting } from '../static/js/adminSetting.js';
import { adminCategory } from '../static/js/adminCategory.js';
import { orderEdit } from '../static/js/orderEdit.js';

import CategoryProducts from '../static/pages/CategoryProducts.js';
import ErrorPage from '../static/pages/ErrorPage.js';
import Home from '../static/pages/Home.js';
import Login from '../static/pages/Login.js';
import Mypage from '../static/pages/Mypage.js';
import MypageEdit from '../static/pages/MypageEdit.js';
import Order from '../static/pages/Order.js';
import OrderEdit from '../static/pages/OrderEdit.js';
import OrderCompleted from '../static/pages/OrderCompleted.js';
import Payment from '../static/pages/Payment.js';
import Product from '../static/pages/Product.js';
import ShoppingcartPro from '../static/pages/ShoppingcartPro.js';
import Signup from '../static/pages/Signup.js';
import Admin from '../static/pages/Admin.js';
import AdminManagement from '../static/pages/AdminManagement.js';
import AdminSetting from '../static/pages/AdminSetting.js';
import AdminCategory from '../static/pages/AdminCategory.js';
import AdminProductList from '../static/pages/AdminProductList.js';

export const routes = [
  { Path: '/', View: Home, Script: home },
  { Path: '/login', View: Login, Script: login },
  { Path: '/signup', View: Signup, Script: signup },
  { Path: '/product/:prodId', View: Product, Script: product },
  { Path: '/order', View: Order, Script: order },
  { Path: '/shoppingCart', View: ShoppingcartPro, Script: shoppingcartPro },
  {
    Path: '/categorys/:categoryProducts',
    View: CategoryProducts,
    Script: categoryProducts
  },
  { Path: '/orderCompleted', View: OrderCompleted, Script: orderCompleted },
  { Path: '/error', View: ErrorPage, Script: errorFnc },
  { Path: '/mypage', View: Mypage, Script: mypage },
  { Path: '/payment', View: Payment, Script: payment },
  { Path: '/mypageEdit', View: MypageEdit, Script: mypageEdit },
  { Path: '/orderEdit', View: OrderEdit, Script: orderEdit },
  { Path: '/admin', View: Admin, Script: admin },
  {
    Path: '/admin/adminManagement',
    View: AdminManagement,
    Script: adminManagement
  },
  { Path: '/admin/adminSetting', View: AdminSetting, Script: adminSetting },
  { Path: '/admin/adminCategory', View: AdminCategory, Script: adminCategory },
  {
    Path: '/admin/adminProductList',
    View: AdminProductList,
    Script: adminProductList
  }
];
