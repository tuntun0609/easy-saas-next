'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverClose } from '@radix-ui/react-popover'
import { UserWithRole } from 'better-auth/plugins'
import { MoreHorizontal, UserX, UserCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { banUser, unbanUser } from '@/service/user'

export const BanUserDialog = ({
  user,
  children,
}: {
  user: UserWithRole
  children: React.ReactNode
}) => {
  const router = useRouter()
  const t = useTranslations('Admin.UsersManagement.columns')
  const banUserSchema = useMemo(
    () =>
      z
        .object({
          reason: z.string().min(1, t('reasonRequired')),
          isPermanent: z.boolean(),
          expiresIn: z.number().optional(),
        })
        .superRefine((data, ctx) => {
          if (!data.isPermanent && (data.expiresIn === undefined || data.expiresIn < 1)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t('invalidBanDuration'),
              path: ['expiresIn'],
            })
          }
        }),
    [t]
  )

  type BanUserFormValues = z.infer<typeof banUserSchema>

  const form = useForm<BanUserFormValues>({
    // @ts-ignore
    resolver: zodResolver(banUserSchema),
    defaultValues: {
      reason: '',
      isPermanent: true,
      expiresIn: undefined,
    },
  })

  const onSubmit = async (data: BanUserFormValues) => {
    try {
      const expiresIn = data.isPermanent ? undefined : (data.expiresIn ?? 1) * 24 * 60 * 60
      await banUser({
        userId: user.id,
        reason: data.reason,
        expiresIn,
      })
      toast.success(t('banUserSuccess'))
      router.refresh()
    } catch (_error) {
      toast.error(t('banUserError'))
    }
  }

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('banUser')}</DialogTitle>
          <DialogDescription>{t('banUserDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('banReason')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPermanent"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={checked => {
                        field.onChange(checked)
                        if (checked) {
                          form.setValue('expiresIn', undefined)
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium">{t('permanentBan')}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!form.watch('isPermanent') && (
              <FormField
                control={form.control}
                name="expiresIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('banDuration')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ''}
                        onChange={e => {
                          const value = e.target.value ? Number(e.target.value) : undefined
                          field.onChange(value)
                        }}
                        placeholder={t('durationInDays')}
                        min={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end space-x-2">
              <DialogTrigger asChild>
                <Button variant="outline" type="button">
                  {t('cancel')}
                </Button>
              </DialogTrigger>
              <Button variant="destructive" type="submit">
                {t('confirm')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const ActionsCell = ({ user }: { user: UserWithRole }) => {
  const router = useRouter()
  const t = useTranslations('Admin.UsersManagement.columns')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 dark:hover:bg-gray-800">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 px-1 py-2 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-1">
          {!user.banned ? (
            <PopoverClose asChild>
              <BanUserDialog user={user}>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:bg-gray-800 dark:hover:text-red-300"
                >
                  <UserX className="mr-2 h-4 w-4" />
                  {t('banUser')}
                </Button>
              </BanUserDialog>
            </PopoverClose>
          ) : (
            <PopoverClose asChild>
              <Button
                variant="ghost"
                className="flex items-center justify-start text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:bg-gray-800 dark:hover:text-green-300"
                onClick={async () => {
                  if (confirm(t('unbanUserConfirm'))) {
                    try {
                      await unbanUser({ userId: user.id })
                      toast.success(t('unbanUserSuccess'))
                      router.refresh()
                    } catch (_error) {
                      toast.error(t('unbanUserError'))
                    }
                  }
                }}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                {t('unBanUser')}
              </Button>
            </PopoverClose>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
