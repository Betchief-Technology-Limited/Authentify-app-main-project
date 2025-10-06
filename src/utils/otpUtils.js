// import crypto from 'crypto';
// import dotenv from 'dotenv'
// import { authenticator } from 'otplib';

// dotenv.config();

// const SERVER_HMAC_KEY = process.env.OTP_HMAC_KEY

// // ✅ Generate randomBytes
// export function generateSecret(){
//    return crypto.randomBytes(64).toString('hex')
// }

// //✅ Generate 6-digit OTP
// export function generateOTP(secret){
//     return authenticator.generate(secret)
// }

// //✅ Hash OTP with HMAC-SHA256
// export function hashOtp(otp){
//     return crypto
//         .createHmac('sha256', SERVER_HMAC_KEY)
//         .update(otp)
//         .digest('hex');
// }

// //Secure comparison (prevents timing attacks)
// export function safeCompare(hash1, hash2) {
//     const buf1 = Buffer.from(hash1, 'hex');
//     const buf2 = Buffer.from(hash2, 'hex');
//     return crypto.timingSafeEqual(buf1, buf2);
// }