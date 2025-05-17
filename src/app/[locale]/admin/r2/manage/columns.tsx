'use client'

import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Messages, useTranslations } from 'next-intl'

import { formatBytes } from '@/lib/utils'

import { ActionsCell } from './actions-cell'
import { R2Object } from './page'

// 配置 dayjs 插件
dayjs.extend(utc)
dayjs.extend(timezone)

type ColumnsTranslationKey = keyof Messages['Admin']['R2Management']['columns']

const HeaderCell = ({ translationKey }: { translationKey: ColumnsTranslationKey }) => {
  const t = useTranslations('Admin.R2Management.columns')
  return t(translationKey)
}

export const columns: ColumnDef<R2Object>[] = [
  {
    accessorKey: 'key',
    header: () => <HeaderCell translationKey="key" />,
  },
  {
    accessorKey: 'size',
    header: () => <HeaderCell translationKey="size" />,
    cell: ({ row }) => formatBytes(row.original.size),
  },
  {
    accessorKey: 'uploaded',
    header: () => <HeaderCell translationKey="uploaded" />,
    cell: ({ row }) => dayjs(row.original.uploaded).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm'),
  },
  {
    accessorKey: 'mimeType',
    header: () => <HeaderCell translationKey="mimeType" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionsCell object={row.original} />
      </div>
    ),
  },
]
