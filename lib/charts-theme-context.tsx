'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark'

type ChartsThemeContextType = {
  theme: Theme
}

const ChartsThemeContext = createContext<ChartsThemeContextType | undefined>(undefined)

export function ChartsThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Force dark theme on mount
  useEffect(() => {
    const root = document.documentElement
    
    // Remove any existing theme classes
    root.classList.remove('light', 'dark')
    
    // Force dark theme
    root.classList.add('dark')
    
    setMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <ChartsThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ChartsThemeContext.Provider>
  )
}

export function useChartsTheme() {
  const context = useContext(ChartsThemeContext)
  if (context === undefined) {
    throw new Error('useChartsTheme must be used within a ChartsThemeProvider')
  }
  return context
}