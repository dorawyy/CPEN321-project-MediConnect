const stripe = require("stripe")(
  "sk_test_51HgY9jJ2xV65vEU9tE5nZx7o42bVARBVOmoym3xolAIXui1DwFjdih1lNOut2iXN2L0HfRFMoIjfur2T5p6ajODs00LmdCBBPg"
);

const createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "usd",
    payment_method_types: ["card"],
    receipt_email: "jenny.rosen@example.com",
  });

  console.log(paymentIntent);
  res.send(paymentIntent);
};

module.exports = { createPaymentIntent };
