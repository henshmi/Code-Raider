// const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const CodebaseController = require('../controllers/codebases');

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

  router.route('')
  .get(CodebaseController.getCodebases);

  router.route('/tags')
  .get(CodebaseController.getGroupedTags);

  router.route('/new')
  .post(validateBody(schemas.codebaseSchema),passport.authenticate('jwt',{session: false}), CodebaseController.postCodebase);

  router.route('/:_id')
  .get(passport.authenticate('jwt',{session: false}), CodebaseController.getCodebase);
  
  router.route('/:_id')
  .post(passport.authenticate('jwt',{session: false}),requiresAdmin(), CodebaseController.postCodebase);

  router.route('/:_id')
  .delete(passport.authenticate('jwt',{session: false}),requiresAdmin(), CodebaseController.deleteCodebase);

//   router.route('/sparkComment')
//   .post(validateBody(schemas.sparkSchema),passport.authenticate('jwt',{session: false}), CommentsController.sparkComment);

//   router.route('/sparkComment')
//   .delete( validateBody(schemas.sparkSchema),passport.authenticate('jwt',{session: false}), CommentsController.unsparkComment);

  // router.route('/secret')
  // .get(passport.authenticate('jwt',{session: false}), CodebaseController.secret);

module.exports = router;