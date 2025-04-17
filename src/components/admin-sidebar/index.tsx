'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

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

import { UserButton } from '../blocks/user-button'

export function AdminSidebar() {
  const t = useTranslations('Admin')
  const { open, isMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {open && (
          <div
            style={{
              fontFamily: 'var(--font-caveat)',
            }}
            className="text-center text-3xl font-bold text-purple-600"
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
                    <Home />
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
        <UserButton
          popoverContentProps={isMobile ? {} : { side: 'right', align: 'end', sideOffset: 12 }}
          size={open ? 'large' : 'default'}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
