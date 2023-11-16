const Joi = require('joi');
const {
  objectId
} = require('./custom.validation');

const createPayment = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    token: Joi.object().required(),
  }),
};

const createSession = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
  }),
};

const getOrderInfo = {
  body: Joi.object().keys({
    orderId: Joi.string().required(),
  }),
};

const getPayments = {
  query: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId),
  }),
};

// const updatePayment = {
//   params: Joi.object().keys({
//     paymentId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       amount: Joi.number(),
//       name: Joi.string(),
//       email: Joi.string(),
//     })
//     .min(1),
// };

// const deletePayment = {
//   params: Joi.object().keys({
//     paymentId: Joi.string().custom(objectId),
//   }),
// };

module.exports = {
  createPayment,
  createSession,
  getPayments,
  getPayment,
  getOrderInfo,
  // updatePayment,
  // deletePayment,
};
