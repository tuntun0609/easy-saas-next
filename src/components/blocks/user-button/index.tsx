'use client'

import { CSSProperties } from 'react'
import { ChevronsUpDown, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

import { Button } from '../../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { useUser } from '../../user-provider'

const avatarFallbackUrl = '/icon/avatar.svg'

export const UserButton = ({
  className,
  style,
  imageSize = 32,
  showName = false,
  size = 'default',
}: {
  className?: string
  style?: CSSProperties
  imageSize?: number
  showName?: boolean
  size?: 'default' | 'large'
}) => {
  const t = useTranslations('Header')
  const pathname = usePathname()
  const router = useRouter()
  const {
    data: session,
    isPending, //loading state
    error, //error object
    // refetch, //refetch the session
  } = useUser()

  const handleLogout = async () => {
    await authClient.signOut()
    // 重新验证页面
    router.refresh()
  }

  if (isPending) {
    return (
      <Button
        variant="ghost"
        style={style}
        className={cn(className, size === 'large' && 'h-12 w-full')}
      >
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
          {size === 'default' ? (
            <Button variant="ghost" style={style} className={cn(className, 'p-0')}>
              {session.user.image && (
                <img
                  className="rounded-full"
                  src={session.user.image ?? ''}
                  alt="user"
                  width={imageSize}
                  height={imageSize}
                  onError={e => {
                    e.currentTarget.src = avatarFallbackUrl
                  }}
                />
              )}
              {showName && <span className="text-sm">{session.user.name}</span>}
            </Button>
          ) : (
            <Button
              variant="ghost"
              style={style}
              className={cn(className, 'h-12 w-full justify-between hover:bg-gray-200')}
            >
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <img
                    className="rounded-full"
                    src={session.user.image ?? ''}
                    alt="user"
                    width={imageSize}
                    height={imageSize}
                    onError={e => {
                      e.currentTarget.src = avatarFallbackUrl
                    }}
                  />
                )}
                {<span className="text-sm font-bold">{session.user.name}</span>}
              </div>
              <ChevronsUpDown />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <div className="border-b p-2">
            <div className="flex items-center gap-2">
              {session.user.image && (
                <img
                  className="rounded-full"
                  src={session.user.image ?? ''}
                  alt="user"
                  width={imageSize}
                  height={imageSize}
                  onError={e => {
                    e.currentTarget.src = avatarFallbackUrl
                  }}
                />
              )}
              {<span className="text-sm font-bold">{session.user.name}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-2 p-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut />
              {t('logout')}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Link
      className={cn(className, size === 'large' && 'w-full')}
      href={pathname === '/' ? '/login' : `/login?callbackURL=${encodeURIComponent(pathname)}`}
    >
      <Button
        variant="outline"
        className={cn(className, size === 'large' && 'h-12 w-full')}
        style={style}
      >
        {t('loginIn')}
      </Button>
    </Link>
  )
}
