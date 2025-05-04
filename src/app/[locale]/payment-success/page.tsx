'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { SparklesText } from '@/components/magicui/sparkles-text'
import { Button } from '@/components/ui/button'

export default function PaymentSuccess() {
  const t = useTranslations('paymentSuccess')

  useEffect(() => {
    setTimeout(() => {
      // 左侧礼花
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        angle: 60,
      })

      // 右侧礼花
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        angle: 120,
      })
    }, 1000)
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <SparklesText className="text-5xl" sparklesCount={5}>
          {t('success')}
        </SparklesText>
        <p className="text-muted-foreground text-xl">{t('thanks')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button asChild size="lg" className="text-lg" variant="default">
          <Link href="/">
            {t('explore')} <ArrowRight className="ml-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
