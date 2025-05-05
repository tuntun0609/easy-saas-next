import dayjs from 'dayjs'
import { desc, eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/db'
import { oneTimePurchase } from '@/db/order-schema'
import { auth } from '@/lib/auth'

import CustomerPortalButton from './customer-portal-button'

export default async function BillingTable({ page, pageSize }: { page: number; pageSize: number }) {
  const t = await getTranslations()
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })
  if (!session?.user?.id) {
    return null
  }

  if (!session?.user?.id) {
    return null
  }

  // 使用 drizzle 获取账单数据
  const bills = await db
    .select()
    .from(oneTimePurchase)
    .where(eq(oneTimePurchase.userId, session.user.id))
    .orderBy(desc(oneTimePurchase.createdAt))
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  // 获取总记录数用于分页
  const totalCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(oneTimePurchase)
    .where(eq(oneTimePurchase.userId, session.user.id))
    .then((res: { count: number }[]) => Number(res[0].count))

  const pagination = {
    totalPages: Math.ceil(totalCount / pageSize),
  }
  return (
    <div className="space-y-4">
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-foreground/70 p-4 font-semibold">
                {t('user.billingPage.billId')}
              </TableHead>
              <TableHead className="text-foreground/70 p-4 font-semibold">
                {t('user.billingPage.productId')}
              </TableHead>
              <TableHead className="text-foreground/70 p-4 font-semibold">
                {t('user.billingPage.createdAt')}
              </TableHead>
              <TableHead className="text-foreground/70 p-4 font-semibold">
                {t('user.billingPage.actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map(bill => (
              <TableRow key={bill.id} className="border-muted hover:bg-muted/50">
                <TableCell className="p-4">{bill.id}</TableCell>
                <TableCell className="p-4">{bill.productId}</TableCell>
                <TableCell className="p-4">
                  {dayjs(bill.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </TableCell>
                <TableCell className="p-4">
                  <CustomerPortalButton providerCustomerId={bill.providerCustomerId} />
                </TableCell>
              </TableRow>
            ))}
            {bills.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-muted-foreground h-32 text-center">
                  {t('components.dataTable.noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-muted-foreground text-sm">
          {t('components.dataTable.page', { page: page, total: pagination.totalPages })}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            asChild
            className="hover:bg-muted"
          >
            <Link href={`?page=${page - 1}`}>{t('components.dataTable.previousPage')}</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= pagination.totalPages}
            asChild
            className="hover:bg-muted"
          >
            <Link href={`?page=${page + 1}`}>{t('components.dataTable.nextPage')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
