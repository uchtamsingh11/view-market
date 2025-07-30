'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChartBarIncreasingIcon, Database, Fingerprint, IdCard } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BorderBeam } from '@/components/magicui/border-beam'

export default function Features() {
    type ImageKey = 'item-1' | 'item-2' | 'item-3' | 'item-4'
    const [activeItem, setActiveItem] = useState<ImageKey>('item-1')

    const images = {
        'item-1': {
            image: '/charts.png',
            alt: 'Database visualization',
        },
        'item-2': {
            image: '/music.png',
            alt: 'Security authentication',
        },
        'item-3': {
            image: '/mail2.png',
            alt: 'Identity management',
        },
        'item-4': {
            image: '/payments.png',
            alt: 'Analytics dashboard',
        },
    }

    const features = [
        {
            id: 'item-1' as ImageKey,
            icon: Database,
            title: 'Advanced Database Management',
            description: 'Powerful database tools with real-time visualization and analytics to help you manage your data efficiently.',
        },
        {
            id: 'item-2' as ImageKey,
            icon: Fingerprint,
            title: 'Security & Authentication',
            description: 'Enterprise-grade security features including multi-factor authentication and advanced user management.',
        },
        {
            id: 'item-3' as ImageKey,
            icon: IdCard,
            title: 'Identity Management',
            description: 'Comprehensive identity and access management solutions for teams of all sizes.',
        },
        {
            id: 'item-4' as ImageKey,
            icon: ChartBarIncreasingIcon,
            title: 'Analytics Dashboard',
            description: 'Real-time analytics and reporting tools to track performance and make data-driven decisions.',
        },
    ]

    return (
        <section className="py-12 md:py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Interactive Features
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore our comprehensive suite of tools designed to enhance your workflow
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Interactive Accordion */}
                    <div className="space-y-4">
                        <Accordion
                            type="single"
                            value={activeItem}
                            onValueChange={(value) => setActiveItem(value as ImageKey)}
                            className="w-full space-y-4"
                        >
                            {features.map((feature) => {
                                const IconComponent = feature.icon
                                return (
                                    <AccordionItem
                                        key={feature.id}
                                        value={feature.id}
                                        className="border rounded-lg px-6 data-[state=open]:bg-muted/50"
                                    >
                                        <AccordionTrigger className="hover:no-underline py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                    <IconComponent className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="font-semibold">{feature.title}</h3>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6">
                                            <p className="text-muted-foreground ml-14">
                                                {feature.description}
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </div>

                    {/* Image Display */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl border bg-zinc-900 shadow-md">
                            <BorderBeam size={250} duration={12} delay={9} />
                            <div className="aspect-[4/3] relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeItem}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                    >
                                        <div className="size-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                                            <div className="text-center">
                                                <div className="text-6xl font-bold text-gray-400 dark:text-gray-600 mb-2">
                                                    {activeItem.split('-')[1]}
                                                </div>
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    {images[activeItem].alt}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 