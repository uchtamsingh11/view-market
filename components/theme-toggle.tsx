'use client'

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-context'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        "relative h-9 w-9 rounded-md border border-border/50 bg-background/50 backdrop-blur-sm",
        "hover:bg-accent/50 hover:border-border transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "shadow-sm"
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun 
        className={cn(
          "h-4 w-4 transition-all duration-300 ease-in-out",
          theme === 'dark' 
            ? "scale-0 rotate-90 opacity-0" 
            : "scale-100 rotate-0 opacity-100"
        )} 
      />
      <Moon 
        className={cn(
          "absolute h-4 w-4 transition-all duration-300 ease-in-out",
          theme === 'dark' 
            ? "scale-100 rotate-0 opacity-100" 
            : "scale-0 -rotate-90 opacity-0"
        )} 
      />
    </Button>
  )
}