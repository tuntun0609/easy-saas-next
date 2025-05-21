'use client'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { LocaleSwitch } from './blocks/locale-switch'
import { UserButton } from './blocks/user-button'
import { Logo } from './logo'
import ThemeToggle from './theme/theme-toggle'

export const HeroHeader = () => {
  const [menuState, setMenuState] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const t = useTranslations('Header')

  /**
   * label: 标题
   * link: 链接
   * render: 渲染内容，如果设置则忽略 link 和 label
   */
  const menuItems: {
    name: string
    href: string
    openInNewTab?: boolean
  }[] = [
    {
      name: t('docs'),
      href: '/docs',
    },
    {
      name: t('blog'),
      href: '/blog',
    },
    {
      name: t('pricing'),
      href: '/pricing',
    },
    {
      name: t('about'),
      href: '/about',
    },
    {
      name: 'Github',
      href: 'https://github.com/tuntun0609/easy-saas-next',
      openInNewTab: true,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <nav data-state={menuState && 'active'} className="fixed z-20 w-full px-2">
        <div
          className={cn(
            'mx-auto mt-2 max-w-full px-4 transition-all duration-300 lg:px-8',
            isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Logo />
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      target={item.openInNewTab ? '_blank' : '_self'}
                      rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <div className="flex items-center justify-between">
                  <LocaleSwitch />
                  <ThemeToggle />
                </div>
                <UserButton
                  onClickSignIn={() => {
                    setMenuState(false)
                  }}
                  className="hidden sm:block"
                />
                <UserButton
                  onClickSignIn={() => {
                    setMenuState(false)
                  }}
                  showName
                  size="large"
                  className="block rounded-sm border sm:hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
