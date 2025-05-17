'use client'

import { useState } from 'react'
import { Upload, File, X } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FileItem {
  id: string
  name: string
  size: number
  progress: number
  file: File
}

export function R2FileUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<FileItem[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const addFiles = (newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      progress: 0,
      file: file,
    }))
    setFiles(prev => [...prev, ...fileItems])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      addFiles(selectedFiles)
    }
  }

  const uploadFile = async (fileItem: FileItem) => {
    const formData = new FormData()
    formData.append('file', fileItem.file)

    try {
      const response = await fetch('/api/oss/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('上传失败')
      }

      const data = await response.json()

      if (data.success) {
        setFiles(prev => prev.map(f => (f.id === fileItem.id ? { ...f, progress: 100 } : f)))
        toast.success('文件上传成功')
      } else {
        throw new Error(data.error || '上传失败')
      }
    } catch (error) {
      console.error('上传错误:', error)
      toast.error('文件上传失败')
      setFiles(prev => prev.filter(f => f.id !== fileItem.id))
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('请先选择文件')
      return
    }

    setIsUploading(true)

    try {
      // 模拟上传进度
      for (const file of files) {
        if (file.progress === 0) {
          setFiles(prev => prev.map(f => (f.id === file.id ? { ...f, progress: 20 } : f)))
          await uploadFile(file)
        }
      }
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Card className="p-6">
        <div
          className={cn(
            'rounded-lg border-2 border-dashed p-8',
            'flex flex-col items-center justify-center gap-4',
            'transition-colors duration-200',
            isDragging ? 'border-primary bg-primary/5' : 'hover:border-primary/50 border-gray-200'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="bg-primary/10 rounded-full p-3">
            <Upload className="text-primary h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">拖拽文件到这里上传</p>
            <p className="mt-1 text-sm text-gray-500">或者点击下方按钮选择文件</p>
          </div>
          <Input
            type="file"
            className="hidden"
            id="file-upload"
            multiple
            onChange={handleFileChange}
          />
          <div className="flex gap-2">
            <Button asChild>
              <label htmlFor="file-upload">选择文件</label>
            </Button>
            <Button onClick={handleUpload} disabled={isUploading || files.length === 0}>
              {isUploading ? '上传中...' : '开始上传'}
            </Button>
          </div>
        </div>
      </Card>

      {/* 文件列表 */}
      <div className="space-y-3">
        {files.map(file => (
          <Card key={file.id} className="p-4">
            <div className="flex items-center gap-4">
              <File className="h-5 w-5 text-gray-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => removeFile(file.id)}
                disabled={file.progress > 0 && file.progress < 100}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
