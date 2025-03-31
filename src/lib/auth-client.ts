import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({})

export const signInWithGoogle = async (callbackURL: string = '/') => {
  const data = await authClient.signIn.social({
    provider: 'google',
    callbackURL,
  })

  return data
}

export const signInWithGithub = async (callbackURL: string = '/') => {
  const data = await authClient.signIn.social({
    provider: 'github',
    callbackURL,
  })
  return data
}
