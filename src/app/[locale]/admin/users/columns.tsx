'use client'

import { ColumnDef } from '@tanstack/react-table'
import { UserWithRole } from 'better-auth/plugins'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Shield } from 'lucide-react'
import { Messages, useTranslations } from 'next-intl'

import { ActionsCell } from './actions-cell'
import { BanStatusCell } from './ban-status-cell'

// 配置 dayjs 插件
dayjs.extend(utc)
dayjs.extend(timezone)

type ColumnsTranslationKey = keyof Messages['Admin']['UsersManagement']['columns']

const HeaderCell = ({ translationKey }: { translationKey: ColumnsTranslationKey }) => {
  const t = useTranslations('Admin.UsersManagement.columns')
  return t(translationKey)
}

const AdminBadge = () => {
  const t = useTranslations('Admin.UsersManagement.columns')
  return (
    <div className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">
      <Shield className="h-3 w-3" />
      {t('admin')}
    </div>
  )
}

// 邮箱验证状态
const EmailVerifiedCell = ({ verified }: { verified: boolean }) => {
  const t = useTranslations('Admin.UsersManagement.columns')
  return (
    <div
      className={verified ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}
    >
      {verified ? t('verified') : t('unverified')}
    </div>
  )
}

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: 'name',
    header: () => <HeaderCell translationKey="name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.name}
        {row.original.role === 'admin' && <AdminBadge />}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: () => <HeaderCell translationKey="email" />,
  },
  {
    accessorKey: 'emailVerified',
    header: () => <HeaderCell translationKey="emailVerified" />,
    cell: ({ row }) => <EmailVerifiedCell verified={row.original.emailVerified} />,
  },
  {
    accessorKey: 'banned',
    header: () => <HeaderCell translationKey="banStatus" />,
    cell: ({ row }) => <BanStatusCell user={row.original} />,
  },
  {
    accessorKey: 'createdAt',
    header: () => <HeaderCell translationKey="createdAt" />,
    cell: ({ row }) =>
      dayjs(row.original.createdAt).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm'),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionsCell user={row.original} />
      </div>
    ),
  },
]
