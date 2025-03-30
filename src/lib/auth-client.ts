import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({})

export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: 'google',
  })

  return data
}
