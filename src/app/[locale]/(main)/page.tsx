import { ArrowRight, Book } from 'lucide-react'
import { Locale, useLocale, useTranslations } from 'next-intl'

import { UnderlineText } from '@/components/blocks/underline-text'
import { Hero, type HeroProps } from '@/components/hero'
import { Pricing } from '@/components/pricing'

export default function Home() {
  const locale = useLocale()
  const t = useTranslations('Hero')

  const hero: Record<Locale, HeroProps> = {
    zh: {
      announcement: {
        text: '😃 即将发布',
        props: {
          href: '/docs',
          className: 'border-purple-300 dark:border-purple-800',
        },
      },
      title: (
        <>
          使用{' '}
          <UnderlineText lineColor="#9810fa7f" className="text-purple-500">
            Easy SaaS Next
          </UnderlineText>{' '}
          更快构建 SaaS 应用
        </>
      ),
      description: '在Easy SaaS Next中使用最先进的技术，基于 Nextjs 快速构建你的 SaaS 应用',
    },
    en: {
      announcement: {
        text: '😃 Coming soon',
        props: {
          href: '/docs',
        },
      },
      title: (
        <>
          Make your{' '}
          <UnderlineText lineColor="#9810fa7f" className="text-purple-500">
            SaaS Application
          </UnderlineText>{' '}
          easier
        </>
      ),
      description:
        'Build your SaaS application faster with Easy SaaS Next using cutting-edge technologies based on Nextjs',
    },
  }

  return (
    <>
      <Hero
        buttons={[
          {
            text: (
              <>
                {t('getStarted')} <ArrowRight />
              </>
            ),
            href: '/',
            props: {
              size: 'lg',
            },
          },
          {
            text: (
              <>
                {t('readDocs')} <Book />
              </>
            ),
            href: '/docs',
            props: {
              variant: 'outline',
              size: 'lg',
            },
          },
        ]}
        {...hero[locale]}
      />
      <Pricing />
    </>
  )
}
