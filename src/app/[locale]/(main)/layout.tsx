import Footer from '@/components/footer'
import { HeroHeader } from '@/components/hero5-header'
import { cn } from '@/lib/utils'

import style from './index.module.css'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeroHeader />
      <main className={cn(style.fd, 'overflow-hidden pt-20')}>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout
