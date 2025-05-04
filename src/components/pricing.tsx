'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { createCheckoutSession } from '@/service/creem'

export default function Pricing() {
  const t = useTranslations('pricing')
  const [isLoading, setIsLoading] = useState(false)

  const handleProClick = async () => {
    try {
      setIsLoading(true)
      const productId = process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID as string
      if (!productId) {
        toast.error(t('error'))
        throw new Error('Product ID is not set')
      }
      const { checkoutUrl } = await createCheckoutSession(productId)
      // 跳转至付款页面
      const newWindow = window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
      if (newWindow) {
        newWindow.opener = null
      }
    } catch (error) {
      toast.error(t('error'))
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">{t('title')}</h1>
          <p>{t('description')}</p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
          <div className="flex flex-col justify-between space-y-8 rounded-(--radius) border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
            <div className="space-y-4">
              <div>
                <h2 className="font-medium">{t('free.name')}</h2>
                <span className="my-3 block text-2xl font-semibold">$0</span>
                <p className="text-muted-foreground text-sm">{t('free.per')}</p>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href="">{t('free.getStarted')}</Link>
              </Button>

              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[t('free.videoTutorial'), t('free.docs')].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dark:bg-muted rounded-(--radius) border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium">{t('pro.name')}</h2>
                  <span className="my-3 block text-2xl font-semibold">$29.9</span>
                  <p className="text-muted-foreground text-sm">{t('pro.per')}</p>
                </div>

                <Button disabled={isLoading} className="w-full" onClick={handleProClick}>
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : t('pro.getStarted')}
                </Button>
              </div>

              <div>
                <div className="text-sm font-medium">{t('pro.everythingInPro')}</div>

                <ul className="mt-4 list-outside space-y-3 text-sm">
                  {[
                    t('pro.everythingInFree'),
                    t('pro.sourceCode'),
                    t('pro.group'),
                    t('pro.support'),
                    t('pro.update'),
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
