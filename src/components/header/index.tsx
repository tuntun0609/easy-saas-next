'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { LangSwitch } from '../lang-switch'
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
        <LangSwitch />
        <ThemeToggle />
        <Button>{t('LoginIn')}</Button>
      </div>
    </header>
  )
}
