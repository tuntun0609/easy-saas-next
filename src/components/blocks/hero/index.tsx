import { ComponentProps, ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Button } from '../../ui/button'

export interface HeroProps {
  title: ReactNode
  description: ReactNode
  announcement?: {
    text: ReactNode
    props?: ComponentProps<typeof Link>
  }
  buttons?: {
    text: ReactNode
    href: string
    props?: ComponentProps<typeof Button>
  }[]
}

export const Hero = ({ title, description, announcement, buttons }: HeroProps) => {
  return (
    <section className="container py-16 lg:py-24">
      <div className="flex flex-col items-center justify-center">
        {announcement && (
          <Link
            prefetch={false}
            {...announcement.props}
            href={announcement.props?.href ?? ''}
            className={cn(
              'border-primary/30 rounded-full border px-4 py-1 text-sm',
              announcement.props?.className
            )}
          >
            {announcement.text}
          </Link>
        )}
        <h1 className="m-6 text-center text-4xl leading-normal font-bold lg:m-12 lg:mt-6 lg:text-6xl">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-xl text-center text-lg leading-tight lg:max-w-2xl">
          {description}
        </p>
        <div className="mt-8 flex gap-2">
          {buttons?.map((button, index) => (
            <Link prefetch={false} key={index} href={button.href}>
              <Button {...button.props}>{button.text}</Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
