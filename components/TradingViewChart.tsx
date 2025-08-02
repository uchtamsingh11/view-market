'use client'

import React, { useEffect, useRef } from 'react'
import { IChartApi, LineStyle, CrosshairMode, CandlestickData as LightweightCandlestickData, UTCTimestamp } from 'lightweight-charts';
import { useTheme } from '@/lib/theme-context';

interface CandlestickData {
  datetime: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface TradingViewChartProps {
  showCrosshair: boolean;
  data: CandlestickData[];
}

export function TradingViewChart({ showCrosshair, data }: TradingViewChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { theme } = useTheme()

  const applyTheme = () => {
    if (!chartRef.current) return;

    const isDark = theme === 'dark';

    chartRef.current.applyOptions({
      layout: {
        background: { color: 'transparent' },
        textColor: isDark ? 'rgba(255, 255, 255, 0.8)' : '#1f2937',
      },
      grid: {
        vertLines: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' },
        horzLines: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' },
      },
      rightPriceScale: {
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
      },
      timeScale: {
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
      },
    });
  };


  useEffect(() => {
    if (!chartContainerRef.current) return

    // Dynamic import to avoid SSR issues
    const initChart = async () => {
      try {
        const { createChart } = await import('lightweight-charts')
        
        // Wait for the container to be properly sized
        await new Promise(resolve => setTimeout(resolve, 100))
        
        if (!chartContainerRef.current) return
        
        const containerWidth = chartContainerRef.current.clientWidth || chartContainerRef.current.offsetWidth
        const containerHeight = chartContainerRef.current.clientHeight || chartContainerRef.current.offsetHeight
        
        const chart = createChart(chartContainerRef.current!, {
          width: containerWidth,
          height: containerHeight,
          crosshair: {
            mode: showCrosshair ? CrosshairMode.Normal : CrosshairMode.Hidden,
          },
          rightPriceScale: {
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

        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#26a69a',
          downColor: '#ef5350',
          borderDownColor: '#ef5350',
          borderUpColor: '#26a69a',
          wickDownColor: '#ef5350',
          wickUpColor: '#26a69a',
        });

        const formattedData = data.map(item => ({
          time: (new Date(item.datetime).getTime() / 1000) as UTCTimestamp,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));

        candlestickSeries.setData(formattedData);

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
        
        applyTheme();


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
  }, [data])

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        crosshair: {
          mode: showCrosshair ? CrosshairMode.Normal : CrosshairMode.Hidden,
        },
      })
    }
  }, [showCrosshair])

  useEffect(() => {
    applyTheme();
  }, [theme]);

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

