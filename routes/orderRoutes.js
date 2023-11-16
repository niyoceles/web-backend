import express from 'express';
import orderController from '../controllers/orderController';
import orderValidation from '../validations/orderValidation';
// import itemValidation from '../validations/itemValidation';
// import { checkToken } from '../helpers';
import Authentication from '../middlewares/auth';

const router = express.Router();
// client create an order
router.post(
  '/',
  // checkToken,
  // itemValidation.validateItemId,
  orderValidation.validateOrder,
  orderController.createOrder
);

router.get('/', Authentication.checkAuthentication, orderController.getOrders);
router.get('/:id', orderController.getSingleOrder);
router.put('/pay', Authentication.checkAuthentication, orderController.onlinePayment);
router.put('/:bookingId', orderController.updateOrder);
router.delete('/', Authentication.checkAuthentication, orderController.cancelOrder);
// owner
router.patch('/', Authentication.checkAuthentication, orderController.confirmOrder);
router.get('/supplier', Authentication.checkAuthentication, orderController.ourOrders);

export default router;
