'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { LocaleSwitch } from '../locale-switch'
import ThemeToggle from '../theme/theme-toggle'
import { Button } from '../ui/button'

export const Header = () => {
  const t = useTranslations('Header')

  return (
    <header className="flex h-16 items-center justify-between px-4">
      <div className="flex items-center">
        <Link
          style={{
            fontFamily: 'var(--font-caveat)',
          }}
          className="mr-4 ml-2 text-3xl font-bold text-purple-600 lg:mx-4"
          href="/"
        >
          Easy Saas Next
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          <Link prefetch={false} href="/docs">
            <Button variant="ghost">{t('docs')}</Button>
          </Link>
          <Link prefetch={false} href="/">
            <Button variant="ghost">{t('pricing')}</Button>
          </Link>
          <Link prefetch={false} href="/">
            <Button variant="ghost">{t('about')}</Button>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <LocaleSwitch className="hidden lg:flex" />
        <ThemeToggle className="hidden lg:flex" />
        <Button className="hidden lg:block">{t('loginIn')}</Button>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant="outline" className="cursor-pointer lg:hidden" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">openMenu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent aria-describedby="drawer-right-description" className="h-full">
            <DrawerHeader className="flex flex-row items-center justify-between">
              <DrawerTitle className="ml-4 flex items-center text-xl font-bold">
                Easy Saas Next
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                  <span className="sr-only">closeMenu</span>
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <DrawerDescription />
            <nav className="flex flex-col gap-4 px-6 py-4 font-bold">
              <Link
                prefetch={false}
                className="hover:text-primary/70 flex items-center gap-2 transition-colors duration-300"
                href="/docs"
              >
                {t('docs')}
              </Link>
              <Link
                prefetch={false}
                className="hover:text-primary/70 flex items-center gap-2 transition-colors duration-300"
                href="/"
              >
                {t('pricing')}
              </Link>
              <Link
                prefetch={false}
                className="hover:text-primary/70 flex items-center gap-2 transition-colors duration-300"
                href="/"
              >
                {t('about')}
              </Link>
            </nav>
            <DrawerFooter className="gap-4">
              <div className="flex items-center justify-between">
                <LocaleSwitch />
                <ThemeToggle />
              </div>
              <Button>{t('loginIn')}</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}
