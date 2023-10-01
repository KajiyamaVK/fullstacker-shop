// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/libs/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.NEXT_PUBLIC_URL,
    mode: 'payment',
    line_items: req.body.lineItems,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
