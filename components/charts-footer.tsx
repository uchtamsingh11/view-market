'use client'

import { motion, MotionValue, PanInfo } from 'framer-motion'

interface ChartsFooterProps {
  footerHeight: MotionValue<number>
  onPan: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
}

export function ChartsFooter({ footerHeight, onPan }: ChartsFooterProps) {
  return (
    <motion.footer
      style={{ height: footerHeight, position: 'absolute', bottom: 0, left: 0, right: 0 }}
      className="z-50 border-t-4 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0 screenshot-exclude cursor-row-resize overflow-hidden"
      onPan={onPan}
    >
      <div className="absolute top-0 left-0 right-0 flex h-10 items-center justify-start px-6 space-x-8">
        <span className="pb-1">Broker</span>
        <span className="pb-1">Code Editor</span>
        <span className="pb-1">Strategy Tester</span>
        <span className="pb-1">Optimization</span>
        <span className="pb-1">Developer</span>
      </div>
    </motion.footer>
  )
}
