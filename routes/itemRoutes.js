import express from 'express';
import itemController from '../controllers/itemController';
import itemValidation from '../validations/itemValidation';
import Authentication from '../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  Authentication.checkAuthentication,
  itemValidation.validateItem,
  itemController.createItem
);

router.put(
  '/:id',
  Authentication.checkAuthentication,
  itemValidation.validateItem,
  itemController.updateItem
);

router.patch(
  '/suspend/:id',
  Authentication.checkAuthentication,
  itemValidation.validateItemId,
  itemController.suspendItem
);

router.patch(
  '/activate/:id',
  Authentication.checkAuthentication,
  itemValidation.validateItemId,
  itemController.activateItem
);

router.get('/all', itemController.allAvailbleItems);
router.get('/home', itemController.getHomeItems);
router.get('/related/:category', itemController.relatedItems);
router.get('/:id', itemController.getItem);

router.post('/search', itemController.searchItem);
router.get('/',
  Authentication.checkAuthentication,
  itemController.GetMyItems,);

router.delete(
  '/delete/:id',
  Authentication.checkAuthentication,
  itemValidation.validateItemId,
  itemController.deleteItem
);

export default router;
