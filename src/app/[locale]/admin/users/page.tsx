import { headers } from 'next/headers'
import { getTranslations } from 'next-intl/server'

import { auth, isAdmin } from '@/lib/auth'
import { User } from '@/type/user'

import { columns } from './columns'
import { DataTable } from './data-table'

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const { page = 1 } = await searchParams
  const pageSize = 10
  const currentPage = Number(page)
  const t = await getTranslations('Admin.UsersManagement')

  const { users, total } = await auth.api.listUsers({
    headers: await headers(),
    query: {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    },
  })

  users.forEach(user => {
    if (isAdmin(user as User)) {
      user.role = 'admin'
    }
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">{t('title')}</h1>
      <DataTable
        columns={columns}
        data={users}
        pageCount={Math.ceil(total / pageSize)}
        currentPage={currentPage}
      />
    </div>
  )
}
