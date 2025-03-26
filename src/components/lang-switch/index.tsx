import { Check, Globe } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const LangSwitch = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  // const t = useTranslations()

  const languages = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' },
  ]

  const handleLanguageChange = (code: string) => {
    // 构建新的URL路径
    const newPathname = pathname.replace(`/${locale}`, `/${code}`)
    router.push(newPathname)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] p-1">
        {languages.map(lang => (
          <Button
            key={lang.code}
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => handleLanguageChange(lang.code)}
          >
            <Check className={cn('h-4 w-4', locale === lang.code ? 'opacity-100' : 'opacity-0')} />
            {lang.name}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
