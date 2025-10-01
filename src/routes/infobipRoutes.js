import express from 'express';
import { handleDeliveryReport } from '../controllers/otpWebhookController.js';

const infobipRouter = express.Router();

// Infobip will POST delivery reports here
infobipRouter.post('/delivery-report', handleDeliveryReport);

export default infobipRouter;