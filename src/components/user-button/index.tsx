'use client'

import { CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useUser } from '../user-provider'

export const UserButton = ({
  className,
  style,
  imageSize = 32,
  showName = false,
}: {
  className?: string
  style?: CSSProperties
  imageSize?: number
  showName?: boolean
}) => {
  const t = useTranslations('Header')
  const pathname = usePathname()
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
    return (
      <Button variant="ghost" style={style} className={cn(className)}>
        {t('pending')}
      </Button>
    )
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
            <Button variant="ghost" style={style} className={cn(className, 'p-0')}>
              <img
                className="rounded-full"
                src={session.user.image ?? ''}
                alt="user"
                width={imageSize}
                height={imageSize}
              />
              {showName && <span className="text-sm">{session.user.name}</span>}
            </Button>
          ) : (
            <Button variant="ghost" style={style} className={cn(className)}>
              {session.user.name}
            </Button>
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
    <Link href={pathname === '/' ? '/login' : `/login?callbackURL=${encodeURIComponent(pathname)}`}>
      <Button className={cn(className)} style={style}>
        {t('loginIn')}
      </Button>
    </Link>
  )
}
