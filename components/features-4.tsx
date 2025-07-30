import { TrendingUp, BarChart3, Zap, Bot, Shield, Layers } from 'lucide-react'

export default function Features() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">Advanced Trading Platform Built for Modern Traders</h2>
                    <p>ViewMarket AI combines powerful charting tools, extensive broker integrations, and AI-driven insights to help you make smarter trading decisions and execute with precision.</p>
                </div>

                <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Lightning Fast</h3>
                        </div>
                        <p className="text-sm">Real-time market data and instant order execution across 75+ brokers worldwide.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="size-4" />
                            <h3 className="text-sm font-medium">Advanced Charting</h3>
                        </div>
                        <p className="text-sm">Professional-grade charts with 110+ technical indicators and drawing tools.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Shield className="size-4" />

                            <h3 className="text-sm font-medium">Secure Trading</h3>
                        </div>
                        <p className="text-sm">Bank-level security with encrypted connections and secure API integrations.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Layers className="size-4" />

                            <h3 className="text-sm font-medium">Multi-Broker Support</h3>
                        </div>
                        <p className="text-sm">Connect to 75+ brokers from a single platform with unified portfolio management.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="size-4" />

                            <h3 className="text-sm font-medium">Smart Analytics</h3>
                        </div>
                        <p className="text-sm">AI-powered market analysis and trading signals to enhance your decision making.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Bot className="size-4" />

                            <h3 className="text-sm font-medium">AI Assistant</h3>
                        </div>
                        <p className="text-sm">Intelligent trading assistant that helps convert your ideas into actionable strategies.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
