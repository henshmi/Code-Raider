// const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const CodebaseController = require('../controllers/codebases');
const adminGuard = require('../helpers/adminGuard');

  router.route('')
  .get(CodebaseController.getCodebases);

  router.route('/tags')
  .get(CodebaseController.getGroupedTags);

  router.route('/new')
  .post(validateBody(schemas.codebaseSchema),passport.authenticate('jwt',{session: false}), CodebaseController.postCodebase);

  router.route('/:_id')
  .get(passport.authenticate('jwt',{session: false}), CodebaseController.getCodebase);
  
  router.route('/:_id')
  .post(passport.authenticate('jwt',{session: false}),adminGuard.requiresAdmin(), CodebaseController.postCodebase);

  router.route('/:_id')
  .delete(passport.authenticate('jwt',{session: false}),adminGuard.requiresAdmin(), CodebaseController.deleteCodebase);

module.exports = router;