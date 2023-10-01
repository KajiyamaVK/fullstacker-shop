import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  height: '90%',
})

export const ProductContainer = styled('div', {
  display: 'flex',
  gap: '1rem',
  borderBottom: '1px solid $gray300',
  paddingBottom: '1rem',
})

export const SummaryContainer = styled('div', {
  display: 'flex',
  margin: '0 2rem',
  gap: '1rem',
  justifyContent: 'space-between',
})

export const RemoveButton = styled('button', {
  color: '$green500',
  fontSize: '1.125rem',
  flexGrow: 1,
  textAlign: 'bottom',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  '&:hover': {
    color: '$green300',
  },
})

export const FinishButton = styled('button', {
  color: '$white',
  fontSize: '1.125rem',
  textAlign: 'bottom',
  background: '$green500',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  height: '2.25rem',
  borderRadius: '8',
  '&:hover': {
    background: '$green300',
  },
})

export const ItemName = styled('h3', {
  fontSize: '1.125rem',
  fontWeight: 'normal',
  color: '$gray300',
})
