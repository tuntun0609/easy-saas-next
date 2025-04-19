'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, UserX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { deleteUser } from '@/service/user'

export type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
}

function ActionsCell({ user }: { user: User }) {
  const router = useRouter()

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
              if (confirm('确定要删除该用户吗？')) {
                try {
                  await deleteUser(user.id)
                  toast.success('删除成功')
                  router.refresh()
                } catch (_error) {
                  toast.error('删除失败')
                }
              }
            }}
          >
            <UserX className="mr-2 h-4 w-4" />
            删除用户
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: '用户名',
  },
  {
    accessorKey: 'email',
    header: '邮箱',
  },
  {
    accessorKey: 'emailVerified',
    header: '邮箱验证',
    cell: ({ row }) => (
      <div className={row.original.emailVerified ? 'text-green-600' : 'text-red-600'}>
        {row.original.emailVerified ? '已验证' : '未验证'}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: '创建时间',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString('zh-CN'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
]
