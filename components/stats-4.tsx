export default function StatsSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <div className="relative z-10 max-w-xl space-y-6">
                    <h2 className="text-4xl font-medium lg:text-5xl">Trusted by traders worldwide with proven results.</h2>
                    <p>
                        ViewMarket AI is more than just trading software. <span className="font-medium">It's a complete trading ecosystem</span> — from market analysis to trade execution, powered by artificial intelligence.
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                    <div>
                        <p>Our platform connects you to global markets through an extensive network of broker partnerships and cutting-edge trading tools</p>
                        <div className="mb-12 mt-12 grid grid-cols-2 gap-2 md:mb-0">
                            <div className="space-y-4">
                                <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">75+</div>
                                <p>Broker Integrations</p>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">110+</div>
                                <p>Trading Tools</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <blockquote className="border-l-4 pl-4">
                            <p>ViewMarket AI has revolutionized my trading approach. The AI-powered insights and seamless broker integration have significantly improved my trading performance. It's like having a professional trading team at my fingertips.</p>

                            <div className="mt-6 space-y-3">
                                <cite className="block font-medium">Sarah Chen, Professional Trader</cite>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-green-500 rounded flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">VM</span>
                                    </div>
                                </div>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    )
}
