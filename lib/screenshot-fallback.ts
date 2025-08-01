export interface FallbackScreenshotOptions {
  filename?: string
  quality?: number
  format?: 'png' | 'jpeg'
}

export const takeScreenshotFallback = async (options: FallbackScreenshotOptions = {}) => {
  const {
    filename = `chart-screenshot-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`,
    quality = 1.0,
    format = 'png'
  } = options

  try {
    // Check if the browser supports the Screen Capture API
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      throw new Error('Screen capture not supported in this browser')
    }

    // Request screen capture
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        // @ts-expect-error - mediaSource is a valid but non-standard property
        mediaSource: 'screen'
      }
    })

    // Create video element to capture the stream
    const video = document.createElement('video')
    video.srcObject = stream
    video.play()

    // Wait for video to load
    await new Promise((resolve) => {
      video.onloadedmetadata = resolve
    })

    // Create canvas and draw video frame
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      throw new Error('Could not get canvas context')
    }

    ctx.drawImage(video, 0, 0)

    // Stop the stream
    stream.getTracks().forEach(track => track.stop())

    // Convert to blob and download
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create blob from canvas'))
        }
      }, `image/${format}`, quality)
    })

    // Create download link
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
    console.error('Fallback screenshot failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Simple canvas-based screenshot for specific elements
export const takeCanvasScreenshot = async (elementSelector: string, options: FallbackScreenshotOptions = {}) => {
  const {
    filename = `element-screenshot-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`,
    quality = 1.0,
    format = 'png'
  } = options

  try {
    const element = document.querySelector(elementSelector) as HTMLElement
    if (!element) {
      throw new Error(`Element not found: ${elementSelector}`)
    }

    // Check if element is a canvas
    if (element.tagName.toLowerCase() === 'canvas') {
      const canvas = element as HTMLCanvasElement
      
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
    } else {
      throw new Error('Element is not a canvas - use html2canvas method instead')
    }
  } catch (error) {
    console.error('Canvas screenshot failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}