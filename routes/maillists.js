import express from 'express';
import MaillistController from '../controllers/MaillistController';
import Authentication from '../middlewares/auth';

const router = express.Router();

router.post('/sendtext', MaillistController.sendEmailText);
router.post('/sendhtml', MaillistController.sendEmailHTML);
router.post('/subscribe', MaillistController.subscribe);
router.post('/subscribe', MaillistController.subscribe);
router.get('/unsubcribe/:id', MaillistController.unsubscribed);
router.get('/subcribers', Authentication.isAdmin, MaillistController.subscribers);

export default router;
