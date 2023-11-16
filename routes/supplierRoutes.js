import express from 'express';
import supplierController from '../controllers/supplierController';
// import {
//   checkToken
// } from '../helpers';
import Authentication from '../middlewares/auth';

const router = express.Router();
router.get('/myprofile', Authentication.checkAuthentication, supplierController.myprofile);
router.get('/viewsupplier/:id', supplierController.viewSupplierAccount);
router.get('/all', supplierController.getSuppliers);
router.put('/update/images', Authentication.checkAuthentication, supplierController.updateProfileImage);

export default router;
