/**
 * Date and Time configuration for the entire project
 * Centralized settings for date/time handling
 */

export const DATE_TIME_CONFIG = {
  // Date range settings
  DEFAULT_DATE_RANGE_DAYS: 7,
  MAX_DATE_RANGE_DAYS: 365,
  
  // Time settings
  MINUTE_INTERVALS: 10, // 0, 10, 20, 30, 40, 50
  DEFAULT_TIME_OFFSET_MINUTES: 0, // No offset by default
  
  // Locale settings
  LOCALE: 'vi-VN',
  TIMEZONE: '+7', // Vietnam timezone
  
  // Date format
  DATE_FORMAT: 'yyyy-MM-dd',
  TIME_FORMAT: 'HH:mm',
  
  // Quick time options
  QUICK_TIME_OPTIONS: [
    { label: 'Bây giờ', value: 'now', isAction: true },
    { label: '30 phút nữa', minutes: 30 },
    { label: '1 giờ nữa', minutes: 60 },
    { label: '2 giờ nữa', minutes: 120 }
  ],
  
  // Scroll settings
  AUTO_SCROLL_DELAY: 100, // ms
  SCROLL_BEHAVIOR: 'smooth' as ScrollBehavior,
  SCROLL_BLOCK: 'center' as ScrollLogicalPosition
} as const

export type DateTimeConfig = typeof DATE_TIME_CONFIG
