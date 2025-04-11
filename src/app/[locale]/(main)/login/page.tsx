'use client'

import { useSearchParams } from 'next/navigation'

import LoginCard from '@/components/blocks/login-card'

const LoginPage = () => {
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get('callbackURL') || '/'

  return (
    <div className="mt-24 flex items-center justify-center p-4">
      <LoginCard callbackURL={callbackURL} />
    </div>
  )
}

export default LoginPage
