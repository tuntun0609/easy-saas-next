import { ComponentProps, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { AnimatedGroup } from '@/components/ui/animated-group'

import { Button } from '../../ui/button'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

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
          <AnimatedGroup variants={transitionVariants}>
            <Link
              href="#link"
              className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
            >
              <span className="text-foreground text-sm">{announcement.text}</span>
              <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

              <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                </div>
              </div>
            </Link>
          </AnimatedGroup>
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
