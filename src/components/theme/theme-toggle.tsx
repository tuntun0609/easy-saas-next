'use client'

import { ComponentProps } from 'react'
import { Laptop, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const getSystemTheme = () => {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const isDark = media.matches
  const systemTheme = isDark ? 'dark' : 'light'
  return systemTheme
}

const themeConfig = [
  {
    label: 'Light',
    icon: <Sun className="h-4 w-4" />,
    value: 'light',
  },
  {
    label: 'Dark',
    icon: <Moon className="h-4 w-4" />,
    value: 'dark',
  },
  {
    label: 'System',
    icon: <Laptop className="h-4 w-4" />,
    value: 'system',
  },
]

export default function ThemeToggle({
  className,
  buttonProps = {},
}: {
  className?: string
  buttonProps?: ComponentProps<typeof Button>
}) {
  const t = useTranslations('HomePage')
  const { theme, setTheme } = useTheme()

  const onChangeTheme = (value: string) => {
    // if the selected theme is the same as the current theme, return
    if (value === theme) {
      return
    }

    setTheme(value)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" {...buttonProps} className={cn('h-9 w-9 p-0', className)}>
          <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-[150px] flex-col gap-1 p-1" align="end">
        {themeConfig.map(config => (
          <Button
            key={config.value}
            variant="ghost"
            className={cn(
              'w-full justify-start gap-2 p-2 pl-4',
              theme === config.value && 'bg-gray-100 dark:bg-gray-800'
            )}
            onClick={() => onChangeTheme(config.value)}
          >
            {config.icon}
            {t(config.value as 'light' | 'dark' | 'system')}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
