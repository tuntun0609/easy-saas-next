import { ReactNode } from 'react'
import Link from 'next/link'

export interface HeroProps {
  title: ReactNode
  description: ReactNode
  announcement?: ReactNode
  announcementLink?: string
}

export const Hero = ({ title, description, announcement, announcementLink }: HeroProps) => {
  return (
    <section className="container py-16 lg:py-24">
      <div className="flex flex-col items-center justify-center">
        {announcement && (
          <Link
            href={announcementLink ?? ''}
            className="border-primary/50 rounded-full border px-4 py-1 text-sm"
          >
            {announcement}
          </Link>
        )}
        <h1 className="m-6 text-center text-4xl leading-relaxed font-bold lg:m-12 lg:mt-6 lg:text-6xl">
          {title}
        </h1>
        <p className="text-muted-foreground text-center text-lg leading-tight">{description}</p>
      </div>
    </section>
  )
}
