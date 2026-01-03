import Stripe from "stripe";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

// 1. Initiate Payment (Create Intent)
export const createPaymentIntent = async (req, res) => {
    try {
        const { credits } = req.body; // User wants to buy 100 points
        const { _id } = req.user;

        // conversion rate: 1 Credit = $1 (example)
        // Stripe expects amounts in CENTS. So $10 = 1000 cents.
        const amount = credits * 100; 

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            metadata: { userId: _id.toString(), credits: credits.toString() }
        });

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        console.error("Stripe Error:", error);
        res.json({ success: false, message: error.message });
    }
};

// 2. Webhook / Verification (Confirm Payment & Add Points)
// NOTE: For security, production apps use Stripe Webhooks. 
// For this MVP, we will use a manual verify endpoint called from the frontend after success.
export const verifyPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        const userId = req.user._id;

        // Retrieve the payment from Stripe to ensure it's real
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === "succeeded") {
            
            // Check if we already processed this transaction to avoid double-adding
            const existingTx = await Transaction.findOne({ paymentId: paymentIntentId });
            if (existingTx) {
                return res.json({ success: false, message: "Transaction already processed" });
            }

            const creditsPurchased = parseInt(paymentIntent.metadata.credits);

            // A. Update User Balance
            const user = await User.findById(userId);
            user.credits += creditsPurchased;
            await user.save();

            // B. Create Transaction Record
            await Transaction.create({
                userId,
                amount: paymentIntent.amount / 100, // Convert cents back to dollars
                credits: creditsPurchased,
                paymentId: paymentIntentId,
                status: "success"
            });

            res.json({ success: true, message: `Added ${creditsPurchased} credits to wallet!` });
        } else {
            res.json({ success: false, message: "Payment failed or pending." });
        }

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Verification failed" });
    }
};