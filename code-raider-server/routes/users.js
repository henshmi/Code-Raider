const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local',{session : false});
const adminGuard = require('../helpers/adminGuard');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/')
  .get(passport.authenticate('jwt',{session: false}), adminGuard.requiresAdmin(), UsersController.getUsers);

router.route('/:user_id')
  .delete(passport.authenticate('jwt',{session: false}), adminGuard.requiresAdmin(), UsersController.deleteUser);


module.exports = router;