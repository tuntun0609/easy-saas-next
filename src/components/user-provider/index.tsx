'use client'

import { createContext, useContext } from 'react'

import { authClient } from '@/lib/auth-client'
import { UseSessionReturn } from '@/type/user'

const UserContext = createContext<UseSessionReturn | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const data = authClient.useSession()
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export function useUser() {
  const data = useContext(UserContext)
  if (!data) throw new Error('useUser must be used within a UserProvider')
  return data
}
