const express = require("express");
const Stripe = require("stripe");
const path = require('path'); 
require("dotenv").config({
    path: path.resolve(`${process.env.NODE_ENV}.env`)
});
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {

  const customer = await stripe.customers.create({
    description: 'My First Test Customer',
    metadata: {
        userId: "req.body.userId",
          cart: "fhghjhjhj",
      },
  });

  const session = await stripe.checkout.sessions.create({
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
    line_items: [
      {price_data: {
              currency: "inr",
              product_data: {
                name: "iPhone 12 Pro",
                metadata: {
                  id: "63917fd69beeb505f74fd455",
                },
              },
              unit_amount: 999 * 100,
            },
             quantity: 2},
    ],
    mode: 'payment',
  });

  const events = await stripe.events.list({
    limit: 3,
  })
// res.send({events:events})
//   res.send({ customer:session });
  res.send({ url: session.url });  
});






const endpointSecret = "whsec_1259c946c0c3bdee7ab5d7d19ee7997d5a8514a08ceefba143a7fdb86c8fabd0";
router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.send();
});





module.exports=router