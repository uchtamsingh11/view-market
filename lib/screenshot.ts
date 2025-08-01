import html2canvas from 'html2canvas'
import { takeScreenshotFallback, takeCanvasScreenshot } from './screenshot-fallback'

export interface ScreenshotOptions {
  filename?: string
  quality?: number
  format?: 'png' | 'jpeg'
  excludeElements?: string[]
  useFallback?: boolean
}

export const takeScreenshot = async (options: ScreenshotOptions = {}) => {
  const {
    filename = `chart-screenshot-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`,
    quality = 1.0,
    format = 'png',
    excludeElements = [],
    useFallback = false
  } = options

  // If fallback is requested, use the fallback method
  if (useFallback) {
    return await takeScreenshotFallback({ filename, quality, format })
  }

  try {
    // First, try to find a canvas element (TradingView charts often use canvas)
    const canvasElement = document.querySelector('canvas')
    if (canvasElement) {
      try {
        const canvasResult = await takeCanvasScreenshot('canvas', { filename, quality, format })
        if (canvasResult.success) {
          return canvasResult
        }
      } catch (error) {
        console.warn('Canvas screenshot failed, falling back to html2canvas:', error)
      }
    }

    // Get the main chart container - specifically target the chart area
    const chartContainer = document.querySelector('main') || document.querySelector('[data-chart-container]') || document.body
    
    if (!chartContainer) {
      throw new Error('Chart container not found')
    }

    // Configure html2canvas options with better error handling
    const canvas = await html2canvas(chartContainer as HTMLElement, {
      allowTaint: true,
      useCORS: true,
      // @ts-expect-error - scale is a valid option but not in the type definitions
      scale: 2, // Higher resolution
      backgroundColor: '#ffffff', // White background instead of null to avoid color parsing issues
      width: (chartContainer as HTMLElement).offsetWidth,
      height: (chartContainer as HTMLElement).offsetHeight,
      logging: false, // Disable logging to reduce console noise
      foreignObjectRendering: false, // Disable foreign object rendering to avoid some parsing issues
      ignoreElements: (element: Element) => {
        // Exclude elements based on class names or selectors
        if (element.classList?.contains('screenshot-exclude')) {
          return true
        }
        return excludeElements.some(selector => {
          try {
            return element.matches?.(selector) || element.classList?.contains(selector.replace('.', ''))
          } catch {
            return false
          }
        })
      },
      onclone: (clonedDoc: Document, element: HTMLElement) => {
        try {
          // Remove any elements that shouldn't be in the screenshot
          const excludeSelectors = ['.screenshot-exclude', ...excludeElements]
          excludeSelectors.forEach(selector => {
            try {
              const elements = clonedDoc.querySelectorAll(selector)
              elements.forEach((el: Element) => el.remove())
            } catch (error) {
              console.warn(`Failed to remove elements with selector: ${selector}`, error)
            }
          })

          // Fix potential color issues by normalizing CSS
          const allElements = clonedDoc.querySelectorAll('*')
          allElements.forEach((el: Element) => {
            try {
              const computedStyle = window.getComputedStyle(el as Element)
              const htmlEl = el as HTMLElement
              
              // Replace problematic color functions with fallbacks
              if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('lab(')) {
                htmlEl.style.backgroundColor = 'transparent'
              }
              if (computedStyle.color && computedStyle.color.includes('lab(')) {
                htmlEl.style.color = 'inherit'
              }
              if (computedStyle.borderColor && computedStyle.borderColor.includes('lab(')) {
                htmlEl.style.borderColor = 'transparent'
              }
            } catch (error) {
              // Ignore individual element errors
            }
          })
        } catch (error) {
          console.warn('Error in onclone callback:', error)
        }
      }
    })

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create blob from canvas'))
        }
      }, `image/${format}`, quality)
    })

    // Create download link and trigger download
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up
    URL.revokeObjectURL(url)

    return {
      success: true,
      filename,
      size: blob.size
    }
  } catch (error) {
    console.error('Screenshot failed:', error)
    
    // If html2canvas fails, try the fallback method
    console.log('Attempting fallback screenshot method...')
    return await takeScreenshotFallback({ filename, quality, format })
  }
}

export const takeFullPageScreenshot = async (options: ScreenshotOptions = {}) => {
  const {
    filename = `full-page-screenshot-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`,
    quality = 1.0,
    format = 'png'
  } = options

  try {
    const canvas = await html2canvas(document.body, {
      allowTaint: true,
      useCORS: true,
      // @ts-expect-error - scale is a valid option but not in the type definitions
      scale: 1,
      height: window.innerHeight,
      width: window.innerWidth,
      scrollX: 0,
      scrollY: 0,
      ignoreElements: (element: Element) => {
        return element.classList?.contains('screenshot-exclude')
      }
    })

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create blob from canvas'))
        }
      }, `image/${format}`, quality)
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return {
      success: true,
      filename,
      size: blob.size
    }
  } catch (error) {
    console.error('Full page screenshot failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}