'use client'

import { ReactNode } from 'react'
import { Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type PriceFeature = {
  name: ReactNode
  included: boolean
}

export type PriceTier = {
  id: string
  name: ReactNode
  description?: ReactNode
  price: ReactNode
  currency?: ReactNode
  interval?: ReactNode
  features: PriceFeature[]
  buttonText: ReactNode
  popular?: boolean
  popularClassName?: string
  popularText?: string
  onButtonClick?: () => void
}

export type PriceProps = {
  title?: string
  description?: string
  tiers: PriceTier[]
  currency?: string
  className?: string
}

export const Price = ({
  title,
  description,
  tiers = [],
  currency = '¥',
  className,
}: PriceProps) => {
  return (
    <div className={cn('w-full space-y-6', className)}>
      <div className="space-y-2 text-center">
        {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {tiers.map(tier => (
          <Card
            key={tier.id}
            className={cn(
              'flex flex-col',
              tier.popular && 'border-primary relative overflow-hidden shadow-md'
            )}
          >
            {tier.popular && tier.popularText && (
              <div
                className={cn(
                  'bg-primary absolute top-0 right-0 rounded-bl-xl py-1 pr-2 pl-3 text-xs font-medium text-white',
                  tier.popularClassName
                )}
              >
                {tier.popularText}
              </div>
            )}
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              {tier.description && <CardDescription>{tier.description}</CardDescription>}
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {tier.currency ?? currency ?? '¥'}
                  {tier.price}
                </span>
                <span className="text-muted-foreground">
                  {tier.interval && <>/{tier.interval}</>}
                </span>
              </div>
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span className={cn(!feature.included && 'text-muted-foreground line-through')}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={tier.onButtonClick}
                className="w-full"
                variant={tier.popular ? 'default' : 'outline'}
              >
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
