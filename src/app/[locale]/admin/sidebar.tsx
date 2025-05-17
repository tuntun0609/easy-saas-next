'use client'

import { Database, FolderOpen, Upload, Users } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { LocaleSwitch } from '@/components/blocks/locale-switch'
import { UserButton } from '@/components/blocks/user-button'
import { Logo } from '@/components/logo'
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function AdminSidebar() {
  const t = useTranslations('Admin')
  const { open, isMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {open && (
          <div className="flex justify-center">
            <Logo />
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
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Database />
                  <span>{t('R2Management.title')}</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/admin/r2/upload">
                        <Upload />
                        <span>{t('R2Management.upload')}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/admin/r2/manage">
                        <FolderOpen />
                        <span>{t('R2Management.manage')}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        {open && (
          <div className="flex items-center justify-between">
            <LocaleSwitch />
            <ThemeToggle />
          </div>
        )}
        <UserButton
          popoverContentProps={isMobile ? {} : { side: 'right', align: 'end', sideOffset: 12 }}
          size={open ? 'large' : 'default'}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
