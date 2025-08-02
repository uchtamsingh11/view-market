'use client'

import { useState, useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { HelpCircle, Book, Video, MessageCircle, FileText, ExternalLink } from "lucide-react"

interface HelpPopupProps {
  onClose: () => void;
  onHelpSelect?: (help: string) => void;
}

// Help categories
const categories = [
  { name: "Getting Started", icon: "🚀", color: "#10B981" },
  { name: "All", icon: "📚", color: "#6B7280" },
  { name: "Charts", icon: "📊", color: "#3B82F6" },
  { name: "Trading", icon: "💹", color: "#8B5CF6" },
  { name: "Indicators", icon: "📈", color: "#F59E0B" },
  { name: "Alerts", icon: "🔔", color: "#F97316" },
  { name: "Account", icon: "👤", color: "#EF4444" },
  { name: "Troubleshooting", icon: "🔧", color: "#14B8A6" }
];

// Sample help resources
const placeholderHelp = [
  { name: "Quick Start Guide", description: "Get started with ViewMarket in 5 minutes", category: "Getting Started", type: "Guide", url: "#", favorite: true },
  { name: "Chart Basics", description: "Understanding candlestick charts and timeframes", category: "Charts", type: "Tutorial", url: "#", favorite: false },
  { name: "Adding Indicators", description: "How to add and configure technical indicators", category: "Indicators", type: "Video", url: "#", favorite: true },
  { name: "Setting Price Alerts", description: "Create and manage price notifications", category: "Alerts", type: "Guide", url: "#", favorite: false },
  { name: "Keyboard Shortcuts", description: "Complete list of hotkeys and shortcuts", category: "Getting Started", type: "Reference", url: "#", favorite: true },
  { name: "Drawing Tools", description: "Using trend lines, fibonacci, and shapes", category: "Charts", type: "Tutorial", url: "#", favorite: false },
  { name: "Order Types", description: "Market, limit, stop orders explained", category: "Trading", type: "Guide", url: "#", favorite: false },
  { name: "Account Settings", description: "Managing your profile and preferences", category: "Account", type: "Guide", url: "#", favorite: false },
  { name: "Data Feeds", description: "Understanding real-time vs delayed data", category: "Getting Started", type: "FAQ", url: "#", favorite: false },
  { name: "Mobile App", description: "Using ViewMarket on mobile devices", category: "Getting Started", type: "Guide", url: "#", favorite: false },
  { name: "API Documentation", description: "Developer resources and API reference", category: "Troubleshooting", type: "Documentation", url: "#", favorite: false },
  { name: "Contact Support", description: "Get help from our support team", category: "Troubleshooting", type: "Support", url: "#", favorite: true },
  { name: "Video Tutorials", description: "Complete video course library", category: "Getting Started", type: "Video", url: "#", favorite: false },
  { name: "Community Forum", description: "Join discussions with other traders", category: "Troubleshooting", type: "Community", url: "#", favorite: false }
];

export function HelpPopup({ onClose, onHelpSelect }: HelpPopupProps) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("Getting Started");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(placeholderHelp.filter(help => help.favorite).map(help => help.name))
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFavorite = (helpName: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(helpName)) {
        newFavorites.delete(helpName);
      } else {
        newFavorites.add(helpName);
      }
      return newFavorites;
    });
  };

  const allHelp = useMemo(() => {
    return placeholderHelp.map(help => ({
      ...help,
      searchTerms: `${help.name} ${help.description} ${help.category} ${help.type}`.toLowerCase()
    }));
  }, []);

  // Filter help based on search and category
  const filteredHelp = useMemo(() => {
    let filtered = allHelp;
    
    if (activeCategory !== "All") {
      filtered = filtered.filter(help => help.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(help => 
        help.searchTerms.includes(query) ||
        help.name.toLowerCase().startsWith(query)
      );
    }
    
    return filtered;
  }, [allHelp, activeCategory, searchQuery]);

  // Reset selection when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredHelp]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredHelp.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && filteredHelp[selectedIndex]) {
        e.preventDefault();
        onHelpSelect?.(filteredHelp[selectedIndex].name);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredHelp, selectedIndex, onHelpSelect]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Guide":
        return <Book className="w-3 h-3 text-blue-500" />;
      case "Video":
        return <Video className="w-3 h-3 text-red-500" />;
      case "Tutorial":
        return <FileText className="w-3 h-3 text-green-500" />;
      case "FAQ":
        return <HelpCircle className="w-3 h-3 text-orange-500" />;
      case "Support":
        return <MessageCircle className="w-3 h-3 text-purple-500" />;
      case "Community":
        return <MessageCircle className="w-3 h-3 text-indigo-500" />;
      case "Documentation":
        return <FileText className="w-3 h-3 text-gray-500" />;
      case "Reference":
        return <Book className="w-3 h-3 text-teal-500" />;
      default:
        return <HelpCircle className="w-3 h-3 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Guide":
        return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20";
      case "Video":
        return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/20";
      case "Tutorial":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/20";
      case "FAQ":
        return "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/20";
      case "Support":
        return "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/20";
      case "Community":
        return "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/20";
      case "Documentation":
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950/20";
      case "Reference":
        return "text-teal-600 bg-teal-50 dark:text-teal-400 dark:bg-teal-950/20";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950/20";
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
            <h2 className="text-lg font-medium text-foreground">Help & Support</h2>
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
              placeholder="Search help topics..."
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
                {filteredHelp.length > 0 ? (
                  <div className="w-full">
                    {filteredHelp.map((help, index) => (
                      <div
                        key={help.name}
                        className={cn(
                          "group w-full px-3 py-2 cursor-pointer transition-all border-b border-border last:border-b-0",
                          index === selectedIndex
                            ? 'bg-accent'
                            : 'hover:bg-accent/50'
                        )}
                        onClick={() => {
                          onHelpSelect?.(help.name);
                          onClose();
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(help.type)}
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm text-foreground">{help.name}</span>
                              <span className="text-xs text-muted-foreground">-</span>
                              <span className="text-xs text-muted-foreground">{help.description}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={cn(
                              "text-xs px-2 py-1 rounded font-medium",
                              getTypeColor(help.type)
                            )}>
                              {help.type}
                            </span>
                            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    )}>No help topics found</div>
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