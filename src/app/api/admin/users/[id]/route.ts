import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { db } from '@/db'
import { user } from '@/db/schema'
import { auth } from '@/lib/auth'

const adminEmails = process.env.ADMIN_USER_EMAIL?.split(',') || []

// 验证管理员权限
async function verifyAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return false
  }

  return adminEmails.includes(session.user.email)
}

// DELETE /api/admin/users/[id] - 删除用户
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) {
      return NextResponse.json({ error: '无权限' }, { status: 403 })
    }

    await db.delete(user).where(eq(user.id, params.id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除用户失败:', error)
    return NextResponse.json({ error: '删除失败' }, { status: 500 })
  }
}
