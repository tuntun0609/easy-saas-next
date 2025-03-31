import { Header } from '@/components/header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(149,119,198,0.3),rgba(255,255,255,0))] dark:hidden"></div>
    </>
  )
}

export default MainLayout
