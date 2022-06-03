// This is your test secret API key.
const stripe = require('stripe')(
  'sk_test_51IVOfvKppq5fi3qACb9WM00CtaWa2Bx9zKSLaMNIcDCJYQGWXqCNvLtUtOgx5VTaASG6jkRjmlR31EKO3x5DlOVr00K2VzJsxP'
)

const YOUR_DOMAIN = process.env.APP_DOMAIN

export const createCheckoutSession = async (metadata) => {
  const session = await stripe.checkout.sessions.create({
    // TODO:  Add customer email
    // customer_email: ""
    metadata,
    line_items: [
      {
        // price: 'price_1L6dfmKppq5fi3qAkryxOkEG', // production price
        price: 'price_1J8e2sKppq5fi3qA5Own5KES',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/redirect/stripe`,
    cancel_url: `${YOUR_DOMAIN}/redirect/stripe?error=cancelled`,
  })

  return { url: session.url }
}
