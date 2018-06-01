// const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const OrderController = require('../controllers/orders');
const adminGuard = require('../helpers/adminGuard');

router.route('/')
  .get(passport.authenticate('jwt',{session: false}), adminGuard.requiresAdmin(), OrderController.getAllOrders);

router.route('/myorders')
  .get(passport.authenticate('jwt',{session: false}), OrderController.getMyOrders);

router.route('/confirm/:order_id')
  .post(passport.authenticate('jwt',{session: false}), OrderController.confirmOrder);

router.route('/:order_id')
  .delete(passport.authenticate('jwt',{session: false}), OrderController.deleteOrder);

router.route('/new')
  .post(validateBody(schemas.orderSchema),passport.authenticate('jwt',{session: false}), OrderController.postOrder);

router.route('/myorders')
  .get(passport.authenticate('jwt',{session: false}), OrderController.getMyOrders);

module.exports = router;