'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { signInWithGithub, signInWithGoogle } from '@/lib/auth-client'

const LoginPage = () => {
  const t = useTranslations('LoginPage')
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get('callbackURL') || '/'

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle(callbackURL)
  }

  const handleSignInWithGithub = async () => {
    await signInWithGithub(callbackURL)
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="mt-36 w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-1">
          <h1 className="text-center text-2xl font-bold">{t('welcome')}</h1>
          <p className="text-muted-foreground text-center text-sm">{t('welcomeDesc')}</p>
        </CardHeader>

        <CardContent className="space-y-2">
          <Button onClick={handleSignInWithGoogle} variant="outline" className="w-full" size="lg">
            <Image src="/icon/google.svg" alt="Google" width={20} height={20} />
            {t('google')}
          </Button>
          <Button onClick={handleSignInWithGithub} variant="outline" className="w-full" size="lg">
            <Image src="/icon/github.svg" alt="Github" width={20} height={20} />
            {t('github')}
          </Button>
        </CardContent>

        <CardFooter className="text-muted-foreground flex justify-center text-center text-sm">
          {t('agree')}
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage
