import { R2FileUpload } from '@/components/r2/upload-file'

export default function AdminR2Page() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">R2 文件上传</h1>
        <p className="mt-2 text-gray-500">在这里上传您的文件到 R2 存储桶</p>
      </div>
      <R2FileUpload />
    </div>
  )
}
