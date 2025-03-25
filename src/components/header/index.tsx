import Link from 'next/link'

import ThemeToggle from '../theme/theme-toggle'
import { Button } from '../ui/button'

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Link href="/">Easy Saas Next</Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button>Login</Button>
      </div>
    </header>
  )
}
