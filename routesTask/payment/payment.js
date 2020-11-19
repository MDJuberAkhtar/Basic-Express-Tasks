const { Router } = require('express');
const express = require('express');
const router = express.Router();
const controlPayment = require('./controllpayment');

router.route('/v1').get(controlPayment.getPayment).post(controlPayment.postPayment)

module.exports = router;