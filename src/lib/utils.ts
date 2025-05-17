import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { NextConfig } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 整合多个中间件的函数
 * @param config 原始配置
 * @param middlewares 中间件数组
 * @returns 整合后的配置
 */
export const withMiddlewares = (
  config: NextConfig,
  middlewares: Array<(nextConfig?: NextConfig) => NextConfig>
) => {
  return middlewares.reduce((acc, middleware) => {
    return middleware(acc)
  }, config)
}

// 将毫秒数转换为分钟数或者秒数
export const convertReadingTime = ({
  time,
  secondUnit = '秒',
  minuteUnit = '分钟',
}: {
  time: number
  secondUnit?: string
  minuteUnit?: string
}) => {
  // 将毫秒转换为分钟
  const minutes = Math.round(time / 60000)
  // 将毫秒转换为秒
  const seconds = Math.round(time / 1000)

  // 如果不足1分钟，返回秒数
  if (minutes < 1) {
    return `${seconds} ${secondUnit}`
  }
  // 否则返回分钟数
  return `${minutes} ${minuteUnit}`
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
