'use client'

import { useState, useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { Calendar, Clock, TrendingUp, AlertCircle, Users, Star, ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarPopupProps {
  onClose: () => void;
  onEventSelect?: (event: string) => void;
}

// Calendar categories
const categories = [
  { name: "Today", icon: "📅", color: "#EF4444" },
  { name: "All", icon: "🗓️", color: "#6B7280" },
  { name: "Earnings", icon: "💰", color: "#10B981" },
  { name: "Economic", icon: "📊", color: "#3B82F6" },
  { name: "Dividends", icon: "💵", color: "#8B5CF6" },
  { name: "IPOs", icon: "🚀", color: "#F59E0B" },
  { name: "Splits", icon: "✂️", color: "#F97316" },
  { name: "Personal", icon: "👤", color: "#14B8A6" }
];

// Sample calendar events
const placeholderEvents = [
  { 
    id: "1",
    title: "AAPL Earnings Report", 
    description: "Apple Inc. Q4 2024 earnings announcement", 
    category: "Earnings", 
    date: "2024-01-25",
    time: "16:30",
    importance: "high",
    favorite: true,
    symbol: "AAPL"
  },
  { 
    id: "2",
    title: "Federal Reserve Meeting", 
    description: "FOMC interest rate decision and policy statement", 
    category: "Economic", 
    date: "2024-01-25",
    time: "14:00",
    importance: "high",
    favorite: true,
    symbol: null
  },
  { 
    id: "3",
    title: "MSFT Dividend Ex-Date", 
    description: "Microsoft Corporation dividend ex-dividend date", 
    category: "Dividends", 
    date: "2024-01-26",
    time: "09:30",
    importance: "medium",
    favorite: false,
    symbol: "MSFT"
  },
  { 
    id: "4",
    title: "Tesla Stock Split", 
    description: "TSLA 3:1 stock split effective date", 
    category: "Splits", 
    date: "2024-01-27",
    time: "09:30",
    importance: "medium",
    favorite: false,
    symbol: "TSLA"
  },
  { 
    id: "5",
    title: "GDP Report", 
    description: "Q4 2024 Gross Domestic Product preliminary report", 
    category: "Economic", 
    date: "2024-01-28",
    time: "08:30",
    importance: "high",
    favorite: true,
    symbol: null
  },
  { 
    id: "6",
    title: "NVDA Earnings", 
    description: "NVIDIA Corporation quarterly earnings call", 
    category: "Earnings", 
    date: "2024-01-29",
    time: "17:00",
    importance: "high",
    favorite: true,
    symbol: "NVDA"
  },
  { 
    id: "7",
    title: "Portfolio Review", 
    description: "Monthly portfolio performance review meeting", 
    category: "Personal", 
    date: "2024-01-30",
    time: "10:00",
    importance: "medium",
    favorite: false,
    symbol: null
  },
  { 
    id: "8",
    title: "New IPO Launch", 
    description: "TechCorp Inc. initial public offering", 
    category: "IPOs", 
    date: "2024-02-01",
    time: "09:30",
    importance: "medium",
    favorite: false,
    symbol: "TECH"
  }
];

export function CalendarPopup({ onClose, onEventSelect }: CalendarPopupProps) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(placeholderEvents.filter(event => event.favorite).map(event => event.id))
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFavorite = (eventId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(eventId)) {
        newFavorites.delete(eventId);
      } else {
        newFavorites.add(eventId);
      }
      return newFavorites;
    });
  };

  const allEvents = useMemo(() => {
    return placeholderEvents.map(event => ({
      ...event,
      searchTerms: `${event.title} ${event.description} ${event.category} ${event.symbol || ''}`.toLowerCase()
    }));
  }, []);

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    let filtered = allEvents;
    
    if (activeCategory === "Today") {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(event => event.date === today);
    } else if (activeCategory !== "All") {
      filtered = filtered.filter(event => event.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.searchTerms.includes(query) ||
        event.title.toLowerCase().startsWith(query)
      );
    }
    
    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
    
    return filtered;
  }, [allEvents, activeCategory, searchQuery]);

  // Reset selection when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredEvents]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredEvents.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && filteredEvents[selectedIndex]) {
        e.preventDefault();
        onEventSelect?.(filteredEvents[selectedIndex].title);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredEvents, selectedIndex, onEventSelect]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "low":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "border-l-red-500 bg-red-50/50 dark:bg-red-950/20";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20";
      case "low":
        return "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20";
      default:
        return "border-l-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const todayEvents = allEvents.filter(event => 
    event.date === new Date().toISOString().split('T')[0]
  ).length;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={cn(
        "w-full max-w-4xl h-[650px] rounded-lg shadow-xl overflow-hidden",
        "bg-background"
      )}>
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-medium text-foreground">Market Calendar</h2>
              {todayEvents > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {todayEvents} today
                </span>
              )}
            </div>
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
              placeholder="Search events..."
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
                const count = category.name === "Today" 
                  ? todayEvents 
                  : category.name === "All" 
                    ? allEvents.length 
                    : allEvents.filter(e => e.category === category.name).length;

                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={cn(
                      "text-left px-3 py-3 text-xs font-medium transition-all border-b last:border-b-0 border-border min-h-[52px] flex items-center justify-between",
                      activeCategory === category.name
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    <span>{category.name}</span>
                    {count > 0 && (
                      <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                        {count}
                      </span>
                    )}
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
                {filteredEvents.length > 0 ? (
                  <div className="w-full">
                    {filteredEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className={cn(
                          "group w-full px-3 py-3 cursor-pointer transition-all border-b border-border last:border-b-0 border-l-4",
                          getImportanceColor(event.importance),
                          index === selectedIndex
                            ? 'bg-accent'
                            : 'hover:bg-accent/50'
                        )}
                        onClick={() => {
                          onEventSelect?.(event.title);
                          onClose();
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getImportanceIcon(event.importance)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm text-foreground truncate">
                                  {event.title}
                                </span>
                                {event.symbol && (
                                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                                    {event.symbol}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {event.description}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-3">
                                  <span className="text-xs text-muted-foreground flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(event.date)}</span>
                                  </span>
                                  <span className="text-xs text-muted-foreground flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatTime(event.time)}</span>
                                  </span>
                                </div>
                                <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                                  {event.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(event.id);
                              }}
                              className="p-1 rounded hover:bg-accent-foreground/10"
                            >
                              <Star className={cn(
                                "w-3 h-3",
                                favorites.has(event.id) 
                                  ? "text-yellow-500 fill-yellow-500" 
                                  : "text-muted-foreground"
                              )} />
                            </button>
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
                    )}>No events found</div>
                    <div className={cn(
                      "text-sm mt-2",
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    )}>Try adjusting your search or browse categories</div>
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