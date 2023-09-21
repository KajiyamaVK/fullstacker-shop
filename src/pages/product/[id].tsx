import { useState } from 'react'
import { stripe } from '@/libs/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pagesStyles/product'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import Head from 'next/head'

interface IProductProps {
  product: {
    id: number
    name: string
    description: string
    imageUrl: string
    price: string
    defaultPriceId: string
  }
}

export default function Product({ product }: IProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  async function handleClick() {
    try {
      setIsCreatingCheckoutSession(true)
      console.log('defaultPriceId', product.defaultPriceId)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (e) {
      setIsCreatingCheckoutSession(false)
      // Sempre se comunicar com alguma gerraamenta de observabilidade (Datadog / Sentry)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const { isFallback } = useRouter()
  if (isFallback) {
    return <p>Loading</p>
  }
  return (
    <>
      <Head>
        <title>Fullstacker - {product.name}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={handleClick} disabled={isCreatingCheckoutSession}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_OYLQ95qK655RPz' } }],
    fallback: true,
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  if (typeof params === 'undefined') throw new Error('Sem id do produto')
  const productId = params.id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  if (!price.unit_amount) throw new Error('No price')

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
