import { toNextJsHandler } from 'better-auth/next-js'

export const maxDuration = 60 // 设置超时时间为10秒

import { auth } from '@/lib/auth'

export const { POST, GET } = toNextJsHandler(auth.handler)
