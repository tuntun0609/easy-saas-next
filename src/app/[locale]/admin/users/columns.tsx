'use client'

import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { MoreHorizontal, UserX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Messages, useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { deleteUser } from '@/service/user'

// 配置 dayjs 插件
dayjs.extend(utc)
dayjs.extend(timezone)

export type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
}

const ActionsCell = ({ user }: { user: User }) => {
  const router = useRouter()
  const t = useTranslations('Admin.UsersManagement.columns')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 px-1 py-2">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className="flex items-center justify-start text-red-600 hover:text-red-700"
            onClick={async () => {
              if (confirm(t('deleteConfirm'))) {
                try {
                  await deleteUser(user.id)
                  toast.success(t('deleteSuccess'))
                  router.refresh()
                } catch (_error) {
                  toast.error(t('deleteError'))
                }
              }
            }}
          >
            <UserX className="mr-2 h-4 w-4" />
            {t('deleteUser')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

type ColumnsTranslationKey = keyof Messages['Admin']['UsersManagement']['columns']

const HeaderCell = ({ translationKey }: { translationKey: ColumnsTranslationKey }) => {
  const t = useTranslations('Admin.UsersManagement.columns')
  return t(translationKey)
}

const EmailVerifiedCell = ({ verified }: { verified: boolean }) => {
  const t = useTranslations('Admin.UsersManagement.columns')
  return (
    <div className={verified ? 'text-green-600' : 'text-red-600'}>
      {verified ? t('verified') : t('unverified')}
    </div>
  )
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: () => <HeaderCell translationKey="name" />,
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
