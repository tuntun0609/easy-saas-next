import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

import { db } from '@/db'
import { ossResources } from '@/db/oss-schema'
import { auth } from '@/lib/auth'
import { uploadFile } from '@/lib/r2'

export async function POST(request: NextRequest) {
  try {
    // 验证用户是否已登录
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return Response.json({ error: '未登录' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return Response.json({ error: '没有找到文件' }, { status: 400 })
    }

    // 读取文件内容
    const buffer = Buffer.from(await file.arrayBuffer())

    // 上传到 R2
    const uploadResult = await uploadFile({
      file: buffer,
      fileName: file.name,
      contentType: file.type,
    })

    if (!uploadResult.success) {
      return Response.json({ error: '文件上传失败' }, { status: 500 })
    }

    // 构建公共访问URL
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${uploadResult.fileName}`

    // 在数据库中记录文件信息
    const [ossResource] = await db
      .insert(ossResources)
      .values({
        id: uploadResult.fileName,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        url: publicUrl,
        bucket: process.env.R2_BUCKET_NAME || '',
        path: uploadResult.fileName,
        uploadedBy: session.user.id,
        metadata: JSON.stringify({
          originalName: file.name,
          eTag: uploadResult.eTag,
        }),
      })
      .returning()

    return Response.json({
      success: true,
      url: ossResource.url,
    })
  } catch (error) {
    console.error('文件上传错误:', error)
    return Response.json({ error: '文件上传过程中发生错误' }, { status: 500 })
  }
}
