'use client'

import { Button } from "@/components/ui/button";

export function ChartsFooter() {
  return (
    <footer className="h-12 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
      <div className="px-6 h-full">
        <div className="flex h-full items-center justify-start gap-4">
          <Button variant="outline" size="sm">Broker</Button>
          <Button variant="outline" size="sm">Code Editor</Button>
          <Button variant="outline" size="sm">Strategy Tester</Button>
          <Button variant="outline" size="sm">Optimization</Button>
          <Button variant="outline" size="sm">Developer</Button>
        </div>
      </div>
    </footer>
  )
}
