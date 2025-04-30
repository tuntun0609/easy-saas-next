import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'

import { User } from '@/type/user'

import { db } from '../db'
import * as schema from '../db/schema'

export const AdminUserIds = process.env.ADMIN_USER_ID?.split(',') || []

export const isAdmin = (user: User) => user.role === 'admin' || AdminUserIds.includes(user.id)

export const auth = betterAuth({
  baseURL: process.env.BASE_URL || process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'pg', // or "pg" or "mysql"
    schema: {
      ...schema,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    admin({
      adminUserIds: AdminUserIds,
    }),
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: process.env.NODE_ENV === 'development' ? 0 : 5 * 60, // Cache duration in seconds
    },
  },
})
