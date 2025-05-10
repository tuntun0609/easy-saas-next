import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link
      aria-label="home"
      style={{
        fontFamily: 'var(--font-caveat)',
      }}
      className="flex items-center gap-2 text-2xl whitespace-nowrap text-purple-600 lg:mx-4"
      href="/"
    >
      <Image src="/icon/logo.svg" alt="logo" width={28} height={28} />
      Easy Saas Next
    </Link>
  )
}
