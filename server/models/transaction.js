import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true }, // Amount in real currency (e.g., $10)
    credits: { type: Number, required: true }, // Points added (e.g., 100 points)
    paymentId: { type: String, required: true }, // Stripe Payment Intent ID
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
}, { timestamps: true });

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;