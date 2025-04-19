'use client'

import { Users } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { LocaleSwitch } from '@/components/blocks/locale-switch'
import { UserButton } from '@/components/blocks/user-button'
import ThemeToggle from '@/components/theme/theme-toggle'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function AdminSidebar() {
  const t = useTranslations('Admin')
  const { open, isMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {open && (
          <div
            style={{ fontFamily: 'var(--font-caveat)' }}
            className="text-center text-3xl font-bold whitespace-nowrap text-purple-600"
          >
            Easy Saas Next
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('title')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/users">
                    <Users />
                    <span>{t('UsersManagement.title')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <LocaleSwitch />
          <ThemeToggle />
        </div>
        <UserButton
          popoverContentProps={isMobile ? {} : { side: 'right', align: 'end', sideOffset: 12 }}
          size={open ? 'large' : 'default'}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
