import express from 'express';
import FormRequestController from '../controllers/FormRequestEventController';

const router = express.Router();

router.post('/', FormRequestController.createRequestEvent);
router.get('/', FormRequestController.allFormRequestEvent);
router.get('/:id', FormRequestController.getItem);

export default router;
