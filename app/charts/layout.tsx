import { Metadata } from 'next'
import { ChartsThemeProvider } from '@/lib/charts-theme-context'

export const metadata: Metadata = {
  title: 'Charts | ViewMarket',
  description: 'Advanced trading charts and analytics.',
}

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ChartsThemeProvider>
      {children}
    </ChartsThemeProvider>
  )
}