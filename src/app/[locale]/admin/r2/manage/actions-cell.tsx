'use client'

import { useState } from 'react'
import { Copy, Download, MoreHorizontal, Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { copyToClipboard } from '@/lib/utils'

import { R2Object } from './page'

interface ActionsCellProps {
  object: R2Object
}

export const ActionsCell = ({ object }: ActionsCellProps) => {
  const t = useTranslations('Admin.R2Management')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleCopyUrl = async () => {
    await copyToClipboard(object.url)
    toast.success(t('urlCopied'))
  }

  const handleDownload = async () => {
    // TODO: 实现下载逻辑
    toast.success(t('downloadStarted'))
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      // TODO: 实现删除逻辑
      toast.success(t('deleteSuccess'))
    } catch (_error: any) {
      toast.error(t('deleteFailed'))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t('openMenu')}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyUrl}>
          <Copy className="mr-2 h-4 w-4" />
          <span>{t('copyUrl')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          <span>{t('download')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 focus:text-red-600"
        >
          <Trash className="mr-2 h-4 w-4 text-red-600" />
          <span>{t('delete')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
