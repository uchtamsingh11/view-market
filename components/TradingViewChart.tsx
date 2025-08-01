'use client'

import React, { useEffect, useRef } from 'react'
import { IChartApi } from 'lightweight-charts';

interface TradingViewChartProps {
  showCrosshair: boolean;
}

export function TradingViewChart({ showCrosshair }: TradingViewChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Dynamic import to avoid SSR issues
    const initChart = async () => {
      try {
        const { createChart, CrosshairMode } = await import('lightweight-charts')
        
        // Wait for the container to be properly sized
        await new Promise(resolve => setTimeout(resolve, 100))
        
        if (!chartContainerRef.current) return
        
        const containerWidth = chartContainerRef.current.clientWidth || chartContainerRef.current.offsetWidth
        const containerHeight = chartContainerRef.current.clientHeight || chartContainerRef.current.offsetHeight
        
        const chart = createChart(chartContainerRef.current!, {
          width: containerWidth,
          height: containerHeight,
          layout: {
            background: { color: 'transparent' },
            textColor: '#1f2937',
          },
          grid: {
            vertLines: { color: '#e2e8f0' },
            horzLines: { color: '#e2e8f0' },
          },
          crosshair: {
            mode: showCrosshair ? CrosshairMode.Normal : CrosshairMode.Hidden,
          },
          rightPriceScale: {
            borderColor: '#e2e8f0',
            autoScale: true,
            scaleMargins: {
              top: 0.1,
              bottom: 0.1,
            },
            minimumWidth: 50,
            entireTextOnly: false,
            visible: true,
            borderVisible: false,
            alignLabels: true,
          },
          leftPriceScale: {
            visible: false,
          },
          timeScale: {
            borderColor: '#e2e8f0',
            timeVisible: true,
            secondsVisible: false,
            barSpacing: 6,
            fixLeftEdge: false,
            fixRightEdge: true,
          },
          handleScroll: {
            mouseWheel: true,
            pressedMouseMove: true,
            horzTouchDrag: true,
            vertTouchDrag: true,
          },
          handleScale: {
            axisPressedMouseMove: true,
            mouseWheel: true,
            pinch: true,
          },
        })

        chartRef.current = chart

        const lineSeries = chart.addLineSeries({
          color: '#2962FF',
          lineWidth: 2,
        })
        
        // Apply scale margins directly to the series price scale
        lineSeries.priceScale().applyOptions({
          scaleMargins: {
            top: 0.05,
            bottom: 0.05,
          },
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
            const newWidth = chartContainerRef.current.clientWidth || chartContainerRef.current.offsetWidth
            const newHeight = chartContainerRef.current.clientHeight || chartContainerRef.current.offsetHeight
            
            chart.applyOptions({
              width: newWidth,
              height: newHeight,
            })
            
            // Force chart to redraw with proper dimensions
            chart.timeScale().fitContent()
          }
        }

        // Use ResizeObserver for better resize detection
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target === chartContainerRef.current) {
              handleResize()
            }
          }
        })

        if (chartContainerRef.current) {
          resizeObserver.observe(chartContainerRef.current)
        }

        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
          resizeObserver.disconnect()
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

  useEffect(() => {
    if (chartRef.current) {
      const { CrosshairMode } = require('lightweight-charts');
      chartRef.current.applyOptions({
        crosshair: {
          mode: showCrosshair ? CrosshairMode.Normal : CrosshairMode.Hidden,
        },
      })
    }
  }, [showCrosshair])

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-full bg-background chart-container"
      data-chart-container="true"
      style={{ 
        paddingRight: 0,
        marginRight: 0,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        minWidth: '100%',
        minHeight: '100%'
      }}
    />
  )
}

