'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { LocaleSwitch } from '../locale-switch'
import ThemeToggle from '../theme/theme-toggle'
import { Button } from '../ui/button'

export const Header = () => {
  const t = useTranslations('Header')

  return (
    <header className="flex h-16 items-center justify-between px-4">
      <div className="flex items-center">
        <Link className="mr-4 font-bold" href="/">
          Easy Saas Next
        </Link>
        <nav className="flex items-center gap-1">
          <Link href="/docs">
            <Button variant="ghost" className="cursor-pointer">
              {t('docs')}
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="cursor-pointer">
              {t('pricing')}
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="cursor-pointer">
              {t('about')}
            </Button>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <LocaleSwitch />
        <ThemeToggle />
        <Button>{t('loginIn')}</Button>
      </div>
    </header>
  )
}
