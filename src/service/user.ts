// 删除用户
export async function deleteUser(id: string) {
  const response = await fetch(`/api/admin/users/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('删除失败')
  }

  return response.json()
}
