'use client'

import React, { useEffect, useRef } from 'react'

export function TradingViewChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Dynamic import to avoid SSR issues
    const initChart = async () => {
      try {
        const { createChart } = await import('lightweight-charts')
        
        const chart = createChart(chartContainerRef.current!, {
          width: chartContainerRef.current!.clientWidth,
          height: chartContainerRef.current!.clientHeight,
          layout: {
            background: { color: 'transparent' },
            textColor: '#1f2937',
          },
          grid: {
            vertLines: { color: '#e2e8f0' },
            horzLines: { color: '#e2e8f0' },
          },
          crosshair: {
            mode: 1,
          },
          rightPriceScale: {
            borderColor: '#e2e8f0',
            minimumWidth: 48, // Match right panel width (3rem = 48px)
            autoScale: true,
          },
          timeScale: {
            borderColor: '#e2e8f0',
            timeVisible: true,
            secondsVisible: false,
            minimumHeight: 48, // Match footer height (3rem = 48px)
          },
        })

        const lineSeries = chart.addLineSeries({
          color: '#2962FF',
          lineWidth: 2,
        })
        
        lineSeries.setData([
          { time: '2023-12-01', value: 154.15 },
          { time: '2023-12-02', value: 152.18 },
          { time: '2023-12-03', value: 153.40 },
          { time: '2023-12-04', value: 151.20 },
          { time: '2023-12-05', value: 150.70 },
          { time: '2023-12-06', value: 152.25 },
          { time: '2023-12-07', value: 154.80 },
          { time: '2023-12-08', value: 156.45 },
          { time: '2023-12-09', value: 158.30 },
          { time: '2023-12-10', value: 160.15 },
        ])

        const handleResize = () => {
          if (chartContainerRef.current && chart) {
            chart.applyOptions({
              width: chartContainerRef.current.clientWidth,
              height: chartContainerRef.current.clientHeight,
            })
          }
        }

        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
          chart.remove()
        }
      } catch (error) {
        console.error('Error initializing chart:', error)
      }
    }

    const cleanup = initChart()
    
    return () => {
      cleanup?.then(cleanupFn => cleanupFn?.())
    }
  }, [])

  return (
    <div 
      ref={chartContainerRef} 
      className="w-full h-full bg-background"
    />
  )
}

