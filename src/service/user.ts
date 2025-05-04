import ky from 'ky'

import { BanUserRequest, UnbanUserRequest } from '@/type/user'

// 禁用用户
export async function banUser({ userId, reason, expiresIn }: BanUserRequest) {
  const response = await ky.put('/api/admin/users/ban', {
    json: {
      userId,
      reason,
      expiresIn,
    },
  })

  if (!response.ok) {
    throw new Error('禁用失败')
  }

  return response.json()
}

// 解封用户
export async function unbanUser({ userId }: UnbanUserRequest) {
  const response = await ky.put('/api/admin/users/unban', {
    json: { userId },
  })

  if (!response.ok) {
    throw new Error('解封失败')
  }

  return response.json()
}
