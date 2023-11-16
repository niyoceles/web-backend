import express from 'express';
import ParticipantController from '../controllers/ParticipantController';
// import Authentication from '../middlewares/auth';

const router = express.Router();

router.post('/create', ParticipantController.createParticipant);
router.get('/all/:id', ParticipantController.getAllParticipants);
router.get('/:id', ParticipantController.getParticipantById);

export default router;
