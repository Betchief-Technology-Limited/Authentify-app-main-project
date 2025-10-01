import express from 'express';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';
import { sendSmsOtp } from '../controllers/otpController.js'

export const otpRouter = express.Router()

otpRouter.post('/sms', apiKeyAuth, sendSmsOtp);

