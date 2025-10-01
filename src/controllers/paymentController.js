import { verifyFlutterwavePayment, initiateFlutterwavePayment } from "../services/paymentService.js"

// STEP 1: Initiate payment
export const paymentInit = async (req, res) => {
    try {
        const { amount } = req.body;
        const adminId = req.admin._id //this comes from jwtAuth middleware

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        const {paymentLink, tx_ref} = await initiateFlutterwavePayment(adminId, amount);

        // ✅ Return a clean response
        res.json({
            success: true,
            paymentUrl: paymentLink, // <-- frontend will open this
            amount,
            tx_ref
        });
    } catch (error) {
        console.error('Payment init error:', error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

// STEP: Verify payment
export const paymentVerification = async (req, res) => {
    try {
        const { tx_ref } = req.params;
        const result = await verifyFlutterwavePayment(tx_ref);

        res.json(result);
    } catch (error) {
        console.error("Payment verify error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};