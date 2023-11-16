const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  paymentService
} = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.createPayment(req.body);
  res.status(httpStatus.CREATED).send(payment);
});

const createSession = catchAsync(async (req, res) => {
  await paymentService
    .createPaymentSession(req.body.amount)
    .then((response) => {
      res.status(httpStatus.CREATED).send({
        sessionId: response.data.session.id,
        status: 'success',
      });
    })
    .catch((err) => {
      res.status(httpStatus.BAD_REQUEST).send({
        status: 'error',
        message: JSON.stringify(err),
      });
    });
});

const getOrderInfo = catchAsync(async (req, res) => {
  await paymentService
    .getTransactionResults(req.body.orderId)
    .then((response) => {
      res.status(httpStatus.OK).send({
        status: 'success',
        data: response.data,
      });
    })
    .catch((err) => {
      res.status(httpStatus.BAD_REQUEST).send({
        status: 'error',
        message: JSON.stringify(err),
      });
    });
});

const getPayments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await paymentService.queryPayments(filter, options);
  res.send(result);
});

const getPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.getPaymentById(req.params.paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  res.send(payment);
});

// const updatePayment = catchAsync(async (req, res) => {
//   const payment = await paymentService.updatePaymentById(req.params.paymentId, req.body);
//   res.send(payment);
// });

// const deletePayment = catchAsync(async (req, res) => {
//   await paymentService.deletePaymentById(req.params.paymentId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createPayment,
  createSession,
  getPayments,
  getPayment,
  getOrderInfo,
  // updatePayment,
  // deletePayment,
};
