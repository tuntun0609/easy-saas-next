import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import style from './index.module.css'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className={style.fd}>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout
