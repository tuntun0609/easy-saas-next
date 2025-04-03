'use client'

import { ArrowRight, Book } from 'lucide-react'
import { Locale, useLocale, useTranslations } from 'next-intl'

import { Hero, type HeroProps } from '@/components/hero'
import { Mermaid } from '@/components/mermaid'
import { Price, PriceTier } from '@/components/price'
import { UnderlineText } from '@/components/underline-text'

export default function Home() {
  const locale = useLocale()
  const t = useTranslations('Hero')
  const priceT = useTranslations('Price')

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

  const priceTiers: PriceTier[] = [
    {
      id: 'free',
      name: priceT('free.name'),
      description: priceT('free.description'),
      price: 0,
      features: [
        { name: priceT('features.tutorials'), included: true },
        { name: priceT('features.basicComponents'), included: false },
        { name: priceT('features.communitySupport'), included: false },
        { name: priceT('features.fullSourceCode'), included: false },
        { name: priceT('features.advancedComponents'), included: false },
        { name: priceT('features.prioritySupport'), included: false },
        { name: priceT('features.customService'), included: false },
      ],
      buttonText: priceT('free.buttonText'),
      onButtonClick: () => console.log('免费版点击'),
    },
    {
      id: 'standard',
      name: priceT('standard.name'),
      description: priceT('standard.description'),
      price: 9.9,
      features: [
        { name: priceT('features.tutorials'), included: true },
        { name: priceT('features.basicComponents'), included: true },
        { name: priceT('features.communitySupport'), included: true },
        { name: priceT('features.fullSourceCode'), included: true },
        { name: priceT('features.advancedComponents'), included: false },
        { name: priceT('features.prioritySupport'), included: false },
        { name: priceT('features.customService'), included: false },
      ],
      buttonText: priceT('standard.buttonText'),
      popular: true,
      popularText: priceT('standard.popularText'),
      onButtonClick: () => console.log('标准版点击'),
    },
    {
      id: 'premium',
      name: priceT('premium.name'),
      description: priceT('premium.description'),
      price: priceT('premium.price'),
      currency: '',
      features: [
        { name: priceT('features.tutorials'), included: true },
        { name: priceT('features.basicComponents'), included: true },
        { name: priceT('features.communitySupport'), included: true },
        { name: priceT('features.fullSourceCode'), included: true },
        { name: priceT('features.advancedComponents'), included: true },
        { name: priceT('features.prioritySupport'), included: true },
        { name: priceT('features.customService'), included: true },
      ],
      buttonText: priceT('premium.buttonText'),
      onButtonClick: () => console.log('高级版点击'),
    },
  ]

  return (
    <>
      <Mermaid
        chart={`
graph TD;
subgraph AA [Consumers]
A[Mobile app];
B[Web app];
C[Node.js client];
end
subgraph BB [Services]
E[REST API];
F[GraphQL API];
G[SOAP API];
end
Z[GraphQL API];
A --> Z;
B --> Z;
C --> Z;
Z --> E;
Z --> F;
Z --> G;`}
      />
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
      <div className="container px-8 lg:px-0">
        <Price title={priceT('title')} description={priceT('description')} tiers={priceTiers} />
      </div>
    </>
  )
}
