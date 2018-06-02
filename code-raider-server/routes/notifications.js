// const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const NotificationController = require('../controllers/notifications');
const adminGuard = require('../helpers/adminGuard');

router.route('/new')
  .post(passport.authenticate('jwt',{session: false}), adminGuard.requiresAdmin(), NotificationController.Notify);

module.exports = router;