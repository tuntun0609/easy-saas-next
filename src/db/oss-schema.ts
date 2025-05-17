import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const ossResources = pgTable('oss_resources', {
  id: text('id').primaryKey(), // 资源唯一标识符
  fileName: varchar('file_name', { length: 255 }).notNull(), // 文件名
  fileSize: integer('file_size').notNull(), // 文件大小（字节）
  mimeType: varchar('mime_type', { length: 100 }).notNull(), // 文件MIME类型
  url: text('url').notNull(), // 资源访问URL
  bucket: varchar('bucket', { length: 100 }).notNull(), // OSS bucket名称
  path: text('path').notNull(), // 存储路径
  uploadedBy: text('uploaded_by').notNull(), // 上传者ID
  createdAt: timestamp('created_at').defaultNow().notNull(), // 创建时间
  updatedAt: timestamp('updated_at').defaultNow().notNull(), // 更新时间
  metadata: text('metadata'), // 额外的元数据，JSON格式
})

export type OssResource = typeof ossResources.$inferSelect
