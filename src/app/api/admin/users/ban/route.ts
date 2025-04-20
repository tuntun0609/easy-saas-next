import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { auth, isAdmin } from '@/lib/auth'
import { BanUserRequest } from '@/type/user'

// PUT /api/admin/users/[id] - 封禁用户
export async function PUT(request: Request) {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({ headers: headersList })

    if (!session) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    if (!isAdmin(session.user)) {
      return NextResponse.json({ error: '无权限' }, { status: 403 })
    }

    const { userId, reason, expiresIn } = (await request.json()) as BanUserRequest

    await auth.api.banUser({
      body: { userId, banReason: reason, banExpiresIn: expiresIn },
      headers: headersList,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('封禁用户失败:', error)
    return NextResponse.json({ error: '封禁失败' }, { status: 500 })
  }
}
