import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Charts | ViewMarket',
  description: 'Advanced trading charts and analytics.',
}

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}