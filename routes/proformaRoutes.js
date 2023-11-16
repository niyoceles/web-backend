import express from 'express';
import proformaController from '../controllers/proformaController';
// import orderValidation from '../validations/orderValidation';
// import itemValidation from '../validations/itemValidation';
import Authentication from '../middlewares/auth';

const router = express.Router();
// client create an order
router.post(
  '/',
  // '/:itemOwnerId',
  // checkToken,
  // itemValidation.validateItemId,
  // orderValidation.validateOrder,
  proformaController.createProforma
);

router.get('/', Authentication.checkAuthentication, proformaController.getProforma);
router.get(
  '/my',
  Authentication.checkAuthentication,
  proformaController.getMyProforma
);
router.get('/:id', proformaController.getSingleProforma);
router.delete('/', proformaController.cancelOrder);
// owner
router.patch(
  '/',
  Authentication.checkAuthentication,
  proformaController.confirmOrder
);
export default router;
