'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { LocaleSwitch } from '../locale-switch'
import ThemeToggle from '../theme/theme-toggle'
import { Button } from '../ui/button'

export const Header = () => {
  const t = useTranslations('HomePage')

  return (
    <header className="flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Link href="/">Easy Saas Next</Link>
      </div>

      <div className="flex items-center gap-4">
        <LocaleSwitch />
        <ThemeToggle />
        <Button>{t('loginIn')}</Button>
      </div>
    </header>
  )
}
