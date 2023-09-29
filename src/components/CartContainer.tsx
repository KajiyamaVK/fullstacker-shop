import {
  CartContainerMain,
  CartMessageBox,
  CartProductsContainer,
  CloseButton,
} from '@/styles/pagesStyles/cart'
import { CgCloseR } from 'react-icons/cg'
import { useShoppingCart } from 'use-shopping-cart'
import { CartProductDetails } from './CartProductDetails'

interface IProps {
  isCartOpen: boolean
  setIsCartOpen: (isCartOpen: boolean) => void
}

export function CartContainer({ isCartOpen, setIsCartOpen }: IProps) {
  /* Gets the totalPrice and a method for redirecting to Stripe */
  const { totalPrice, redirectToCheckout, cartCount } = useShoppingCart()

  if (typeof cartCount === 'undefined' || typeof totalPrice === 'undefined') {
    throw new Error('useShoppingCart returned undefined')
  }

  const isCartContainerHidden = isCartOpen ? '$display$block' : '$display$none'
  const isMessageNoxHidden = cartCount > 0 ? '$display$none' : '$display$block'

  function handleCloseButtonClick() {
    setIsCartOpen(false)
  }
  return (
    <CartContainerMain css={{ display: isCartContainerHidden }}>
      <CloseButton onClick={handleCloseButtonClick}>
        Close <CgCloseR />
      </CloseButton>
      <CartProductsContainer>
        <CartMessageBox css={{ display: isMessageNoxHidden }}>
          No products in the cart. = {'('} <br />
        </CartMessageBox>
        <CartProductDetails />
      </CartProductsContainer>
    </CartContainerMain>
  )
}
