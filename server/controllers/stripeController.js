require("dotenv");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const stripe = require("stripe")(stripeSecretKey);

const createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2499,
    currency: "cad",
    payment_method_types: ["card"],
    metadata: { integration_check: "accept_a_payment" },
  });

  res.json({
    intent_id: paymentIntent.id,
    client_secret: paymentIntent.client_secret,
    key: stripePublicKey,
  });
};

// const confirmPaymentIntent = async (req, res) => {};

// const createCheckout = async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     cancel_url: "",
//     success_url: "",
//     mode: "payment",
//     payment_method_types: ["card"],
//   });

//   res.json({ id: session.id });
// };

module.exports = { createPaymentIntent };
