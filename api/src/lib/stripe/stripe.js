import Sentry from 'src/lib/sentry'
const stripe = require('stripe')(
  'sk_test_51IVOfvKppq5fi3qACb9WM00CtaWa2Bx9zKSLaMNIcDCJYQGWXqCNvLtUtOgx5VTaASG6jkRjmlR31EKO3x5DlOVr00K2VzJsxP'
)
import { isProduction } from 'src/lib/helpers'
import { db } from 'src/lib/db'

import { processMintPurchaseOrder } from 'src/lib/mintPurchases'

const STRIPE_WEBHOOK_SECRET = isProduction
  ? process.env.STRIPE_WEBHOOK_SECRET
  : 'whsec_9b44ae98a6e0e6b55e47482362f86e6d03f0aaabc0a971d589e14eb2f45cd055'
const YOUR_DOMAIN = process.env.APP_DOMAIN

export const createCheckoutSession = async ({ metadata, email }) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
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
  return { url: session.url, paymentIntentId: session.payment_intent }
}

export const processStripeWebhook = async ({ body, stripeSignature }) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      STRIPE_WEBHOOK_SECRET
    )
    const session = event.data.object
    if (session.metadata) {
      const { username } = session.metadata
      Sentry.setUser({ username })
    }

    if (event.type === 'checkout.session.completed') {
      let mintPurchase = await db.mintPurchase.findUnique({
        where: { orderId: session.payment_intent },
        include: { member: true },
      })
      if (!mintPurchase)
        throw new Error(
          `No mintPurchase found for payment_intent ${session.payment_intent}`
        )
      if (mintPurchase.orderStatus === 'COMPLETE')
        throw new Error(
          `Stripe payment_intent ${session.payment_intent} has already been submitted for purchase #${mintPurchase.id}`
        )
      // Mint
      await processMintPurchaseOrder({ mintPurchase })
    }
  } catch (e) {
    throw `processStripeWebhook() ${e}`
  }
}
