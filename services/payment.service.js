/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// const axios = require('axios');
const {
  generateUUID
} = require('../utils/uui');

const {
  Payment
} = require('../models');

const ROOT_MASTERCARD_API = 'https://ap-gateway.mastercard.com/api/rest/version/61/merchant/8206000697';
// const createPaymentSession = async (amount) => {
//   const data = {
//     apiOperation: 'CREATE_CHECKOUT_SESSION',
//     interaction: {
//       operation: 'PURCHASE',
//     },
//     order: {
//       amount: parseFloat(amount),
//       currency: 'USD',
//       id: `${generateUUID()}`,
//     },
//   };

//   const response = await axios.post(`${ROOT_MASTERCARD_API}/session`, data, {
//     headers: {
//       Authorization: 'Basic bWVyY2hhbnQuODIwNjAwMDY5NzpiZTcxZTIyYmM1YTZjMWQ0YmRhYWE4NWY3OWM2NTBiZA==',
//       'Content-Type': 'application/json',
//     },
//   });

//   return response;
// };

// const getTransactionResults = async (orderId) => {
//   const response = await axios.get(`${ROOT_MASTERCARD_API}/order/${orderId}`, {
//     headers: {
//       Authorization: 'Basic bWVyY2hhbnQuODIwNjAwMDY5NzpiZTcxZTIyYmM1YTZjMWQ0YmRhYWE4NWY3OWM2NTBiZA==',
//       'Content-Type': 'application/json',
//     },
//   });
//   return response;
// };
const createPayment = async (paymentBody) => {
  const {
    name, email, amount, status
  } = paymentBody;

  const data = {
    name,
    email,
    amount,
    status,
  };

  const payment = await Payment.create(data);
  return payment;
};

const queryPayments = async (filter, options) => {
  const payments = await Payment.paginate(filter, options);
  return payments;
};

const getPaymentById = async (id) => Payment.findById(id);

module.exports = {
  createPayment,
  // createPaymentSession,
  queryPayments,
  // getTransactionResults,
  getPaymentById,
};
