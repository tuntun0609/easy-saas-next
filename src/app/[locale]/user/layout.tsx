import { headers } from 'next/headers'
import { getLocale } from 'next-intl/server'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { redirect } from '@/i18n/navigation'
import { auth } from '@/lib/auth'

import { UserSidebar } from './sidebar'

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale()
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect({
      href: {
        pathname: '/login',
        query: {
          callbackURL: '/user',
        },
      },
      locale,
    })

    return null
  }

  return (
    <SidebarProvider>
      <UserSidebar />
      <main className="flex-1 p-4">
        <SidebarTrigger />
        <section>{children}</section>
      </main>
    </SidebarProvider>
  )
}

export default UserLayout
