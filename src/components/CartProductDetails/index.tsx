import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import axios from 'axios'
import { ImageContainer } from '@/pages/product/Components/product'
import {
  RemoveButton,
  ItemName,
  Container,
  ProductContainer,
  FinishButton,
  SummaryContainer,
} from './styles'

export function CartProductDetails() {
  const { cartDetails, removeItem, cartCount } = useShoppingCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const isCartEmpty = cartCount === 0

  async function handleCheckout() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lineItems: any[] = []
    if (cartDetails) {
      Object.keys(cartDetails).forEach((key) => {
        const item = cartDetails[key]
        lineItems.push({
          price: item.defaultPriceId,
          quantity: item.quantity,
        })
      })
    }

    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        lineItems,
      })
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (e) {
      setIsCreatingCheckoutSession(false)
      // Sempre se comunicar com alguma ferramenta de observabilidade (Datadog / Sentry)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  if (typeof cartDetails === 'undefined') {
    return (
      <Container>
        <h1>There are no items in the cart</h1>
      </Container>
    )
  }

  function handleRemoveItem(id: string) {
    removeItem(id)
  }

  // Variable to store the total price of the cart
  let currentPrice = 0.0
  return (
    <Container>
      {Object.keys(cartDetails).map((key) => {
        const item = cartDetails[key]

        currentPrice =
          currentPrice +
          parseFloat(
            item.price.toString().replace(',', '.').replace('R$', ''),
          ) *
            item.quantity

        return (
          <ProductContainer key={item.id} style={{ display: 'flex' }}>
            <ImageContainer>
              <Image
                src={item.imageUrl ?? ''}
                alt=""
                width={120}
                height={120}
              />
            </ImageContainer>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
            >
              <ItemName>{item.name}</ItemName>
              <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                {item.price}
              </p>
              <p>Quantity: {item.quantity}</p>
              <div style={{ flexGrow: 1 }} />
              <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                Remove
              </RemoveButton>
            </div>
          </ProductContainer>
        )
      })}
      {!isCartEmpty && (
        <>
          <div style={{ flexGrow: 1 }} />
          <SummaryContainer>
            <div>
              <p>Quantity</p>
              <p style={{ fontWeight: 'bold' }}>Total Amount</p>
            </div>
            <div>
              <p>{cartCount} items</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                R$ {currentPrice.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </SummaryContainer>
          <FinishButton
            onClick={handleCheckout}
            disabled={isCreatingCheckoutSession}
          >
            Checkout
          </FinishButton>
        </>
      )}
    </Container>
  )
}
