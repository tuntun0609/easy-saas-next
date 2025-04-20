import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { auth, isAdmin } from '@/lib/auth'
import { UnbanUserRequest } from '@/type/user'

// PUT /api/admin/users/[id]/unBan - 解封用户
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

    const { userId } = (await request.json()) as UnbanUserRequest

    await auth.api.unbanUser({
      body: { userId },
      headers: headersList,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('解封用户失败:', error)
    return NextResponse.json({ error: '解封失败' }, { status: 500 })
  }
}
