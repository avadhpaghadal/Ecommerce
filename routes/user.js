const express = require('express');
const routes = express.Router();

const userController = require('../controllers/userController');
const product = require('../models/product');
const passport = require('passport');
const cart = require('../models/cart');
// const stripe = require('stripe')("sk_test_wFSjCKx4AW07JCc87b2fUwhH00zzjnRSJv");


routes.get('/',userController.home);
routes.get('/productList/:catId/:subId/:extraId',userController.productList);
routes.post('/ajexPriceFilter',userController.ajexPriceFilter);
routes.post('/ajexBrandFilter', userController.ajexBrandFilter);
routes.post('/ajexcolorFilter', userController.ajexcolorFilter);

routes.get('/product_detais/:id',userController.product_detais);

routes.get('/userLogin',userController.userLogin);
routes.post('/userRegister',userController.userRegister);
routes.post('/checkuserLogin',passport.authenticate('user',{failureRedirect:'/userLogin'}),userController.checkuserLogin);

routes.post('/insertCart',passport.checkUserAuthentication,userController.insertCart);
routes.get('/viewcart',passport.checkUserAuthentication,userController.viewcart);

routes.post('/changeQuantity', passport.checkUserAuthentication , userController.changeQuantity);
routes.get('/deleteCart/:id', passport.checkUserAuthentication, userController.deleteCart);

routes.get('/checkout', passport.checkUserAuthentication , userController.checkout);
routes.post('/payment',passport.checkUserAuthentication,userController.payment);

// Login With Google
routes.get('/google',passport.authenticate('google',{scope : ['profile','email']}));
routes.get('/google/callback',passport.authenticate('google',{failureRedirect :'/userLogin'}),userController.checkuserLogin);

module.exports = routes;