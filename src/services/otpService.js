import { generateSecret, totp } from "authentifyotp";
import Otp from "../models/otp.js";
import { sendSmsViaMobishastra } from "./mobishastraService.js";
import { checkBalance, deduct } from "./walletService.js";

export const createAndSendOtpSms = async ({ admin, to }) => {
    //  1) Check wallet balance
    const hasBalance = await checkBalance(admin._id);
    if (!hasBalance) {
        throw new Error('Insufficient wallet balance. Please top-up so as to be able to send OTP ');
    }
    // 2) generate secret and code
    const secret = generateSecret(32); //from authentify lib call
    const code = totp(secret) //authentify library call - returns e.g "123456"

    // 3) send via Infobip
    const messageText = `Your authentify verification code is ${code}. It expires in ${Math.floor(
        parseInt(process.env.OTP_TTL_SECONDS || "300", 10) / 60
    )} minute(s).`;

    const smsResp = await sendSmsViaMobishastra(to, messageText);

    // 4) store OTP record (do NOT store code directly, store secret + expiry)
    const otpDoc = await Otp.create({
        admin: admin ? admin._id : null,
        to,
        secret,
        expiresAt: new Date(
            Date.now() + parseInt(process.env.OTP_TTL_SECONDS || "300", 10) * 1000
        ),
        status: smsResp.success ? "delivered" : "failed",
        provider: "mobishastra",
        providerMessageId: smsResp.messageId,
        providerResponseCode: smsResp.responseCode,
        providerRaw: smsResp.raw
    });

    // 5) Deduct wallet per OTP sent
    if(smsResp.success){
        await deduct(admin._id, parseFloat(process.env.SMS_API_COST || '10'));
    }

    return { otpDoc, smsResp }
}