'use client'

import { CSSProperties } from 'react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { PriceTier, Price as PriceCmp } from '../blocks/pricing'

export const Pricing = ({ className, style }: { className?: string; style?: CSSProperties }) => {
  const t = useTranslations('Pricing')
  const priceTiers: PriceTier[] = [
    {
      id: 'free',
      name: t('free.name'),
      description: t('free.description'),
      price: 0,
      features: [
        { name: t('features.tutorials'), included: true },
        { name: t('features.basicComponents'), included: false },
        { name: t('features.communitySupport'), included: false },
        { name: t('features.fullSourceCode'), included: false },
        { name: t('features.advancedComponents'), included: false },
        { name: t('features.prioritySupport'), included: false },
        { name: t('features.customService'), included: false },
      ],
      buttonText: t('free.buttonText'),
      onButtonClick: () => console.log('免费版点击'),
    },
    {
      id: 'standard',
      name: t('standard.name'),
      description: t('standard.description'),
      price: 9.9,
      features: [
        { name: t('features.tutorials'), included: true },
        { name: t('features.basicComponents'), included: true },
        { name: t('features.communitySupport'), included: true },
        { name: t('features.fullSourceCode'), included: true },
        { name: t('features.advancedComponents'), included: false },
        { name: t('features.prioritySupport'), included: false },
        { name: t('features.customService'), included: false },
      ],
      buttonText: t('standard.buttonText'),
      popular: true,
      popularText: t('standard.popularText'),
      onButtonClick: () => console.log('标准版点击'),
    },
    {
      id: 'premium',
      name: t('premium.name'),
      description: t('premium.description'),
      price: t('premium.price'),
      currency: '',
      features: [
        { name: t('features.tutorials'), included: true },
        { name: t('features.basicComponents'), included: true },
        { name: t('features.communitySupport'), included: true },
        { name: t('features.fullSourceCode'), included: true },
        { name: t('features.advancedComponents'), included: true },
        { name: t('features.prioritySupport'), included: true },
        { name: t('features.customService'), included: true },
      ],
      buttonText: t('premium.buttonText'),
      onButtonClick: () => console.log('高级版点击'),
    },
  ]
  return (
    <div className={cn('container px-8 lg:px-0', className)} style={style}>
      <PriceCmp title={t('title')} description={t('description')} tiers={priceTiers} />
    </div>
  )
}
