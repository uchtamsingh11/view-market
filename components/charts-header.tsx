'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { LogOut, Search, Camera } from 'lucide-react'
import { SymbolPopup } from '@/components/symbol-popup'
import { TimeFrameDropdown } from '@/components/time-frame-dropdown'
import { CandlesticksDropdown } from '@/components/candlesticks-dropdown'
import { IndicatorsPopup } from '@/components/indicators-popup'
import { SocketPopup } from '@/components/socket-popup'
import { SettingsPopup } from '@/components/settings-popup'
import { ProfileButton } from '@/components/profile-dropdown'
import { BiCandles } from "react-icons/bi";
import { PiPlugs } from "react-icons/pi";
import { LuSave } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineFullscreen } from "react-icons/ai";
import { CiGrid32 } from "react-icons/ci";
import { takeScreenshot } from '@/lib/screenshot';
import { useToast } from '@/components/ui/toast';

const Divider = () => (
  <div className="h-6 w-px bg-white/50 mx-3" />
);

interface ChartsHeaderProps {
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

export function ChartsHeader({ isFullscreen = false, onToggleFullscreen }: ChartsHeaderProps) {
  const router = useRouter()
  const [isSymbolPopupOpen, setIsSymbolPopupOpen] = useState(false)
  const [isIndicatorsPopupOpen, setIsIndicatorsPopupOpen] = useState(false)
  const [isSocketPopupOpen, setIsSocketPopupOpen] = useState(false)
  const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false)
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1m')
  const [selectedChartType, setSelectedChartType] = useState('Candlesticks')
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false)
  const { showToast, ToastContainer } = useToast()

  const handleScreenshot = async () => {
    if (isCapturingScreenshot) return
    
    setIsCapturingScreenshot(true)
    
    try {
      const result = await takeScreenshot({
        filename: `viewmarket-chart-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`,
        quality: 1.0,
        format: 'png',
        excludeElements: [
          '.screenshot-exclude', // Add this class to elements you want to exclude
          'header', // Exclude the header from screenshot
          'button[aria-label="Screenshot"]' // Exclude the screenshot button itself
        ]
      })
      
      if (result.success) {
        showToast(`Screenshot saved: ${result.filename}`, 'success')
      } else {
        showToast(`Screenshot failed: ${result.error}`, 'error')
      }
    } catch (error) {
      console.error('Screenshot error:', error)
      showToast('Screenshot failed: Please try again or use browser screenshot', 'error')
    } finally {
      setIsCapturingScreenshot(false)
    }
  }

  return (
    <>
      <header className="border-b-4 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 screenshot-exclude">
        <div className="relative flex h-9 items-center justify-between w-full pr-12">
            {/* Left side with Profile and other buttons with dividers */}
            <div className="flex items-center pl-4">
              <ProfileButton />
              <Divider />
              <div
                className="flex items-center justify-start cursor-pointer"
                onClick={() => setIsSymbolPopupOpen(true)}
              >
                <Search className="w-4 h-4 mr-2" />
                Symbol
              </div>
              <Divider />
              <TimeFrameDropdown
                onSelect={setSelectedTimeFrame}
                selectedTimeFrame={selectedTimeFrame}
              />
              <Divider />
              <CandlesticksDropdown
                onSelect={setSelectedChartType}
                selectedChartType={selectedChartType}
              />
              <Divider />
              <div
                className="cursor-pointer"
                onClick={() => setIsIndicatorsPopupOpen(true)}
              >
                Indicators
              </div>
              <Divider />
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsSocketPopupOpen(true)}
              >
                <PiPlugs className="w-5 h-5 mr-2" />
                socket
              </div>
            </div>

            {/* Right side actions - no dividers, balanced spacing */}
            <div className="flex items-center gap-6 absolute right-6 top-1/2 transform -translate-y-1/2">
              <div className="cursor-pointer">
                <CiGrid32 className="w-5 h-5" />
              </div>
              <div
                className="cursor-pointer"
                onClick={onToggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen (ESC)" : "Enter Fullscreen"}
              >
                <AiOutlineFullscreen className="w-5 h-5" />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setIsSettingsPopupOpen(true)}
              >
                <IoSettingsOutline className="w-5 h-5" />
              </div>
              <div
                className={`cursor-pointer ${isCapturingScreenshot ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleScreenshot}
                aria-label="Screenshot"
              >
                <Camera className={`w-5 h-5 ${isCapturingScreenshot ? 'animate-pulse' : ''}`} />
              </div>
              <div className="cursor-pointer">
                <LuSave className="w-5 h-5" />
              </div>
            </div>
        </div>
      </header>
      {isSymbolPopupOpen && <SymbolPopup onClose={() => setIsSymbolPopupOpen(false)} />}
      {isIndicatorsPopupOpen && <IndicatorsPopup onClose={() => setIsIndicatorsPopupOpen(false)} />}
      {isSocketPopupOpen && <SocketPopup onClose={() => setIsSocketPopupOpen(false)} />}
      {isSettingsPopupOpen && <SettingsPopup onClose={() => setIsSettingsPopupOpen(false)} />}
      <ToastContainer />
    </>
  )
}