import express from 'express';
import FormRequestController from '../controllers/RequestTravelController';

const router = express.Router();

router.post('/', FormRequestController.createRequestTravel);
router.get('/', FormRequestController.allRequestTravel);
router.get('/:id', FormRequestController.getItem);

export default router;
