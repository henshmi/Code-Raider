// const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const OrderController = require('../controllers/orders');

var requiresAdmin = function() {
  return [
    function(req, res, next) {
      if (req.user && req.user.isAdmin === true)
        next();
      else
        res.send(401, 'Unauthorized');
    }
  ]
};


router.route('/confirm/:order_id')
  .post(passport.authenticate('jwt',{session: false}), OrderController.confirmOrder);

router.route('/:order_id')
  .delete(passport.authenticate('jwt',{session: false}), OrderController.deleteOrder);

router.route('/new')
  .post(validateBody(schemas.orderSchema),passport.authenticate('jwt',{session: false}), OrderController.postOrder);

router.route('/')
  .get(passport.authenticate('jwt',{session: false}), OrderController.getOrders);

module.exports = router;