import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Footer as FooterBlock } from '@/components/blocks/footer'

export const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <FooterBlock
      className="mt-12"
      logo={
        <Link
          style={{
            fontFamily: 'var(--font-caveat)',
          }}
          className="text-3xl font-bold text-purple-600"
          href="/docs"
        >
          Easy Saas Next
        </Link>
      }
      slogan={t('slogan')}
      navItems={[
        [{ label: t('features'), href: '#pricing' }],
        [
          { label: t('docs'), href: '/docs' },
          { label: t('pricing'), href: '/pricing' },
          { label: t('about'), href: '/about' },
          { label: t('contact') },
        ],
      ]}
      socialMedia={[
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'BiliBili', href: 'https://www.bilibili.com' },
      ]}
      copyright={t('copyright', { year: new Date().getFullYear() })}
      privacyPolicy={{ label: t('privacyPolicy'), href: '/privacy' }}
    />
  )
}
