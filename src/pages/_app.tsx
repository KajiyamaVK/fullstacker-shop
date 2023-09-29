import { useState } from 'react'
import Image from 'next/image'
import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/globals'
import logo from '../../public/appImages/FullstackerLogoBannerDarkBG.png'
import { Container, Header } from '@/styles/pagesStyles/app'
import { CartProvider } from 'use-shopping-cart'
import { CartContainer } from '@/components/CartContainer'
import { CartButton } from '@/components/CartButton'

globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  const stripeToken = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
  if (!stripeToken) {
    throw new Error('Stripe token missing')
  }

  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <Container>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={stripeToken}
        successUrl="stripe.com"
        cancelUrl="twitter.com/dayhaysoos"
        currency="BRL"
        allowedCountries={['US', 'GB', 'CA', 'BR']}
        billingAddressCollection={true}
        shouldPersist
      >
        <Header>
          <Image
            src={logo}
            style={{ objectFit: 'cover' }}
            width={200}
            alt="Uma imagem de várias conexões formando a imagem de um cérebro representado o logo da Fullstacker Intel."
          />
          <CartButton isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </Header>
        <Component {...pageProps} />
        <CartContainer isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </CartProvider>
    </Container>
  )
}
