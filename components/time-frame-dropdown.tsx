'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const timeFrames = {
  Ticks: ['1 Tick', '5 Ticks', '10 Ticks'],
  Seconds: ['1s', '5s', '10s', '15s', '30s'],
  Minutes: ['1m', '3m', '5m', '15m', '30m', '45m'],
  Hours: ['1h', '2h', '4h'],
  Days: ['1d', '2d', '5d'],
  Weeks: ['1w', '2w'],
  Months: ['1M', '3M', '6M', '12M'],
}

interface TimeFrameDropdownProps {
  onSelect: (timeFrame: string) => void
  selectedTimeFrame: string
}

export function TimeFrameDropdown({ onSelect, selectedTimeFrame }: TimeFrameDropdownProps) {
  // Initial state setup: Minutes expanded by default, all others collapsed
  const [expandedSections, setExpandedSections] = useState({
    Ticks: false,
    Seconds: false,
    Minutes: true,    // expanded by default
    Hours: false,
    Days: false,
    Weeks: false,
    Months: false,
  })

  const handleSelect = (timeFrame: string) => {
    onSelect(timeFrame)
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-base font-medium px-3 py-2 h-auto">
          {selectedTimeFrame}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-background border border-border rounded-lg shadow-md p-1"
        align="start"
        sideOffset={4}
      >
        {Object.entries(timeFrames).map(([section, options]) => (
          <div key={section} className="mb-1 last:mb-0">
            {/* Section Header */}
            <DropdownMenuLabel
              className={cn(
                "flex justify-between items-center px-3 py-2 cursor-pointer font-medium text-base",
                "hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-150",
                "text-foreground"
              )}
              onClick={() => toggleSection(section)}
            >
              {section}
              {expandedSections[section as keyof typeof expandedSections] ? (
                <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 text-muted-foreground" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 transition-transform duration-200 text-muted-foreground" />
              )}
            </DropdownMenuLabel>
            
            {/* Section Options */}
            {expandedSections[section as keyof typeof expandedSections] && (
              <div className="ml-4 space-y-0.5">
                {options.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    className={cn(
                      "px-3 py-2 cursor-pointer text-base rounded-md transition-colors duration-150",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:bg-accent focus:text-accent-foreground",
                      selectedTimeFrame === option && "bg-accent text-accent-foreground font-medium"
                    )}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </div>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}