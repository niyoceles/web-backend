const express = require('express');
const validate = require('../middlewares/validate');
const paymentValidation = require('../middlewares/validations/payment.validation');
const paymentController = require('../controllers/payment.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(paymentValidation.createPayment), paymentController.createPayment)
  .get(validate(paymentValidation.getPayments), paymentController.getPayments);

router
  .route('/session')
  .post(validate(paymentValidation.createSession), paymentController.createSession)
  .get(validate(paymentValidation.getOrderInfo), paymentController.getOrderInfo);

router.route('/:paymentId').get(validate(paymentValidation.getPayment), paymentController.getPayment);
// .patch(validate(paymentValidation.updatePayment), paymentController.updatePayment)
// .delete(validate(paymentValidation.deletePayment), paymentController.deletePayment);

module.exports = router;
