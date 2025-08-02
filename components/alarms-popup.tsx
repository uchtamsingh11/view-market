'use client'

import { useState, useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { AlarmClock, Bell, TrendingUp, TrendingDown, Star } from "lucide-react"

interface AlarmsPopupProps {
  onClose: () => void;
  onAlarmSelect?: (alarm: string) => void;
}

// Alarm categories
const categories = [
  { name: "Active", icon: "🔔", color: "#10B981" },
  { name: "All", icon: "📋", color: "#6B7280" },
  { name: "Price", icon: "💰", color: "#3B82F6" },
  { name: "Volume", icon: "📊", color: "#8B5CF6" },
  { name: "Technical", icon: "📈", color: "#F59E0B" },
  { name: "News", icon: "📰", color: "#F97316" },
  { name: "Custom", icon: "⚙️", color: "#14B8A6" }
];

// Sample alarms data
const placeholderAlarms = [
  { name: "AAPL > $185", description: "Apple Inc. price above $185", category: "Price", status: "Active", symbol: "AAPL", condition: "> $185", favorite: true },
  { name: "TSLA < $230", description: "Tesla Inc. price below $230", category: "Price", status: "Active", symbol: "TSLA", condition: "< $230", favorite: false },
  { name: "NVDA Volume Spike", description: "NVIDIA volume above 50M", category: "Volume", status: "Active", symbol: "NVDA", condition: "Vol > 50M", favorite: true },
  { name: "SPY RSI Oversold", description: "S&P 500 RSI below 30", category: "Technical", status: "Triggered", symbol: "SPY", condition: "RSI < 30", favorite: false },
  { name: "BTCUSD ATH", description: "Bitcoin new all-time high", category: "Price", status: "Active", symbol: "BTCUSD", condition: "> $70,000", favorite: true },
  { name: "MSFT Earnings", description: "Microsoft earnings announcement", category: "News", status: "Scheduled", symbol: "MSFT", condition: "Earnings", favorite: false },
  { name: "GOOGL MA Cross", description: "Google moving average crossover", category: "Technical", status: "Active", symbol: "GOOGL", condition: "MA Cross", favorite: false },
  { name: "AMZN Support Break", description: "Amazon support level break", category: "Technical", status: "Active", symbol: "AMZN", condition: "< $150", favorite: true },
  { name: "VIX Spike", description: "Volatility index above 25", category: "Technical", status: "Active", symbol: "VIX", condition: "> 25", favorite: false },
  { name: "Custom Alert 1", description: "User defined custom alert", category: "Custom", status: "Inactive", symbol: "CUSTOM", condition: "Custom", favorite: false }
];

export function AlarmsPopup({ onClose, onAlarmSelect }: AlarmsPopupProps) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(placeholderAlarms.filter(alarm => alarm.favorite).map(alarm => alarm.name))
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFavorite = (alarmName: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(alarmName)) {
        newFavorites.delete(alarmName);
      } else {
        newFavorites.add(alarmName);
      }
      return newFavorites;
    });
  };

  const allAlarms = useMemo(() => {
    return placeholderAlarms.map(alarm => ({
      ...alarm,
      searchTerms: `${alarm.name} ${alarm.description} ${alarm.category} ${alarm.symbol} ${alarm.status}`.toLowerCase()
    }));
  }, []);

  // Filter alarms based on search and category
  const filteredAlarms = useMemo(() => {
    let filtered = allAlarms;
    
    if (activeCategory === "Active") {
      filtered = filtered.filter(alarm => alarm.status === "Active");
    } else if (activeCategory !== "All") {
      filtered = filtered.filter(alarm => alarm.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(alarm => 
        alarm.searchTerms.includes(query) ||
        alarm.name.toLowerCase().startsWith(query)
      );
    }
    
    return filtered;
  }, [allAlarms, activeCategory, searchQuery]);

  // Reset selection when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredAlarms]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredAlarms.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && filteredAlarms[selectedIndex]) {
        e.preventDefault();
        onAlarmSelect?.(filteredAlarms[selectedIndex].name);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredAlarms, selectedIndex, onAlarmSelect]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/20";
      case "Triggered":
        return "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/20";
      case "Scheduled":
        return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20";
      case "Inactive":
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950/20";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <Bell className="w-3 h-3 text-green-500" />;
      case "Triggered":
        return <AlarmClock className="w-3 h-3 text-orange-500" />;
      case "Scheduled":
        return <AlarmClock className="w-3 h-3 text-blue-500" />;
      case "Inactive":
        return <AlarmClock className="w-3 h-3 text-gray-500" />;
      default:
        return <AlarmClock className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={cn(
        "w-full max-w-4xl h-[650px] rounded-lg shadow-xl overflow-hidden",
        "bg-background"
      )}
      onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Price Alerts & Alarms</h2>
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
              placeholder="Search alarms..."
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
                {filteredAlarms.length > 0 ? (
                  <div className="w-full">
                    {filteredAlarms.map((alarm, index) => (
                      <div
                        key={alarm.name}
                        className={cn(
                          "group w-full px-3 py-2 cursor-pointer transition-all border-b border-border last:border-b-0",
                          index === selectedIndex
                            ? 'bg-accent'
                            : 'hover:bg-accent/50'
                        )}
                        onClick={() => {
                          onAlarmSelect?.(alarm.name);
                          onClose();
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(alarm.name);
                              }}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Star
                                className={cn(
                                  "w-3 h-3 transition-colors",
                                  favorites.has(alarm.name) || alarm.favorite
                                    ? "text-yellow-500 fill-yellow-500"
                                    : ""
                                )}
                              />
                            </button>
                            {getStatusIcon(alarm.status)}
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm text-foreground">{alarm.symbol}</span>
                              <span className="text-xs text-muted-foreground">-</span>
                              <span className="text-xs text-muted-foreground">{alarm.condition}</span>
                              <span className="text-xs text-muted-foreground">-</span>
                              <span className="text-xs text-muted-foreground">{alarm.description}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={cn(
                              "text-xs px-2 py-1 rounded font-medium",
                              getStatusColor(alarm.status)
                            )}>
                              {alarm.status}
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
                    )}>No alarms found</div>
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