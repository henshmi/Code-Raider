// const express = require('express');
const router = require('express-promise-router')();
const AddressController = require('../controllers/addresses');

router.route('/')
  .get(AddressController.getAllAddresses);

module.exports = router;