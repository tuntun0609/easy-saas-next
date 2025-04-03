'use client'

import { useEffect, useState } from 'react'
import { DocsBody } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'

import { defaultMdxComponents, getPageSource } from '@/lib/source'
import { cn } from '@/lib/utils'

import { Mermaid } from '../blocks/mermaid'

import style from './index.module.css'

const SinglePage = ({ slug, className }: { slug: string; className?: string }) => {
  const locale = useLocale()
  const page = getPageSource(slug, locale)
  const { resolvedTheme } = useTheme()
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    setIsLight(resolvedTheme === 'light')
  }, [resolvedTheme])

  if (!page) notFound()

  const MDXContent = page.body

  return (
    <DocsBody className={cn(className, isLight && style.singlePage)}>
      <MDXContent
        components={{
          ...defaultMdxComponents,
          Mermaid,
        }}
      />
    </DocsBody>
  )
}

export default SinglePage
