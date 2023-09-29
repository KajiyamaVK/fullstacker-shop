import { styled } from '..'

export const CartContainerMain = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  float: 'right',
  height: '100vh',
  backgroundColor: '#333',
  display: '$$display',
  width: '500px',
  maxWidth: 1180,
})

export const CloseButton = styled('button', {
  display: 'flex',
  justifySelf: 'flex-end',
  alignItems: 'center',
  gap: '5px',
  margin: '24px',
  backgroundColor: 'transparent',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
})

export const CartButtonStyle = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '$green300',
  fontSize: '2rem',
  '&:hover': {
    color: '$green500',
  },
})

export const CartProductsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  height: '100%',
})

export const CartMessageBox = styled('p', {
  color: '$white',
  fontSize: '1.5rem',
  textAlign: 'center',
  margin: '100px auto',
  display: '$$display',
})
