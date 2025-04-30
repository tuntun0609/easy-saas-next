import { FAQ } from '@/components/FAQ'
import HeroSection from '@/components/hero-section'
import IntegrationsSection from '@/components/integrations'
import Pricing from '@/components/pricing'
import { AnimatedViewport } from '@/components/ui/animated-viewport'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnimatedViewport preset="blur-slide-fade">
        <IntegrationsSection />
      </AnimatedViewport>
      <AnimatedViewport preset="blur-slide-fade">
        <FAQ />
      </AnimatedViewport>
      <AnimatedViewport preset="blur-slide-fade">
        <Pricing />
      </AnimatedViewport>
      <div className="absolute top-0 right-0 left-0 z-[-2] h-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(149,119,198,0.3),rgba(255,255,255,0))] dark:hidden"></div>
    </>
  )
}
