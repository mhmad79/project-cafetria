import { authOptions } from "../auth/[...nextauth]/route";
import { MenuItem } from "../../models/MenuItem";
import { Order } from "../../models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, details } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  
  console.log(userEmail);
  
  if (!userEmail) {
    console.error("❌ No email found in session");
    return Response.json({ error: 'User email not found in session' }, { status: 400 });
  }
  
  // إنشاء مستند جديد للطلب
  const orderDoc = await Order.create({
    userEmail,
    ...details,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];

  // معالجة المنتجات في سلة الشراء
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);

    if (!productInfo) {
      console.error('❌ Product not found:', cartProduct._id);
      continue; // تخطي المنتج في حال عدم العثور عليه
    }

    let productPrice = Number(productInfo.price) || 0;

    // ✅ التعامل مع الحجم (size)
    if (cartProduct.size && cartProduct.size._id) {
      const size = productInfo.sizes?.find(
        size => size._id.toString() === cartProduct.size._id.toString()
      );
      if (size?.price) {
        productPrice += Number(size.price);
      } else {
        console.error('❌ Size not found or invalid for product:', productInfo._id);
      }
    }

    // ✅ التعامل مع الإضافات (extras)
    if (Array.isArray(cartProduct.extras) && cartProduct.extras.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices || [];
        const extraThingInfo = productExtras.find(
          extra => extra._id.toString() === cartProductExtraThing._id.toString()
        );
        if (extraThingInfo?.price) {
          productPrice += Number(extraThingInfo.price);
        }
      }
    }

    const productName = cartProduct.name || productInfo.name || 'Product';

    const unitAmount = Math.round(Number(productPrice) * 100);

    // التأكد من أن السعر رقم صحيح
    if (isNaN(unitAmount)) {
      console.error('❌ Invalid unit amount for product:', productName, '->', productPrice);
      continue; // تخطي المنتج بدل كسر الكود
    }

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName,
        },
        unit_amount: unitAmount,
      },
    });
  }

  // التأكد من أن stripeLineItems ليس فارغًا قبل إرسال الطلب إلى Stripe
  if (stripeLineItems.length === 0) {
    return Response.json({ error: 'No valid products to checkout' }, { status: 400 });
  }

  // إنشاء جلسة Stripe
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: '.',
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'USD' },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}





