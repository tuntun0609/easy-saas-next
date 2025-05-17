import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { getSignedUrl, generateUniqueFileName } from '@/lib/r2'

// 请求体验证schema
const schema = z.object({
  fileName: z.string(),
  contentType: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // 验证用户是否已登录
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    // 解析请求体
    const body = await request.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: '无效的请求参数' }, { status: 400 })
    }

    const { fileName } = result.data

    // 生成签名URL
    const signedUrl = await getSignedUrl(fileName)
    const fileKey = generateUniqueFileName(fileName)

    return NextResponse.json({
      success: true,
      data: {
        signedUrl,
        fileKey,
      },
    })
  } catch (error) {
    console.error('获取签名URL失败:', error)
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}
