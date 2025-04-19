import { count } from 'drizzle-orm'

import { db } from '@/db'
import { user } from '@/db/schema'

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

  // 获取总用户数
  const [{ value: total }] = await db.select({ value: count() }).from(user)

  // 获取当前页用户列表
  const users = await db
    .select()
    .from(user)
    .limit(pageSize)
    .offset((currentPage - 1) * pageSize)

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">用户管理</h1>
      <DataTable
        columns={columns}
        data={users}
        pageCount={Math.ceil(total / pageSize)}
        currentPage={currentPage}
      />
    </div>
  )
}
