'use client'

import { CSSProperties, FC, ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface NavItem {
  label: ReactNode
  href?: string
}

// 定义页脚组件属性
interface FooterProps {
  logo?: ReactNode
  slogan?: string
  navItems?: NavItem[][]
  socialMedia?: NavItem[]
  copyright?: ReactNode
  privacyPolicy?: NavItem
  terms?: NavItem
  className?: string
  style?: CSSProperties
}

const NavItem = ({ children, href }: { children: ReactNode; href?: string }) => {
  const isExternalLink = href?.startsWith('http')
  return href ? (
    <Link
      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      {...(isExternalLink && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      href={href}
    >
      {children}
    </Link>
  ) : (
    <span className="text-gray-600 dark:text-gray-400">{children}</span>
  )
}

export const Footer: FC<FooterProps> = ({
  logo,
  slogan,
  navItems,
  socialMedia,
  copyright,
  privacyPolicy,
  terms,
  className,
  style,
}) => {
  return (
    <footer className={cn('w-full', className)} style={style}>
      <div className="mb-8 flex flex-col items-start justify-between px-8 lg:flex-row">
        {/* 左侧Logo、标语和社交媒体 */}
        <div className="mb-6 lg:mb-0">
          {logo}
          {slogan && <p className="mt-2 text-gray-600 dark:text-gray-400">{slogan}</p>}

          {/* 社交媒体链接 */}
          {socialMedia && socialMedia.length > 0 && (
            <div className="mt-6">
              <ul className="flex space-x-4">
                {socialMedia.map((item, index) => (
                  <li key={`social-${index}`}>
                    <NavItem href={item.href}>{item.label}</NavItem>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 导航链接 */}
        <div className="flex flex-col gap-8 lg:flex-row lg:flex-wrap">
          {navItems?.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} className="min-w-32">
              <ul className="space-y-2">
                {section.map((item, index) => (
                  <li key={`nav-${sectionIndex}-${index}`}>
                    <NavItem href={item.href}>{item.label}</NavItem>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 页脚底部部分 */}
      <div className="flex flex-col items-center justify-between border-t border-gray-200 px-8 py-6 lg:flex-row dark:border-gray-800">
        {/* 版权信息 */}
        <div className="text-sm text-gray-600 dark:text-gray-400">{copyright}</div>

        {/* 隐私政策链接 */}
        <div className="mt-4 flex space-x-4 lg:mt-0">
          {privacyPolicy && <NavItem href={privacyPolicy.href}>{privacyPolicy.label}</NavItem>}
          {terms && <NavItem href={terms.href}>{terms.label}</NavItem>}
        </div>
      </div>
    </footer>
  )
}
