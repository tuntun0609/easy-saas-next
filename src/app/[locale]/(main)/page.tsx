import { Locale, useLocale } from 'next-intl'

import { Hero, type HeroProps } from '@/components/hero'
import { UnderlineText } from '@/components/underline-text'

export default function Home() {
  const locale = useLocale()

  const hero: Record<Locale, HeroProps> = {
    zh: {
      announcement: '😃 即将发布',
      announcementLink: '/docs',
      title: (
        <>
          使用 <UnderlineText>Easy SaaS Next</UnderlineText> 更快构建 SaaS 应用
        </>
      ),
      description: '使用 Next.js 和 Tailwind CSS 构建的 SaaS 应用',
    },
    en: {
      announcement: '😃 Coming soon',
      announcementLink: '/docs',
      title: (
        <>
          Make your <UnderlineText>SaaS Application</UnderlineText> easier
        </>
      ),
      description: 'The easiest way to build a SaaS',
    },
  }

  return (
    <>
      <Hero {...hero[locale]} />
    </>
  )
}
