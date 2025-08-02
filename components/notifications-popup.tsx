'use client'

import { useState, useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { Bell, TrendingUp, AlertTriangle, Info, CheckCircle, X, Star } from "lucide-react"

interface NotificationsPopupProps {
  onClose: () => void;
  onNotificationSelect?: (notification: string) => void;
}

// Notification categories
const categories = [
  { name: "Unread", icon: "🔔", color: "#EF4444" },
  { name: "All", icon: "📋", color: "#6B7280" },
  { name: "Price Alerts", icon: "💰", color: "#10B981" },
  { name: "News", icon: "📰", color: "#3B82F6" },
  { name: "System", icon: "⚙️", color: "#8B5CF6" },
  { name: "Trading", icon: "📈", color: "#F59E0B" },
  { name: "Account", icon: "👤", color: "#F97316" },
  { name: "Archived", icon: "📦", color: "#6B7280" }
];

// Sample notifications
const placeholderNotifications = [
  { 
    id: "1",
    title: "AAPL Price Alert", 
    message: "Apple Inc. has reached your target price of $150.00", 
    category: "Price Alerts", 
    type: "alert", 
    time: "2 minutes ago",
    read: false,
    favorite: true,
    priority: "high"
  },
  { 
    id: "2",
    title: "Market News", 
    message: "Federal Reserve announces interest rate decision", 
    category: "News", 
    type: "news", 
    time: "15 minutes ago",
    read: false,
    favorite: false,
    priority: "medium"
  },
  { 
    id: "3",
    title: "Order Executed", 
    message: "Your buy order for 100 shares of TSLA has been filled at $245.50", 
    category: "Trading", 
    type: "success", 
    time: "1 hour ago",
    read: true,
    favorite: false,
    priority: "high"
  },
  { 
    id: "4",
    title: "System Maintenance", 
    message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST", 
    category: "System", 
    type: "info", 
    time: "3 hours ago",
    read: false,
    favorite: false,
    priority: "low"
  },
  { 
    id: "5",
    title: "Account Verification", 
    message: "Your account verification has been completed successfully", 
    category: "Account", 
    type: "success", 
    time: "1 day ago",
    read: true,
    favorite: true,
    priority: "medium"
  },
  { 
    id: "6",
    title: "NVDA Volume Alert", 
    message: "NVIDIA Corp. trading volume is 3x above average", 
    category: "Price Alerts", 
    type: "alert", 
    time: "2 days ago",
    read: true,
    favorite: false,
    priority: "medium"
  },
  { 
    id: "7",
    title: "Earnings Report", 
    message: "Microsoft Corporation will report earnings after market close", 
    category: "News", 
    type: "info", 
    time: "3 days ago",
    read: true,
    favorite: false,
    priority: "low"
  },
  { 
    id: "8",
    title: "Stop Loss Triggered", 
    message: "Your stop loss order for AMZN has been executed at $135.25", 
    category: "Trading", 
    type: "alert", 
    time: "1 week ago",
    read: true,
    favorite: false,
    priority: "high"
  }
];

export function NotificationsPopup({ onClose, onNotificationSelect }: NotificationsPopupProps) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("Unread");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notifications, setNotifications] = useState(placeholderNotifications);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(placeholderNotifications.filter(notif => notif.favorite).map(notif => notif.id))
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (notificationId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(notificationId)) {
        newFavorites.delete(notificationId);
      } else {
        newFavorites.add(notificationId);
      }
      return newFavorites;
    });
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const allNotifications = useMemo(() => {
    return notifications.map(notification => ({
      ...notification,
      searchTerms: `${notification.title} ${notification.message} ${notification.category}`.toLowerCase()
    }));
  }, [notifications]);

  // Filter notifications based on search and category
  const filteredNotifications = useMemo(() => {
    let filtered = allNotifications;
    
    if (activeCategory === "Unread") {
      filtered = filtered.filter(notif => !notif.read);
    } else if (activeCategory === "Archived") {
      filtered = filtered.filter(notif => notif.read);
    } else if (activeCategory !== "All") {
      filtered = filtered.filter(notif => notif.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(notif => 
        notif.searchTerms.includes(query) ||
        notif.title.toLowerCase().startsWith(query)
      );
    }
    
    // Sort by time (newest first) and priority
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 1;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 1;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
    
    return filtered;
  }, [allNotifications, activeCategory, searchQuery]);

  // Reset selection when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredNotifications]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredNotifications.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && filteredNotifications[selectedIndex]) {
        e.preventDefault();
        const notification = filteredNotifications[selectedIndex];
        markAsRead(notification.id);
        onNotificationSelect?.(notification.title);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredNotifications, selectedIndex, onNotificationSelect]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const getTypeIcon = (type: string, priority: string) => {
    const iconClass = cn(
      "w-4 h-4",
      priority === "high" ? "text-red-500" : 
      priority === "medium" ? "text-yellow-500" : "text-blue-500"
    );

    switch (type) {
      case "alert":
        return <AlertTriangle className={iconClass} />;
      case "success":
        return <CheckCircle className={iconClass} />;
      case "news":
        return <TrendingUp className={iconClass} />;
      case "info":
        return <Info className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        ref={popupRef}
        className={cn(
          "w-full max-w-4xl h-[650px] rounded-lg shadow-xl overflow-hidden",
          "bg-background"
        )}
      >
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-medium text-foreground">Notifications</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
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
              placeholder="Search notifications..."
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
                const count = category.name === "Unread" 
                  ? unreadCount 
                  : category.name === "All" 
                    ? notifications.length 
                    : notifications.filter(n => n.category === category.name).length;

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
                {filteredNotifications.length > 0 ? (
                  <div className="w-full">
                    {filteredNotifications.map((notification, index) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "group w-full px-3 py-3 cursor-pointer transition-all border-b border-border last:border-b-0 border-l-4",
                          getPriorityColor(notification.priority),
                          index === selectedIndex
                            ? 'bg-accent'
                            : 'hover:bg-accent/50',
                          !notification.read && 'bg-blue-50/50 dark:bg-blue-950/20'
                        )}
                        onClick={() => {
                          markAsRead(notification.id);
                          onNotificationSelect?.(notification.title);
                          onClose();
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getTypeIcon(notification.type, notification.priority)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className={cn(
                                  "font-medium text-sm text-foreground truncate",
                                  !notification.read && "font-semibold"
                                )}>
                                  {notification.title}
                                </span>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {notification.time}
                                </span>
                                <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                                  {notification.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(notification.id);
                              }}
                              className="p-1 rounded hover:bg-accent-foreground/10"
                            >
                              <Star className={cn(
                                "w-3 h-3",
                                favorites.has(notification.id) 
                                  ? "text-yellow-500 fill-yellow-500" 
                                  : "text-muted-foreground"
                              )} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="p-1 rounded hover:bg-accent-foreground/10"
                            >
                              <X className="w-3 h-3 text-muted-foreground hover:text-red-500" />
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
                    )}>No notifications found</div>
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