import express from 'express';
import ToursController from '../controllers/ToursController';
import toursValidation from '../middlewares/validations/toursValidations';
import Authentication from '../middlewares/auth';

const router = express.Router();
router.get(
  '/',
  ToursController.retrieveTours
);

router.get(
  '/five',
  ToursController.retrieveFiveTours
);
router.post(
  '/create',
  Authentication.checkAuthentication,
  toursValidation.toursValidator,
  ToursController.create
);
router.put(
  '/update/:slug',
  Authentication.checkAuthentication,
  toursValidation.slugValidator,
  ToursController.update
);
router.get('/', Authentication.checkAuthentication, ToursController.myTours);
router.get(
  '/:slug',
  toursValidation.slugValidator,
  ToursController.read
);
router.delete(
  '/delete/:slug',
  Authentication.isAdmin,
  toursValidation.slugValidator,
  ToursController.delete
);
router.put(
  '/publish/:slug',
  Authentication.isAdmin,
  toursValidation.slugValidator,
  ToursController.publish
);
export default router;
