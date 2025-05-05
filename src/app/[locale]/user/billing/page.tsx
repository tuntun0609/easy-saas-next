import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'

import { Skeleton } from '@/components/ui/skeleton'

import BillingTable from './table'

export default async function Billing({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const t = await getTranslations()
  const { page } = await searchParams

  const pageNumber = parseInt(page || '1')
  const pageSize = 10

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-2xl font-bold">{t('user.billing')}</h1>

      <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
        <BillingTable page={pageNumber} pageSize={pageSize} />
      </Suspense>
    </div>
  )
}
