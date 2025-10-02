import express from 'express';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';
import { sendSmsOtp, verifySmsOtp } from '../controllers/otpController.js'

export const otpRouter = express.Router()

// Send OTP via SMS
otpRouter.post('/sms', apiKeyAuth, sendSmsOtp);

// Verify OTP
otpRouter.post('/sms/verify', apiKeyAuth, verifySmsOtp);

