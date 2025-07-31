import { Metadata } from 'next'
import { ChartsHeader } from '@/components/charts-header'
import { ChartsFooter } from '@/components/charts-footer'
import RightPanel from '@/components/right-panel'
import { PageTransition } from '@/components/page-transition'
import { TradingViewChart } from '@/components/TradingViewChart'

export const metadata: Metadata = {
  title: 'Charts | ViewMarket',
  description: 'Advanced trading charts and analytics.',
}

export default function ChartsPage() {
  return (
    <PageTransition>
      <div className="h-screen bg-background overflow-hidden flex flex-col">
        <ChartsHeader />
        
        {/* Main Content Area with Right Panel */}
        <div className="flex-1 relative">
          {/* Chart Container with right margin to avoid panel overlap */}
          <main className="absolute inset-0 right-14 overflow-hidden">
            <TradingViewChart />
          </main>
          <RightPanel />
        </div>
        
        <ChartsFooter />
      </div>
    </PageTransition>
  )
}
