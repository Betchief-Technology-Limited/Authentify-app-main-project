import { createAndSendOtpSms } from "../services/otpService.js";

export const sendSmsOtp = async (req, res) => {
   try {
    const { to } = req.body;

    if(!to) {
        return res.status(400).json({ message: "`to` (recipient phone) is required in request body" });
    }

    const result = await createAndSendOtpSms({ admin: req.admin, to });

    return res.status(200).json({
        success: true,
        message: 'OTP generated and SMS request sent via Mobishastra',
        sms: result.smsResp,
        otpId: result.otpDoc._id,
        expiresAt: result.otpDoc.expiresAt
    });
   } catch (err) {
        return res.status(500).json({
            message: 'Failed to send OTP',
            error: err.message
        })
   }
}