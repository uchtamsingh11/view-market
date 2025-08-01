'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { 
  Home, 
  HelpCircle, 
  Keyboard, 
  Sparkles, 
  CreditCard,
  User
} from 'lucide-react'

interface ProfileDropdownProps {
  onClose: () => void
}

export function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const menuItems = [
    {
      label: 'Home',
      icon: Home,
      onClick: () => {
        router.push('/')
        onClose()
      }
    },
    {
      label: 'Help Centre',
      icon: HelpCircle,
      onClick: () => {
        router.push('/support')
        onClose()
      }
    },
    {
      label: 'Keyboard Shortcuts',
      icon: Keyboard,
      onClick: () => {
        // You can implement keyboard shortcuts modal here
        console.log('Keyboard shortcuts clicked')
        onClose()
      }
    },
    {
      label: "What's New",
      icon: Sparkles,
      onClick: () => {
        // You can implement what's new modal or page here
        console.log("What's new clicked")
        onClose()
      }
    },
    {
      label: 'Pricing',
      icon: CreditCard,
      onClick: () => {
        // You can implement pricing page here
        console.log('Pricing clicked')
        onClose()
      }
    }
  ]

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 mt-1 w-56 bg-background border border-border rounded-md shadow-lg z-50"
    >
      <div className="py-1">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-3 transition-colors"
            >
              <IconComponent className="w-4 h-4" />
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ProfileButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="relative">
      <div
        className="p-2 hover:bg-accent/20 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <User className="w-5 h-5" />
      </div>
      
      {isDropdownOpen && (
        <ProfileDropdown onClose={() => setIsDropdownOpen(false)} />
      )}
    </div>
  )
}