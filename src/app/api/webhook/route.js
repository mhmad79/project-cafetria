import { Order } from "../../models/Order";
import mongoose from "mongoose";

const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  console.log('🔥 Incoming Stripe webhook request');

  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('❌ Stripe Webhook Error');
    console.log(e);
    return Response.json(e, { status: 400 });
  }

  console.log('✅ Webhook received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';

    console.log('🧾 Order ID:', orderId);
    console.log('💰 Payment status:', isPaid);

    try {
      await mongoose.connect(process.env.MONGO_URL);
      if (isPaid && orderId) {
        const result = await Order.updateOne({ _id: orderId }, { paid: true });
        console.log(`✅ Order ${orderId} marked as paid`);
        console.log('🛠 Update result:', result);
      } else {
        console.warn('⚠️ Missing orderId or payment not completed');
      }
    } catch (err) {
      console.error('❌ MongoDB Update Error:', err);
    }
  }

  return Response.json('ok', { status: 200 });
}
