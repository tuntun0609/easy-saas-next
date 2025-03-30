import { CSSProperties } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { useUser } from '../user-provider'

export const UserButton = ({ className, style }: { className?: string; style?: CSSProperties }) => {
  const t = useTranslations('Header')
  const {
    data: session,
    isPending, //loading state
    error, //error object
    // refetch, //refetch the session
  } = useUser()

  if (isPending) {
    return <Button>Loading...</Button>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (session) {
    return <div>UserButton</div>
  }

  return (
    <Link href="/login">
      <Button className={cn(className)} style={style}>
        {t('loginIn')}
      </Button>
    </Link>
  )
}
