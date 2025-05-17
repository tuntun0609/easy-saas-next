import crypto from 'crypto'

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl as getSignedUrlS3 } from '@aws-sdk/s3-request-presigner'
import dayjs from 'dayjs'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
})

export interface UploadFileParams {
  file: Buffer | Blob | ReadableStream | string
  fileName: string
  contentType?: string
  bucket?: string
}

const getDateBasedPath = () => {
  const now = dayjs()
  return now.format('YYYY/MM/DD')
}

const generateFileHash = () => {
  return crypto.randomBytes(8).toString('hex')
}

export const generateUniqueFileName = (originalFileName: string): string => {
  const datePath = getDateBasedPath()
  const fileHash = generateFileHash()
  const fileExtension = originalFileName.includes('.') ? originalFileName.split('.').pop() : ''
  const fileNameWithoutExt = originalFileName.includes('.')
    ? originalFileName.split('.').slice(0, -1).join('.')
    : originalFileName
  const hashedFileName = `${fileNameWithoutExt}-${fileHash}${fileExtension ? `.${fileExtension}` : ''}`
  return `${datePath}/${hashedFileName}`
}

export const uploadFile = async ({
  file,
  fileName,
  contentType = 'application/octet-stream',
  bucket = process.env.R2_BUCKET_NAME || '',
}: UploadFileParams) => {
  try {
    const fileKey = generateUniqueFileName(fileName)

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      Body: file,
      ContentType: contentType,
    })

    const response = await r2.send(command)

    return {
      success: true,
      fileName: fileKey,
      eTag: response.ETag,
    }
  } catch (error) {
    console.error('Error uploading file to R2:', error)
    throw error
  }
}

export const getSignedUrl = async (fileName: string) => {
  if (!process.env.R2_BUCKET_NAME) {
    throw new Error('R2_BUCKET_NAME is not set')
  }

  const fileKey = generateUniqueFileName(fileName)

  const url = await getSignedUrlS3(
    r2,
    new PutObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: fileKey }),
    {
      expiresIn: 3600,
    }
  )

  return url
}

export const deleteFile = async (fileKey: string) => {
  if (!process.env.R2_BUCKET_NAME) {
    throw new Error('R2_BUCKET_NAME is not set')
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
  })

  await r2.send(command)
}
