import { Metadata } from 'next'
import { ChartsHeader } from '@/components/charts-header'
import { PageTransition } from '@/components/page-transition'

export const metadata: Metadata = {
  title: 'Charts | ViewMarket',
  description: 'Advanced trading charts and analytics.',
}

export default function ChartsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <ChartsHeader />
        
        {/* Main Content Area */}
        <main className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-foreground">
                Charts Dashboard
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Welcome to your trading dashboard. Chart components and analytics will be added here.
              </p>
              <div className="w-full max-w-2xl mx-auto h-96 bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                <span className="text-2xl font-semibold text-muted-foreground">
                  Charts Area
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}