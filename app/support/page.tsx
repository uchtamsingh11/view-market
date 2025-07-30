import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Support | ViewMarket',
  description: 'Get help and support.',
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Theme Toggle - positioned in top right */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md text-center">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Support Center
          </h1>
          <p className="text-muted-foreground mb-6">
            Need help? We're here to assist you.
          </p>
          <Button asChild className="w-full">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}