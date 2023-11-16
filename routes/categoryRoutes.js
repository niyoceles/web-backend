import express from 'express';
import categoryController from '../controllers/categoryController';
import Authentication from '../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  // checkToken,
  categoryController.createCategory
);

router.get('/allcategories', categoryController.allAvailbleCategories);
router.get('/:name', categoryController.getCategory);

router.patch(
  '/suspend/:id',
  Authentication.checkAuthentication,
  categoryController.suspendCategory
);

router.patch(
  '/activate/:id',
  Authentication.checkAuthentication,
  categoryController.activateCategory
);
router.delete(
  '/delete/:id',
  Authentication.checkAuthentication,
  categoryController.deleteCategory
);

export default router;
