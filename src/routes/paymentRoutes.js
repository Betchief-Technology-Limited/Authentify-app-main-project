import express from 'express';
import { paymentVerification, paymentInit } from '../controllers/paymentController.js';
import { authMiddleware } from '../middleware/jwtAuth.js';

const paymentRouter = express.Router();

// verify payment
paymentRouter.post('/init', authMiddleware, paymentInit)
paymentRouter.post('/verify/:tx_ref', authMiddleware,  paymentVerification)

export default paymentRouter