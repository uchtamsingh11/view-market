import { Metadata } from 'next'
import { ForgotPasswordForm } from '@/components/forgot-password-form'
import { ThemeToggle } from '@/components/theme-toggle'
import { PageTransition } from '@/components/page-transition'

export const metadata: Metadata = {
  title: 'Forgot Password | ViewMarket',
  description: 'Reset your password to regain access to your account.',
}

export default function ForgotPasswordPage() {
  return (
    <PageTransition>
      <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
        {/* Theme Toggle - positioned in top right */}
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        
        <div className="w-full max-w-sm md:max-w-3xl">
          <ForgotPasswordForm />
        </div>
      </div>
    </PageTransition>
  )
}