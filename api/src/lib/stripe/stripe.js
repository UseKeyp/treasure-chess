const stripe = require('stripe')(
  'sk_test_51IVOfvKppq5fi3qACb9WM00CtaWa2Bx9zKSLaMNIcDCJYQGWXqCNvLtUtOgx5VTaASG6jkRjmlR31EKO3x5DlOVr00K2VzJsxP'
)
import { isProduction } from 'src/lib/helpers'

const STRIPE_WEBHOOK_SECRET = isProduction
  ? 'whsec_9b44ae98a6e0e6b55e47482362f86e6d03f0aaabc0a971d589e14eb2f45cd055'
  : process.env.STRIPE_WEBHOOK_SECRET
const YOUR_DOMAIN = process.env.APP_DOMAIN

export const createCheckoutSession = async (metadata) => {
  const session = await stripe.checkout.sessions.create({
    // TODO:  Add customer email
    // customer_email: ""
    metadata,
    line_items: [
      {
        price: isProduction
          ? 'price_1L6dfmKppq5fi3qAkryxOkEG'
          : 'price_1L6piIKppq5fi3qAhZBdEK0A',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/redirect/stripe`,
    cancel_url: `${YOUR_DOMAIN}/redirect/stripe?error=cancelled`,
  })

  return { url: session.url }
}

export const processStripeWebhook = async ({ body, stripeSignature }) => {
  const event = stripe.webhooks.constructEvent(
    body,
    stripeSignature,
    endpointSecret
  )
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    fulfillOrder(session)
  }
}
