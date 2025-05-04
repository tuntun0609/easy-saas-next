'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { getCustomerPortalUrl } from '@/service/creem'

export default function CustomerPortalButton({
  providerCustomerId,
}: {
  providerCustomerId: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations('user')

  const handleCustomerPortal = async () => {
    try {
      setIsLoading(true)
      const { url } = await getCustomerPortalUrl(providerCustomerId)
      if (url) {
        window.open(url, '_blank')
      }
    } catch (error) {
      toast.error('获取客户门户链接失败')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button variant="outline" size="sm" className="w-42" onClick={handleCustomerPortal}>
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {t('billingPage.customerPortal')}
    </Button>
  )
}
