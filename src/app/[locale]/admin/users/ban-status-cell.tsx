import { UserWithRole } from 'better-auth/plugins'
import dayjs from 'dayjs'
import { Ban } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// 封禁状态
export const BanStatusCell = ({ user }: { user: UserWithRole }) => {
  const t = useTranslations('Admin.UsersManagement.columns')

  if (!user.banned)
    return <div className="text-green-500 dark:text-green-400">{t('notBanned')}</div>

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline-flex cursor-pointer items-center gap-1 text-red-500">
          <Ban className="h-4 w-4" />
          {t('banned')}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('banDetails')}</DialogTitle>
          <DialogDescription>{t('banDetailsDescription')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <div className="mb-2 font-medium text-gray-700 dark:text-gray-200">
              {t('banReason')}:
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {user.banReason || t('noReason')}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 font-medium text-gray-700 dark:text-gray-200">
              {t('banExpires')}:
            </div>
            {user.banExpires ? (
              <div className="text-gray-600 dark:text-gray-300">
                {dayjs(user.banExpires).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm')}
              </div>
            ) : (
              <div className="font-medium text-red-500 dark:text-red-400">{t('permanentBan')}</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
