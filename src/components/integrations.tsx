import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/config'

export default function IntegrationsSection() {
  const t = useTranslations('integrations')

  return (
    <section id="integrations">
      <div className="py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-balance md:text-4xl">{t('title')}</h2>
            <p className="text-muted-foreground mt-6">{t('description')}</p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              link={`https://nextjs.org/?ref=${siteConfig.siteUrl}`}
              title="Nextjs"
              description={t('nextjs')}
            >
              <Image
                className="dark:hidden"
                src="/icon/nextjs-light.svg"
                alt="Nextjs"
                width={40}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/icon/nextjs-dark.svg"
                alt="Nextjs"
                width={40}
                height={40}
              />
            </IntegrationCard>

            <IntegrationCard
              link={`https://react.dev/?ref=${siteConfig.siteUrl}`}
              title="React"
              description={t('react')}
            >
              <Image src="/icon/React.svg" alt="React" width={40} height={40} />
            </IntegrationCard>

            <IntegrationCard
              link={`https://tailwindcss.com/?ref=${siteConfig.siteUrl}`}
              title="Tailwind CSS"
              description={t('tailwind')}
            >
              <Image src="/icon/tailwindcss.svg" alt="Tailwind CSS" width={40} height={40} />
            </IntegrationCard>

            <IntegrationCard
              link={`https://ui.shadcn.com/?ref=${siteConfig.siteUrl}`}
              title="shadcn/ui"
              description={t('shadcn')}
            >
              <Image
                className="dark:hidden"
                src="/icon/shadcn-light.svg"
                alt="shadcn/ui"
                width={28}
                height={28}
              />
              <Image
                className="hidden dark:block"
                src="/icon/shadcn-dark.svg"
                alt="shadcn/ui"
                width={28}
                height={28}
              />
            </IntegrationCard>

            <IntegrationCard
              link={`https://www.better-auth.com/?ref=${siteConfig.siteUrl}`}
              title="better-auth"
              description={t('better-auth')}
            >
              <Image
                className="dark:hidden"
                src="/icon/better-auth-light.svg"
                alt="better-auth"
                width={40}
                height={40}
              />
              <Image
                className="hidden rounded-full dark:block"
                src="/icon/better-auth-dark.svg"
                alt="better-auth"
                width={40}
                height={40}
              />
            </IntegrationCard>

            <IntegrationCard
              link={`https://www.postgresql.org/?ref=${siteConfig.siteUrl}`}
              title="postgresql"
              description={t('postgresql')}
            >
              <Image src="/icon/postgresql.svg" alt="postgresql" width={32} height={33} />
            </IntegrationCard>
          </div>
        </div>
      </div>
    </section>
  )
}

const IntegrationCard = ({
  title,
  description,
  children,
  link = 'https://github.com/meschacirung/cnblocks',
}: {
  title: string
  description: string
  children: React.ReactNode
  link?: string
}) => {
  const t = useTranslations('integrations')
  return (
    <Card className="p-6">
      <div className="relative">
        <div className="flex h-10 items-center justify-start">{children}</div>

        <div className="space-y-2 py-6">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button asChild variant="secondary" size="sm" className="gap-1 pr-2 shadow-none">
            <Link href={link}>
              {t('learnMore')}
              <ChevronRight className="ml-0 !size-3.5 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
