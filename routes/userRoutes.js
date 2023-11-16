import express from 'express';
import userController from '../controllers/UserController';
import userValidation from '../validations/authValidation';
import Authentication from '../middlewares/auth';

const router = express.Router();
router.post(
  '/supplier/',
  userValidation.validateSignupSupplier,
  userController.signupSupplier
);
router.post(
  '/',
  userValidation.validateSignupClient,
  userController.signupClient
);

router.get('/get/:token', userController.generateToken);
router.get('/verify/:token', userController.verifyUser);
// router.post('/login', userController.signIn);
// router.post('/signout', Authentication.checkAuthentication, userController.signout);
// router.post('/reset-password', userController.sendLinkResetPassword);
router.put('/reset-password/:token', userController.resetPassword);
router.put('/update', Authentication.checkAuthentication, userValidation.validateUpdateUser, userController.updateUserAccount);

export default router;
