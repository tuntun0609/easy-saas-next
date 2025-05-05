import type { ImgHTMLAttributes } from 'react'
import { createElement } from 'react'
import { loader } from 'fumadocs-core/source'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import fumaDefaultMdxComponents from 'fumadocs-ui/mdx'
import { isNil } from 'lodash-es'
import { icons } from 'lucide-react'
import { Locale } from 'next-intl'

import { Mermaid } from '@/components/blocks/mermaid'
import { blog, docs, pages } from '@source'

import { i18nDocsConfig, routing } from '../i18n/routing'

const iconLoader = (icon: string | undefined) => {
  if (!icon) {
    return <></>
  }

  if (icon in icons) {
    return createElement(icons[icon as keyof typeof icons])
  }

  return <></>
}

export const docsSource = loader({
  i18n: i18nDocsConfig,
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon: iconLoader,
  pageTree: {
    attachFile(node, file) {
      if (!file) {
        return node
      }

      const data = file.data.data

      if (data.private) {
        node.name = (
          <>
            {node.name}
            <span className="bg-primary py-0.2 inline-block rounded-md px-2 text-xs text-white">
              Pro
            </span>
          </>
        )
      }

      return node
    },
  },
})

export const blogSource = loader({
  i18n: i18nDocsConfig,
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
  icon: iconLoader,
})

// 从文件名中提取语言代码
const getLanguageFromFilename = (filename: string): string | null => {
  const match = filename.match(/\.([a-z]{2})\.mdx?$/i)
  return match ? match[1] : null
}

export const getPageSource = (slug: string, locale?: Locale) => {
  const defaultLocale = routing.defaultLocale

  // 找到所有匹配 slug 的页面
  const matchedPages = pages.filter(page => page.slug === slug)

  if (matchedPages.length === 0) {
    return null
  }

  if (locale) {
    // 1. 首先尝试匹配显式设置的 lang
    const explicitLangPage = matchedPages.find(page => page.lang === locale)
    if (explicitLangPage) {
      return explicitLangPage
    }

    // 2. 然后尝试匹配文件名中的语言
    const filenameLangPage = matchedPages.find(page => {
      const filenameLocale = getLanguageFromFilename(page._file.path)
      return filenameLocale === locale
    })
    if (filenameLangPage) {
      return filenameLangPage
    }
  }

  // 如果没有找到对应语言的页面，按以下优先级返回：
  // 1. 显式设置默认语言的页面
  // 2. 文件名包含默认语言的页面
  // 3. 没有语言标识的页面
  // 4. 第一个找到的页面
  return (
    matchedPages.find(page => page.lang === defaultLocale) ||
    matchedPages.find(page => getLanguageFromFilename(page._file.path) === defaultLocale) ||
    matchedPages.find(page => isNil(page.lang) && !getLanguageFromFilename(page._file.path)) ||
    matchedPages[0]
  )
}

export const defaultMdxComponents = {
  ...fumaDefaultMdxComponents,
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => <ImageZoom {...(props as any)} />,
  Mermaid,
}
