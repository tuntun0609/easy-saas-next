'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { signInWithGoogle } from '@/lib/auth-client'

const LoginPage = () => {
  const handleSignInWithGoogle = async () => {
    const data = await signInWithGoogle()
    console.log(data)
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="mt-36 w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-1">
          <h1 className="text-center text-2xl font-bold">欢迎回来</h1>
          <p className="text-muted-foreground text-center text-sm">请选择登录方式继续</p>
        </CardHeader>

        <CardContent>
          <Button onClick={handleSignInWithGoogle} variant="outline" className="w-full" size="lg">
            <Image src="/icon/google.svg" alt="Google" width={20} height={20} />
            使用Google账号登录
          </Button>
        </CardContent>

        <CardFooter className="text-muted-foreground flex justify-center text-sm">
          登录即表示同意我们的服务条款和隐私政策
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage
