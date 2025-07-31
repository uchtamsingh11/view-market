'use client'

import { useState, useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { Wifi, WifiOff, Globe, Server, Zap } from "lucide-react"

interface SocketPopupProps {
  onClose: () => void;
  onConnectionSelect?: (connection: string) => void;
}

// Connection categories
const categories = [
  { name: "Active", icon: "🟢", color: "#10B981" },
  { name: "All", icon: "🌐", color: "#6B7280" },
  { name: "Real-time", icon: "⚡", color: "#3B82F6" },
  { name: "Delayed", icon: "⏱️", color: "#F59E0B" },
  { name: "Historical", icon: "📚", color: "#8B5CF6" },
  { name: "Custom", icon: "⚙️", color: "#14B8A6" }
];

// Sample connection data
const placeholderConnections = [
  { name: "NYSE Real-time", description: "New York Stock Exchange", category: "Real-time", status: "Connected", latency: "12ms", favorite: true },
  { name: "NASDAQ Real-time", description: "NASDAQ Stock Market", category: "Real-time", status: "Connected", latency: "8ms", favorite: true },
  { name: "Forex Live", description: "Foreign Exchange Market", category: "Real-time", status: "Connected", latency: "15ms", favorite: false },
  { name: "Crypto WebSocket", description: "Cryptocurrency Data Feed", category: "Real-time", status: "Connected", latency: "5ms", favorite: true },
  { name: "NYSE Delayed", description: "15-minute delayed NYSE data", category: "Delayed", status: "Connected", latency: "900s", favorite: false },
  { name: "NASDAQ Delayed", description: "15-minute delayed NASDAQ data", category: "Delayed", status: "Connected", latency: "900s", favorite: false },
  { name: "Historical API", description: "Historical market data", category: "Historical", status: "Available", latency: "N/A", favorite: false },
  { name: "Custom Feed 1", description: "Custom data source", category: "Custom", status: "Disconnected", latency: "N/A", favorite: false },
  { name: "Futures Real-time", description: "Futures market data", category: "Real-time", status: "Connected", latency: "18ms", favorite: false },
  { name: "Options Chain", description: "Options market data", category: "Real-time", status: "Connected", latency: "22ms", favorite: false }
];

export function SocketPopup({ onClose, onConnectionSelect }: SocketPopupProps) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(placeholderConnections.filter(conn => conn.favorite).map(conn => conn.name))
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFavorite = (connectionName: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(connectionName)) {
        newFavorites.delete(connectionName);
      } else {
        newFavorites.add(connectionName);
      }
      return newFavorites;
    });
  };

  const allConnections = useMemo(() => {
    return placeholderConnections.map(connection => ({
      ...connection,
      searchTerms: `${connection.name} ${connection.description} ${connection.category} ${connection.status}`.toLowerCase()
    }));
  }, []);

  // Filter connections based on search and category
  const filteredConnections = useMemo(() => {
    let filtered = allConnections;
    
    if (activeCategory === "Active") {
      filtered = filtered.filter(connection => connection.status === "Connected");
    } else if (activeCategory !== "All") {
      filtered = filtered.filter(connection => connection.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(connection => 
        connection.searchTerms.includes(query) ||
        connection.name.toLowerCase().startsWith(query)
      );
    }
    
    return filtered;
  }, [allConnections, activeCategory, searchQuery]);

  // Reset selection when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredConnections]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredConnections.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && filteredConnections[selectedIndex]) {
        e.preventDefault();
        onConnectionSelect?.(filteredConnections[selectedIndex].name);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredConnections, selectedIndex, onConnectionSelect]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected":
        return <Wifi className="w-3 h-3 text-green-500" />;
      case "Disconnected":
        return <WifiOff className="w-3 h-3 text-red-500" />;
      case "Available":
        return <Server className="w-3 h-3 text-blue-500" />;
      default:
        return <Globe className="w-3 h-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/20";
      case "Disconnected":
        return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/20";
      case "Available":
        return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950/20";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={cn(
        "w-full max-w-4xl h-[650px] rounded-lg shadow-xl overflow-hidden",
        "bg-background"
      )}>
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Socket Connections</h2>
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
              placeholder="Search connections..."
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
                {filteredConnections.length > 0 ? (
                  <div className="w-full">
                    {filteredConnections.map((connection, index) => (
                      <div
                        key={connection.name}
                        className={cn(
                          "group w-full px-3 py-2 cursor-pointer transition-all border-b border-border last:border-b-0",
                          index === selectedIndex
                            ? 'bg-accent'
                            : 'hover:bg-accent/50'
                        )}
                        onClick={() => {
                          onConnectionSelect?.(connection.name);
                          onClose();
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(connection.status)}
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm text-foreground">{connection.name}</span>
                              <span className="text-xs text-muted-foreground">-</span>
                              <span className="text-xs text-muted-foreground">{connection.description}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={cn(
                              "text-xs px-2 py-1 rounded font-medium",
                              getStatusColor(connection.status)
                            )}>
                              {connection.status}
                            </span>
                            {connection.latency !== "N/A" && (
                              <span className="text-xs text-muted-foreground">
                                {connection.latency}
                              </span>
                            )}
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
                    )}>No connections found</div>
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