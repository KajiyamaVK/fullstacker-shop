import { stripe } from '@/libs/stripe'
import { ImageContainer, SuccessContainer } from '@/styles/pagesStyles/success'
import { useShoppingCart } from 'use-shopping-cart'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import Head from 'next/head'

interface IProduct {
  name: string
  imageUrl: string
}
interface ISuccessProps {
  customerName: string
  product: IProduct
}
export default function Success({ customerName, product }: ISuccessProps) {
  const { clearCart, cartCount } = useShoppingCart()

  if (cartCount && cartCount > 0) clearCart()
  return (
    <>
      <Head>
        <title>Fullstacker - compra efetuada</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={120} height={110} />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong> {product.name} </strong>já está a caminho da sua casa
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  if (!session.customer_details?.name)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  if (typeof session.line_items === 'undefined')
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  const customerName = session.customer_details.name

  const product = session.line_items.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
