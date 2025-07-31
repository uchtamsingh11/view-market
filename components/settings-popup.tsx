'use client'

import { useState, useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { Settings, Palette, Monitor, Bell, Shield, Database } from "lucide-react"

interface SettingsPopupProps {
  onClose: () => void;
  onSettingSelect?: (setting: string) => void;
}

// Settings categories
const categories = [
  { name: "General", icon: "⚙️", color: "#6B7280" },
  { name: "Chart", icon: "📊", color: "#10B981" },
  { name: "Display", icon: "🖥️", color: "#3B82F6" },
  { name: "Trading", icon: "💹", color: "#8B5CF6" },
  { name: "Alerts", icon: "🔔", color: "#F59E0B" },
  { name: "Data", icon: "💾", color: "#F97316" },
  { name: "Privacy", icon: "🔒", color: "#EF4444" },
  { name: "Advanced", icon: "🔧", color: "#14B8A6" }
];

// Sample settings data
const placeholderSettings = [
  { name: "Theme", description: "Light/Dark mode settings", category: "Display", type: "Toggle", value: "Dark", favorite: false },
  { name: "Chart Style", description: "Candlestick, Line, Bar charts", category: "Chart", type: "Select", value: "Candlestick", favorite: true },
  { name: "Time Zone", description: "Display timezone preference", category: "General", type: "Select", value: "UTC", favorite: false },
  { name: "Price Alerts", description: "Enable/disable price notifications", category: "Alerts", type: "Toggle", value: "Enabled", favorite: true },
  { name: "Auto-save", description: "Automatically save chart layouts", category: "General", type: "Toggle", value: "Enabled", favorite: false },
  { name: "Grid Lines", description: "Show/hide chart grid", category: "Chart", type: "Toggle", value: "Enabled", favorite: false },
  { name: "Volume Bars", description: "Display volume information", category: "Chart", type: "Toggle", value: "Enabled", favorite: true },
  { name: "Cross Hair", description: "Chart crosshair cursor", category: "Chart", type: "Toggle", value: "Enabled", favorite: false },
  { name: "Data Refresh", description: "Real-time data update interval", category: "Data", type: "Select", value: "1s", favorite: false },
  { name: "Sound Alerts", description: "Audio notifications for alerts", category: "Alerts", type: "Toggle", value: "Disabled", favorite: false },
  { name: "Order Confirmation", description: "Confirm before placing orders", category: "Trading", type: "Toggle", value: "Enabled", favorite: true },
  { name: "Privacy Mode", description: "Hide sensitive information", category: "Privacy", type: "Toggle", value: "Disabled", favorite: false },
  { name: "Advanced Charts", description: "Enable advanced charting tools", category: "Advanced", type: "Toggle", value: "Enabled", favorite: false },
  { name: "Keyboard Shortcuts", description: "Enable hotkey navigation", category: "General", type: "Toggle", value: "Enabled", favorite: false }
];

export function SettingsPopup({ onClose, onSettingSelect }: SettingsPopupProps) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("General");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(placeholderSettings.filter(setting => setting.favorite).map(setting => setting.name))
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFavorite = (settingName: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(settingName)) {
        newFavorites.delete(settingName);
      } else {
        newFavorites.add(settingName);
      }
      return newFavorites;
    });
  };

  const allSettings = useMemo(() => {
    return placeholderSettings.map(setting => ({
      ...setting,
      searchTerms: `${setting.name} ${setting.description} ${setting.category} ${setting.type}`.toLowerCase()
    }));
  }, []);

  // Filter settings based on search and category
  const filteredSettings = useMemo(() => {
    let filtered = allSettings;
    
    if (activeCategory !== "General" && activeCategory !== "All") {
      filtered = filtered.filter(setting => setting.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(setting => 
        setting.searchTerms.includes(query) ||
        setting.name.toLowerCase().startsWith(query)
      );
    }
    
    return filtered;
  }, [allSettings, activeCategory, searchQuery]);

  // Reset selection when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredSettings]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSettings.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && filteredSettings[selectedIndex]) {
        e.preventDefault();
        onSettingSelect?.(filteredSettings[selectedIndex].name);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredSettings, selectedIndex, onSettingSelect]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const getValueColor = (value: string) => {
    if (value === "Enabled" || value === "Dark") {
      return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/20";
    } else if (value === "Disabled") {
      return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/20";
    } else {
      return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20";
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
            <h2 className="text-lg font-medium text-foreground">Settings</h2>
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
              placeholder="Search settings..."
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
                {filteredSettings.length > 0 ? (
                  <div className="w-full">
                    {filteredSettings.map((setting, index) => (
                      <div
                        key={setting.name}
                        className={cn(
                          "group w-full px-3 py-2 cursor-pointer transition-all border-b border-border last:border-b-0",
                          index === selectedIndex
                            ? 'bg-accent'
                            : 'hover:bg-accent/50'
                        )}
                        onClick={() => {
                          onSettingSelect?.(setting.name);
                          onClose();
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Settings className="w-3 h-3 text-muted-foreground" />
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm text-foreground">{setting.name}</span>
                              <span className="text-xs text-muted-foreground">-</span>
                              <span className="text-xs text-muted-foreground">{setting.description}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs px-2 py-1 rounded bg-accent/50 text-accent-foreground">
                              {setting.type}
                            </span>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded font-medium",
                              getValueColor(setting.value)
                            )}>
                              {setting.value}
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
                    )}>No settings found</div>
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