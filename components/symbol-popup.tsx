'use client'

import { useState, useEffect, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Star, TrendingUp, TrendingDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

interface SymbolPopupProps {
  onClose: () => void;
  onSymbolSelect?: (symbol: string) => void;
}

// Modern category icons and styling
const categories = [
  { name: "Watchlist", icon: "⭐", color: "#FFD700" },
  { name: "All", icon: "🌐", color: "#6B7280" },
  { name: "Stocks", icon: "📈", color: "#10B981" },
  { name: "Futures", icon: "📊", color: "#3B82F6" },
  { name: "Forex", icon: "💱", color: "#8B5CF6" },
  { name: "Options", icon: "⚙️", color: "#F59E0B" },
  { name: "Crypto", icon: "🪙", color: "#F97316" },
  { name: "Indices", icon: "📉", color: "#EF4444" },
  { name: "Bonds", icon: "🏛️", color: "#14B8A6" },
  { name: "Economy", icon: "🌍", color: "#6366F1" }
];

// Premium symbol data with enhanced information
const placeholderSymbols = [
  { name: "AAPL", description: "Apple Inc.", category: "Stocks", change: "+2.34%", price: "$182.52", volume: "58.2M", favorite: false },
  { name: "GOOGL", description: "Alphabet Inc.", category: "Stocks", change: "+1.87%", price: "$138.21", volume: "28.1M", favorite: false },
  { name: "MSFT", description: "Microsoft Corp.", category: "Stocks", change: "-0.56%", price: "$378.85", volume: "22.4M", favorite: false },
  { name: "AMZN", description: "Amazon.com Inc.", category: "Stocks", change: "+3.21%", price: "$156.33", volume: "41.7M", favorite: false },
  { name: "TSLA", description: "Tesla, Inc.", category: "Stocks", change: "-1.45%", price: "$238.45", volume: "95.3M", favorite: false },
  { name: "NVDA", description: "NVIDIA Corp.", category: "Stocks", change: "+4.12%", price: "$875.28", volume: "45.6M", favorite: false },
  { name: "META", description: "Meta Platforms", category: "Stocks", change: "+2.89%", price: "$492.15", volume: "18.9M", favorite: false },
  { name: "EURUSD", description: "Euro/US Dollar", category: "Forex", change: "+0.12%", price: "1.0852", volume: "-", favorite: false },
  { name: "BTCUSD", description: "Bitcoin/US Dollar", category: "Crypto", change: "+5.67%", price: "$67,845", volume: "$28.5B", favorite: false },
  { name: "ETHUSD", description: "Ethereum/US Dollar", category: "Crypto", change: "+3.45%", price: "$3,456", volume: "$15.2B", favorite: false },
  { name: "SPX500", description: "S&P 500 Index", category: "Indices", change: "+0.89%", price: "5,234.18", volume: "-", favorite: false },
  { name: "NDX100", description: "NASDAQ 100", category: "Indices", change: "+1.23%", price: "18,245.67", volume: "-", favorite: false }
];

export function SymbolPopup({ onClose, onSymbolSelect }: SymbolPopupProps) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(placeholderSymbols.filter(symbol => symbol.favorite).map(symbol => symbol.name))
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFavorite = (symbolName: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(symbolName)) {
        newFavorites.delete(symbolName);
      } else {
        newFavorites.add(symbolName);
      }
      return newFavorites;
    });
  };

  // Enhanced symbol data with more realistic trading information
  const allSymbols = useMemo(() => {
    return placeholderSymbols.map(symbol => ({
      ...symbol,
      searchTerms: `${symbol.name} ${symbol.description} ${symbol.category}`.toLowerCase()
    }));
  }, []);

  // Filter symbols based on search and category
  const filteredSymbols = useMemo(() => {
    let filtered = allSymbols;
    
    if (activeCategory !== "All") {
      filtered = filtered.filter(symbol => symbol.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(symbol => 
        symbol.searchTerms.includes(query) ||
        symbol.name.toLowerCase().startsWith(query)
      );
    }
    
    return filtered;
  }, [allSymbols, activeCategory, searchQuery]);

  // Reset selection when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredSymbols]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSymbols.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && filteredSymbols[selectedIndex]) {
        e.preventDefault();
        onSymbolSelect?.(filteredSymbols[selectedIndex].name);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredSymbols.length, selectedIndex, onSymbolSelect]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearch = (value: string) => {
    setIsSearching(true);
    setSearchQuery(value);
    setTimeout(() => setIsSearching(false), 300);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={cn(
          "w-full max-w-4xl h-[650px] rounded-lg shadow-md overflow-hidden",
          "bg-background border border-border"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Select Symbol</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search symbols..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-base border border-input bg-input text-foreground placeholder-muted-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex h-[570px]">
          {/* Enhanced Categories Sidebar */}
          <div className="w-44 bg-background border-r border-border">
            <div className="h-full flex flex-col">
              {categories.map((category, index) => {
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={cn(
                      "text-left px-3 py-3 text-sm font-medium transition-all duration-150",
                      "border-b border-border last:border-b-0 min-h-[48px] flex items-center",
                      "hover:bg-accent hover:text-accent-foreground",
                      activeCategory === category.name
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground"
                    )}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Results Section */}
            <div className="flex-1 overflow-y-hidden">
              <div className="h-full overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {filteredSymbols.length > 0 ? (
                  <div className="w-full">
                    {filteredSymbols.map((symbol, index) => (
                      <div
                        key={symbol.name}
                        className={cn(
                          "group w-full px-3 py-2 cursor-pointer transition-all duration-150",
                          "border-b border-border last:border-b-0",
                          "hover:bg-accent hover:text-accent-foreground",
                          index === selectedIndex
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        )}
                        onClick={() => {
                          onSymbolSelect?.(symbol.name);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {/* Favorite Star */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(symbol.name);
                              }}
                              className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                            >
                              <Star
                                className={cn(
                                  "w-3.5 h-3.5 transition-colors",
                                  favorites.has(symbol.name) || symbol.favorite
                                    ? "text-yellow-500 fill-yellow-500"
                                    : ""
                                )}
                              />
                            </button>
                            
                            {/* Symbol Information */}
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-base text-foreground">{symbol.name}</span>
                              <span className="text-sm text-muted-foreground">-</span>
                              <span className="text-base text-muted-foreground">{symbol.description}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-lg text-muted-foreground">No symbols found</div>
                    <div className="text-sm mt-2 text-muted-foreground">
                      Try adjusting your search or filters
                    </div>
                  </div>
                )}
              </div>
              
              {/* Hide scrollbar styles */}
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