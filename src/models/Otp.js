import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
   admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
   to: { type: String, required: true }, //recipient Phone number(E.164)
   secret: { type: String, required: true }, // totp secret
   expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } //TTL index --> deletes doc at expiersAt
   },
   verified: { type: Boolean, default: false },
   status: {
      type: String,
      enum: ['pending', 'delivered', 'failed'],
      default: 'pending'
   }, //mobishastra delivery status
   provider: { type: String, default: 'mobishastra' },
   providerMessageId: { type: String },
   providerResponseCode: { type: String },
   providerRaw: { type: Object },
   createdAt: { type: Date, default: Date.now }
}
);

const Otp = new mongoose.model('Otp', otpSchema)

export default Otp