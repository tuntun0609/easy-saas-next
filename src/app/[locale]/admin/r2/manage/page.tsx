import { Suspense } from 'react'
import { sql } from 'drizzle-orm'
import { getTranslations } from 'next-intl/server'

import { db } from '@/db'
import { ossResources as ossResourcesTable } from '@/db/schema'

import { columns } from './columns'
import { DataTable } from './data-table'

export type R2Object = {
  key: string
  size: number
  uploaded: string
  url: string
  mimeType: string
}

export default async function R2ManagePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page = 1 } = await searchParams
  const pageSize = 10
  const currentPage = Number(page)
  const t = await getTranslations('Admin.R2Management')

  const [{ count: total }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(ossResourcesTable)

  const ossResources = await db.query.ossResources.findMany({
    columns: {
      fileName: true,
      fileSize: true,
      createdAt: true,
      url: true,
      mimeType: true,
    },
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
    orderBy: (ossResources, { desc }) => [desc(ossResources.createdAt)],
  })

  const data: R2Object[] = ossResources.map(resource => ({
    key: resource.fileName,
    size: resource.fileSize,
    uploaded: resource.createdAt.toISOString(),
    url: resource.url,
    mimeType: resource.mimeType,
  }))

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">{t('title')}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable<R2Object, any>
          columns={columns}
          data={data}
          pageCount={Math.ceil(total / pageSize)}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  )
}
