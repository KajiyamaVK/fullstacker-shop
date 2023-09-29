import { Product } from 'use-shopping-cart/core'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import { ImageContainer } from '@/styles/pagesStyles/product'

export function CartProductDetails() {
  const { cartDetails } = useShoppingCart()
  const cartItems = []
  for (const item in cartDetails) {
    cartItems.push(cartDetails[item])
  }

  return (
    <div>
      {cartItems.map((item: Product) => (
        <div key={item.id} style={{ display: 'flex', gap: '15px' }}>
          <ImageContainer>
            <Image src={item.imageUrl ?? ''} alt="" width={100} height={150} />
          </ImageContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
