import { Metadata } from 'next'
import { LoginForm } from '@/components/login-form'
import { ThemeToggle } from '@/components/theme-toggle'
import { PageTransition } from '@/components/page-transition'

export const metadata: Metadata = {
  title: 'Sign in | ViewMarket',
  description: 'Welcome back! Please sign in to continue.',
}

export default function SignInPage() {
  return (
    <PageTransition>
      <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
        {/* Theme Toggle - positioned in top right */}
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </PageTransition>
  )
}