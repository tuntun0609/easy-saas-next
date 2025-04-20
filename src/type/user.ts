import { authClient } from '@/lib/auth-client'

export type Session = typeof authClient.$Infer.Session.session

export type User = typeof authClient.$Infer.Session.user

export type UseSessionReturn = ReturnType<typeof authClient.useSession>

export type BanUserRequest = {
  userId: string
  reason?: string
  expiresIn?: number
}

export type UnbanUserRequest = {
  userId: string
}
