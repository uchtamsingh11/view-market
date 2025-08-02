'use client'

import { BiCandles } from "react-icons/bi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const chartTypes = [
  'Candlesticks',
  'Bars',
  'Line',
  'Area',
  'Heikin Ashi',
  'Renko',
  'Point & Figure'
]

interface CandlesticksDropdownProps {
  onSelect: (chartType: string) => void
  selectedChartType: string
}

export function CandlesticksDropdown({ onSelect, selectedChartType }: CandlesticksDropdownProps) {
  const handleSelect = (chartType: string) => {
    onSelect(chartType)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-3 py-2 h-auto">
          <BiCandles className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-background border border-border rounded-lg shadow-md p-1"
        align="start"
        sideOffset={4}
      >
        {/* Chart Type Options */}
        <div className="space-y-0.5">
          {chartTypes.map((option) => (
            <DropdownMenuItem
              key={option}
              className={cn(
                "px-3 py-2 cursor-pointer text-base rounded-md transition-colors duration-150",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground",
                selectedChartType === option && "bg-accent text-accent-foreground font-medium"
              )}
              onClick={() => handleSelect(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}