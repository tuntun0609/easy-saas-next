'use client'

import { ReactNode } from 'react'
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

import { LocaleSwitch } from '../blocks/locale-switch'
import { UserButton } from '../blocks/user-button'
import ThemeToggle from '../theme/theme-toggle'
import { Button } from '../ui/button'

export const Header = () => {
  const t = useTranslations('Header')

  /**
   * label: 标题
   * link: 链接
   * render: 渲染内容，如果设置则忽略 link 和 label
   */
  const headerConfig: {
    label: ReactNode
    link?: string
    render?: ReactNode
  }[] = [
    {
      label: t('docs'),
      link: '/docs',
    },
    {
      label: t('blog'),
      link: '/blog',
    },
    {
      label: t('pricing'),
      link: '/pricing',
    },
    {
      label: t('about'),
      link: '/about',
    },
  ]

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-transparent px-4 backdrop-blur-sm">
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
          {headerConfig.map((item, index) => {
            if (item.render) {
              return item.render
            }
            if (item.link) {
              return (
                <Link key={index} prefetch={false} href={item.link}>
                  <Button variant="ghost">{item.label}</Button>
                </Link>
              )
            }
            return (
              <Button key={index} variant="ghost">
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <LocaleSwitch className="hidden lg:flex" />
        <ThemeToggle className="hidden lg:flex" />
        <UserButton className="hidden lg:flex" />
        <Drawer autoFocus={true} direction="right">
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
              {headerConfig.map((item, index) => {
                if (item.render) {
                  return item.render
                }
                if (item.link) {
                  return (
                    <DrawerClose asChild key={index}>
                      <Link
                        prefetch={false}
                        className="hover:text-primary/70 flex items-center gap-2 transition-colors duration-300"
                        href={item.link}
                      >
                        {item.label}
                      </Link>
                    </DrawerClose>
                  )
                }
                return (
                  <div
                    className="hover:text-primary/70 flex cursor-pointer items-center gap-2 transition-colors duration-300"
                    key={index}
                  >
                    {item.label}
                  </div>
                )
              })}
            </nav>
            <DrawerFooter className="gap-4">
              <div className="flex items-center justify-between">
                <LocaleSwitch />
                <ThemeToggle />
              </div>
              <UserButton size="large" showName />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}
