import Image from 'next/image'
import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/globals'
import logo from '../../public/appImages/FullstackerLogoBannerDarkBG.png'
import { Container, Header } from '@/styles/pages/app'

globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image
          src={logo}
          style={{ objectFit: 'cover' }}
          width={200}
          alt="Uma imagem de várias conexões formando a imagem de um cérebro representado o logo da Fullstacker Intel."
        />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
