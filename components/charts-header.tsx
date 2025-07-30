'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'

export function ChartsHeader() {
  const router = useRouter()

  const handleLogout = () => {
    // Simulate logout process
    router.push('/')
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="relative flex h-12 items-center justify-between w-full">
          {/* Profile */}
          <div className="flex items-center pl-4">
            <Button
              variant="outline"
              size="sm"
              className="p-2 hover:bg-accent/20"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4 absolute right-2 top-1/2 transform -translate-y-1/2">
            <ThemeToggle />
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-800"
            >
              <LogOut className="w-4 h-4" />
            </Button>
        </div>
      </div>
    </header>
  )
}