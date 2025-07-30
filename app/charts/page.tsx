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
      <div className="h-screen bg-background overflow-hidden">
        <ChartsHeader />
        <RightPanel />
        
        {/* Main Content Area */}
        <main className="h-[calc(100vh-6rem)] overflow-hidden relative">
          <div className="w-[calc(100%-3rem)] h-full">
            <TradingViewChart />
          </div>
        </main>
        
        <ChartsFooter />
      </div>
    </PageTransition>
  )
}
