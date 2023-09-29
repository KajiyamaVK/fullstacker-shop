import { CartButtonStyle } from '../styles/pagesStyles/cart'
import { AiOutlineShoppingCart } from 'react-icons/ai'

interface IProps {
  isCartOpen: boolean
  setIsCartOpen: (value: boolean) => void
}
export function CartButton({ isCartOpen, setIsCartOpen }: IProps) {
  function handleClick() {
    setIsCartOpen(true)
  }
  return (
    <CartButtonStyle onClick={handleClick}>
      <AiOutlineShoppingCart style={{ fontSize: '2rem' }} />
    </CartButtonStyle>
  )
}
