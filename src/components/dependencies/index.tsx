import { useTranslations } from 'next-intl'

import { Dependencies as DependenciesBlock } from '@/components/blocks/dependencies'

export const Dependencies = () => {
  const t = useTranslations('Dependencies')
  return (
    <div id="dependencies" className="mx-auto mt-12 max-w-3xl px-8 lg:px-0">
      <DependenciesBlock
        title={t('title')}
        description={t('description')}
        dependencies={[
          { name: 'Nextjs', image: '/icon/nextjs-light.svg', darkImage: '/icon/nextjs-dark.svg' },
          { name: 'React', image: '/icon/react.svg' },
          { name: 'Tailwindcss', image: '/icon/tailwindcss.svg' },
          {
            name: 'shadcn/ui',
            image: '/icon/shadcn-light.svg',
            width: 28,
            height: 28,
            darkImage: '/icon/shadcn-dark.svg',
          },
          {
            name: 'better-auth',
            image: '/icon/better-auth-light.svg',
            darkImage: '/icon/better-auth-dark.svg',
          },
          {
            name: 'drizzle-orm',
            image: '/icon/drizzle-light.svg',
            darkImage: '/icon/drizzle-dark.svg',
          },
          {
            name: 'postgresql',
            image: '/icon/postgresql.svg',
            width: 28,
            height: 28,
          },
        ]}
      />
    </div>
  )
}
