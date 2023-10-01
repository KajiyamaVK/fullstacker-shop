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
  const stripeToken = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  const appUrl = process.env.NEXT_PUBLIC_URL
  if (!stripeToken) {
    throw new Error('Stripe token missing')
  }
  if (!appUrl) {
    throw new Error('App URL missing')
  }

  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <Container>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={stripeToken}
        successUrl={`${appUrl}/success`}
        cancelUrl={appUrl}
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
            height={50}
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
