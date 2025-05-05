'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
export default function TagSelect({ tags }: { tags: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('blog')

  const tag = searchParams.get('tag')

  const handleTagChange = (value: string) => {
    if (value === 'all') {
      router.replace('/blog')
    } else {
      router.replace(`/blog?tag=${value}`)
    }
  }

  return (
    <Select onValueChange={handleTagChange} defaultValue={tag ?? 'all'}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{t('all')}</SelectItem>
        {tags.map(tag => (
          <SelectItem key={tag} value={tag}>
            {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
