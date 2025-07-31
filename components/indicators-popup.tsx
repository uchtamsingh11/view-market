'use client'

import { useState, useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { Search, Star, TrendingUp, TrendingDown } from "lucide-react"

interface IndicatorsPopupProps {
  onClose: () => void;
  onIndicatorSelect?: (indicator: string) => void;
}

// Indicator categories
const categories = [
  { name: "Popular", icon: "⭐", color: "#FFD700" },
  { name: "All", icon: "🌐", color: "#6B7280" },
  { name: "Trend", icon: "📈", color: "#10B981" },
  { name: "Momentum", icon: "⚡", color: "#3B82F6" },
  { name: "Volume", icon: "📊", color: "#8B5CF6" },
  { name: "Volatility", icon: "🌊", color: "#F59E0B" },
  { name: "Oscillators", icon: "〰️", color: "#F97316" },
  { name: "Support/Resistance", icon: "📏", color: "#EF4444" },
  { name: "Custom", icon: "⚙️", color: "#14B8A6" }
];

// Sample indicators data
const placeholderIndicators = [
  { name: "RSI", description: "Relative Strength Index", category: "Momentum", type: "Oscillator", favorite: false },
  { name: "MACD", description: "Moving Average Convergence Divergence", category: "Momentum", type: "Trend", favorite: true },
  { name: "SMA", description: "Simple Moving Average", category: "Trend", type: "Overlay", favorite: false },
  { name: "EMA", description: "Exponential Moving Average", category: "Trend", type: "Overlay", favorite: true },
  { name: "Bollinger Bands", description: "Bollinger Bands", category: "Volatility", type: "Overlay", favorite: false },
  { name: "Stochastic", description: "Stochastic Oscillator", category: "Momentum", type: "Oscillator", favorite: false },
  { name: "Volume", description: "Volume Indicator", category: "Volume", type: "Volume", favorite: false },
  { name: "ATR", description: "Average True Range", category: "Volatility", type: "Indicator", favorite: false },
  { name: "Williams %R", description: "Williams Percent Range", category: "Momentum", type: "Oscillator", favorite: false },
  { name: "CCI", description: "Commodity Channel Index", category: "Momentum", type: "Oscillator", favorite: false },
  { name: "Fibonacci", description: "Fibonacci Retracement", category: "Support/Resistance", type: "Drawing", favorite: false },
  { name: "Pivot Points", description: "Pivot Points", category: "Support/Resistance", type: "Overlay", favorite: false }
];

export function IndicatorsPopup({ onClose, onIndicatorSelect }: IndicatorsPopupProps) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(placeholderIndicators.filter(indicator => indicator.favorite).map(indicator => indicator.name))
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFavorite = (indicatorName: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(indicatorName)) {
        newFavorites.delete(indicatorName);
      } else {
        newFavorites.add(indicatorName);
      }
      return newFavorites;
    });
  };

  const allIndicators = useMemo(() => {
    return placeholderIndicators.map(indicator => ({
      ...indicator,
      searchTerms: `${indicator.name} ${indicator.description} ${indicator.category} ${indicator.type}`.toLowerCase()
    }));
  }, []);

  // Filter indicators based on search and category
  const filteredIndicators = useMemo(() => {
    let filtered = allIndicators;
    
    if (activeCategory === "Popular") {
      filtered = filtered.filter(indicator => favorites.has(indicator.name) || indicator.favorite);
    } else if (activeCategory !== "All") {
      filtered = filtered.filter(indicator => indicator.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(indicator => 
        indicator.searchTerms.includes(query) ||
        indicator.name.toLowerCase().startsWith(query)
      );
    }
    
    return filtered;
  }, [allIndicators, activeCategory, searchQuery, favorites]);

  // Reset selection when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredIndicators]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredIndicators.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && filteredIndicators[selectedIndex]) {
        e.preventDefault();
        onIndicatorSelect?.(filteredIndicators[selectedIndex].name);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredIndicators, selectedIndex, onIndicatorSelect]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={cn(
        "w-full max-w-4xl h-[650px] rounded-lg shadow-xl overflow-hidden",
        "bg-background"
      )}>
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Select Indicator</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search indicators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input bg-input text-foreground placeholder-muted-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex h-[570px]">
          {/* Categories Sidebar */}
          <div className="w-40 bg-background border-r border-border p-0">
            <div className="h-full flex flex-col">
              {categories.map((category) => {
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={cn(
                      "text-left px-3 py-3 text-xs font-medium transition-all border-b last:border-b-0 border-border min-h-[52px] flex items-center",
                      activeCategory === category.name
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Results */}
            <div className="flex-1 overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="h-full overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {filteredIndicators.length > 0 ? (
                  <div className="w-full">
                    {filteredIndicators.map((indicator, index) => (
                      <div
                        key={indicator.name}
                        className={cn(
                          "group w-full px-3 py-2 cursor-pointer transition-all border-b border-border last:border-b-0",
                          index === selectedIndex
                            ? 'bg-accent'
                            : 'hover:bg-accent/50'
                        )}
                        onClick={() => {
                          onIndicatorSelect?.(indicator.name);
                          onClose();
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(indicator.name);
                              }}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Star
                                className={cn(
                                  "w-3 h-3 transition-colors",
                                  favorites.has(indicator.name) || indicator.favorite
                                    ? "text-yellow-500 fill-yellow-500"
                                    : ""
                                )}
                              />
                            </button>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm text-foreground">{indicator.name}</span>
                              <span className="text-xs text-muted-foreground">-</span>
                              <span className="text-xs text-muted-foreground">{indicator.description}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs px-2 py-1 rounded bg-accent/50 text-accent-foreground">
                              {indicator.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className={cn(
                      "text-lg",
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    )}>No indicators found</div>
                    <div className={cn(
                      "text-sm mt-2",
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    )}>Try adjusting your search or filters</div>
                  </div>
                )}
              </div>
              <style jsx>{`
                .flex-1::-webkit-scrollbar {
                  display: none;
                }
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}