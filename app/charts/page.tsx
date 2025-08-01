'use client'

import { Metadata } from 'next'
import { ChartsHeader } from '@/components/charts-header'
import { ChartsFooter } from '@/components/charts-footer'
import RightPanel from '@/components/right-panel'
import { PageTransition } from '@/components/page-transition'
import { TradingViewChart } from '@/components/TradingViewChart'
import { useState, useEffect, useRef } from 'react'

// Note: Metadata export moved to separate file due to client component
// export const metadata: Metadata = {
//   title: 'Charts | ViewMarket',
//   description: 'Advanced trading charts and analytics.',
// }

export default function ChartsPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCrosshair, setShowCrosshair] = useState(true)
  const fullscreenRef = useRef<HTMLDivElement>(null)

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(isCurrentlyFullscreen)
    }

    // Listen for fullscreen change events
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

  // Handle ESC key to exit fullscreen (backup, browser handles this automatically)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        exitFullscreen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  // Enter fullscreen mode
  const enterFullscreen = async () => {
    if (!fullscreenRef.current) return

    try {
      if (fullscreenRef.current.requestFullscreen) {
        await fullscreenRef.current.requestFullscreen()
      } else if ((fullscreenRef.current as any).webkitRequestFullscreen) {
        await (fullscreenRef.current as any).webkitRequestFullscreen()
      } else if ((fullscreenRef.current as any).mozRequestFullScreen) {
        await (fullscreenRef.current as any).mozRequestFullScreen()
      } else if ((fullscreenRef.current as any).msRequestFullscreen) {
        await (fullscreenRef.current as any).msRequestFullscreen()
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error)
    }
  }

  // Exit fullscreen mode
  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen()
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error)
    }
  }

  // Toggle fullscreen function to pass to header
  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  return (
    <PageTransition>
      <div 
        ref={fullscreenRef}
        className={`${isFullscreen ? 'h-screen' : 'h-screen'} bg-background overflow-hidden ${isFullscreen ? '' : 'flex flex-col'}`}
      >
        <ChartsHeader isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />
        
        {isFullscreen ? (
          // Fullscreen mode - only chart, no footer or right panel
          <main className="absolute inset-0 top-12 overflow-hidden" style={{ padding: 0, margin: 0 }}>
            <TradingViewChart showCrosshair={showCrosshair} />
          </main>
        ) : (
          // Normal mode - with footer and right panel
          <>
            {/* Main Content Area with Right Panel */}
            <div className="flex-1 relative">
              {/* Chart Container aligned perfectly with right panel */}
              <main className="absolute inset-0 right-12 overflow-hidden" style={{ padding: 0, margin: 0 }}>
                <TradingViewChart showCrosshair={showCrosshair} />
              </main>
              <RightPanel showCrosshair={showCrosshair} onToggleCrosshair={() => setShowCrosshair(!showCrosshair)} />
            </div>
            
            <ChartsFooter />
          </>
        )}
      </div>
    </PageTransition>
  )
}
