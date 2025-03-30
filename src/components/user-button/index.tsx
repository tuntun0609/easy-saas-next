import { CSSProperties } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useUser } from '../user-provider'

export const UserButton = ({ className, style }: { className?: string; style?: CSSProperties }) => {
  const t = useTranslations('Header')
  const {
    data: session,
    isPending, //loading state
    error, //error object
    // refetch, //refetch the session
  } = useUser()

  const handleLogout = async () => {
    await authClient.signOut()
  }

  if (isPending) {
    return <Button>{t('pending')}</Button>
  }

  if (error) {
    toast.error(t('authError'), {
      position: 'top-center',
      duration: 3000,
      closeButton: true,
    })
  }

  if (session) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          {session.user.image ? (
            <Button variant="ghost" className="p-0">
              <img
                className="rounded-full"
                src={session.user.image ?? ''}
                alt="user"
                width={32}
                height={32}
              />
            </Button>
          ) : (
            <Button variant="ghost">{session.user.name}</Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2">
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              {t('logout')}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Link href="/login">
      <Button className={cn(className)} style={style}>
        {t('loginIn')}
      </Button>
    </Link>
  )
}
