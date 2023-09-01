import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey) {
  throw new Error('Sem chave secreta stripe')
}
export const stripe = new Stripe(secretKey, {
  apiVersion: '2023-08-16',
  appInfo: {
    name: 'Fullstacker Shop',
  },
})
