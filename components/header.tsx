'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X, Calendar, MessageSquare, BarChart3, TrendingUp, Zap, Shield, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'framer-motion'

// Dropdown data
const featuresDropdown = [
    {
        icon: MessageSquare,
        title: 'Caption Generation',
        description: 'Generate captions using AI technology.',
        href: '#caption-generation'
    },
    {
        icon: Calendar,
        title: 'Post Scheduling',
        description: 'Schedule posts effortlessly in advance.',
        href: '#post-scheduling'
    },
    {
        icon: BarChart3,
        title: 'Analytics Dashboard',
        description: 'Track social media campaign performance.',
        href: '#analytics'
    }
]

const tradingToolsDropdown = [
    {
        icon: TrendingUp,
        title: 'Market Analysis',
        description: 'Advanced market analysis tools.',
        href: '#market-analysis'
    },
    {
        icon: Zap,
        title: 'Real-time Data',
        description: 'Live market data and insights.',
        href: '#real-time-data'
    },
    {
        icon: Shield,
        title: 'Risk Management',
        description: 'Comprehensive risk management tools.',
        href: '#risk-management'
    }
]

const menuItems = [
    { name: 'Features', href: '#features', hasDropdown: true, dropdownItems: featuresDropdown },
    { name: 'Brokers', href: '#brokers' },
    { name: 'Trading Tools', href: '#tools', hasDropdown: true, dropdownItems: tradingToolsDropdown },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
]

// Dropdown Component
const DropdownMenu = ({ items, isVisible }: { items: typeof featuresDropdown, isVisible: boolean }) => {
    return (
        <div className={cn(
            "absolute top-full left-0 mt-2 w-80 bg-background/95 backdrop-blur-xl border border-border rounded-lg shadow-lg transition-all duration-200 z-50",
            isVisible ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
        )}>
            <div className="p-4">
                <div className="space-y-3">
                    {items.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex items-start gap-3 p-3 rounded-md hover:bg-accent/50 transition-colors duration-150 group"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-foreground text-sm mb-1">{item.title}</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn('fixed z-20 w-full border-b transition-colors duration-150', scrolled && 'bg-background/50 backdrop-blur-3xl')}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li 
                                            key={index} 
                                            className="relative"
                                            onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                                            onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                                        >
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground flex items-center gap-1 duration-150 py-2">
                                                <span>{item.name}</span>
                                                {item.hasDropdown && (
                                                    <ChevronDown className={cn(
                                                        "w-4 h-4 transition-transform duration-200",
                                                        activeDropdown === item.name && "rotate-180"
                                                    )} />
                                                )}
                                            </Link>
                                            {item.hasDropdown && item.dropdownItems && (
                                                <DropdownMenu 
                                                    items={item.dropdownItems} 
                                                    isVisible={activeDropdown === item.name}
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground flex items-center gap-1 duration-150">
                                                <span>{item.name}</span>
                                                {item.hasDropdown && (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </Link>
                                            {item.hasDropdown && item.dropdownItems && (
                                                <div className="mt-3 ml-4 space-y-2">
                                                    {item.dropdownItems.map((dropdownItem, dropdownIndex) => {
                                                        const Icon = dropdownItem.icon
                                                        return (
                                                            <Link
                                                                key={dropdownIndex}
                                                                href={dropdownItem.href}
                                                                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors duration-150 text-sm"
                                                            >
                                                                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                                                                <div>
                                                                    <div className="font-medium text-foreground">{dropdownItem.title}</div>
                                                                    <div className="text-xs text-muted-foreground">{dropdownItem.description}</div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm">
                                    <Link href="#">
                                        <span>Sign In</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm">
                                    <Link href="#">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
