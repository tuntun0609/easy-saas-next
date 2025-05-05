'use client'

import { ComponentProps, CSSProperties, useMemo } from 'react'
import { ChevronsUpDown, LogOut, User, CreditCard, LayoutDashboard } from 'lucide-react'
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
  popoverContentProps = {},
  onClickSignIn,
}: {
  className?: string
  style?: CSSProperties
  imageSize?: number
  showName?: boolean
  size?: 'default' | 'large'
  popoverContentProps?: ComponentProps<typeof PopoverContent>
  onClickSignIn?: () => void
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

  const isAdmin = useMemo(() => {
    if (session?.user.role === 'admin') {
      return true
    }
    return false
  }, [session])

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
      // <Skeleton className={cn(size === 'large' ? 'h-12 w-full rounded' : 'h-8 w-8 rounded-full')} />
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
              className={cn(className, 'flex h-12 w-full justify-between hover:bg-gray-200')}
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
        <PopoverContent
          {...popoverContentProps}
          className={cn('w-[240px] p-0', popoverContentProps.className)}
        >
          <div className="border-b px-4 py-3">
            <div className="flex items-center gap-3">
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
              <div className="flex flex-col">
                <span className="font-medium">{session.user.name}</span>
                <span className="text-xs text-gray-500">{session.user.email}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 px-3 py-2 hover:bg-gray-100"
              asChild
            >
              <Link href="/user" prefetch={false}>
                <User size={16} />
                {t('account')}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 px-3 py-2 hover:bg-gray-100"
              asChild
            >
              <Link href="/user/billing" prefetch={false}>
                <CreditCard size={16} />
                {t('billing')}
              </Link>
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 px-3 py-2 hover:bg-gray-100"
              asChild
            >
              <Link href="/user/notifications" prefetch={false}>
                <Bell size={16} />
                {t('notifications')}
              </Link>
            </Button> */}
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-3 px-3 py-2 hover:bg-gray-100"
                asChild
              >
                <Link href="/admin" prefetch={false}>
                  <LayoutDashboard size={16} />
                  {t('dashboard')}
                </Link>
              </Button>
            )}
            <div className="my-2 border-t" />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut size={16} />
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
        onClick={onClickSignIn}
      >
        {t('loginIn')}
      </Button>
    </Link>
  )
}
