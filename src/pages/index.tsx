import { styled } from '@/styles'
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from '@/styles/pages/home'
import Image from 'next/image'
import { stripe } from '@/libs/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'

interface IHomeProps {
  products: {
    id: number
    name: string
    description: string
    imageUrl: string
    price: number
  }[]
}
export default function Home({ products }: IHomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Product className="keen-slider__slide">
              <Image
                src={product.imageUrl}
                width={600}
                height={480}
                alt=""
                style={{ objectFit: 'cover' }}
              />
              <footer>
                <strong>{product.name}</strong>
                <span>R$ {product.price}</span>
              </footer>
            </Product>
          </Link>
        )
      })}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    if (!price.unit_amount)
      throw new Error(`No price registered in product ${product.name}`)

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      price: (price.unit_amount / 100).toFixed(2),
    }
  })

  return {
    props: { products },
    revalidate: 60 * 60 * 24,
  }
}
