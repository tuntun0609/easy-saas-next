'use client'

import dayjs from 'dayjs'
import { User, Mail, Calendar, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useUser } from '@/components/user-provider'

export default function UserProfile() {
  const t = useTranslations('user')
  const { data: session } = useUser()

  if (!session) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-muted-foreground text-lg">{t('pleaseLogin')}</p>
      </div>
    )
  }

  const { user } = session

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image ?? ''} alt={user.name} />
            <AvatarFallback>
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">
              {user.role === 'admin' && (
                <Badge variant="secondary" className="mr-2">
                  <Shield className="mr-1 h-3 w-3" />
                  {t('profile.admin')}
                </Badge>
              )}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="text-muted-foreground h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span>
                {t('profile.registeredAt', {
                  date: dayjs(user.createdAt).format('YYYY年MM月DD日'),
                })}
              </span>
            </div>
            {user.banned && (
              <>
                <Separator />
                <div className="bg-destructive/10 text-destructive mt-4 rounded-lg p-4">
                  <p className="font-semibold">{t('profile.banned')}</p>
                  {user.banReason && (
                    <p className="mt-1 text-sm">
                      {t('profile.banReason', { reason: user.banReason })}
                    </p>
                  )}
                  {user.banExpires && (
                    <p className="mt-1 text-sm">
                      {t('profile.banExpires', {
                        date: dayjs(user.banExpires).format('YYYY年MM月DD日 HH:mm'),
                      })}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
