/**
 * Date and Time utility functions
 * Handles timezone-aware date operations for the entire project
 */

import { DATE_TIME_CONFIG } from '@/config/dateTime'

/**
 * Format date to yyyy-MM-dd string (local timezone)
 * @param date - Date object or string
 * @returns Formatted date string
 */
export function formatDateToLocal(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get current date in yyyy-MM-dd format (local timezone)
 * @returns Current date string
 */
export function getCurrentDate(): string {
  return formatDateToLocal(new Date())
}

/**
 * Get date range for date picker
 * @param daysFromNow - Number of days from current date
 * @returns Object with min and max date strings
 */
export function getDateRange(daysFromNow: number = DATE_TIME_CONFIG.DEFAULT_DATE_RANGE_DAYS) {
  const now = new Date()
  const max = new Date()
  max.setDate(max.getDate() + daysFromNow)
  
  return {
    min: formatDateToLocal(now),
    max: formatDateToLocal(max)
  }
}

/**
 * Round minute up to nearest interval (0, 10, 20, 30, 40, 50)
 * @param minute - Current minute (0-59)
 * @returns Rounded minute
 */
export function roundMinuteUp(minute: number): number {
  return Math.ceil(minute / DATE_TIME_CONFIG.MINUTE_INTERVALS) * DATE_TIME_CONFIG.MINUTE_INTERVALS
}

/**
 * Get current time with rounded minutes
 * @param addMinutes - Minutes to add to current time
 * @returns Object with hour and minute
 */
export function getCurrentTimeRounded(addMinutes: number = DATE_TIME_CONFIG.DEFAULT_TIME_OFFSET_MINUTES) {
  const now = new Date()
  now.setMinutes(now.getMinutes() + addMinutes)
  
  const currentMinute = now.getMinutes()
  let roundedMinute = roundMinuteUp(currentMinute)
  let hour = now.getHours()
  
  // If minute is 60, move to next hour and set minute to 0
  if (roundedMinute === 60) {
    hour = (hour + 1) % 24
    roundedMinute = 0
  }
  
  return {
    hour,
    minute: roundedMinute,
    date: formatDateToLocal(now)
  }
}

/**
 * Format time to HH:mm string
 * @param hour - Hour (0-23)
 * @param minute - Minute (0-59)
 * @returns Formatted time string
 */
export function formatTime(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

/**
 * Get time in minutes from now with rounded minutes
 * @param minutes - Minutes to add to current time
 * @returns Formatted time string
 */
export function getTimeInMinutes(minutes: number): string {
  const now = new Date()
  now.setMinutes(now.getMinutes() + minutes)
  
  const currentMinute = now.getMinutes()
  let roundedMinute = roundMinuteUp(currentMinute)
  let hour = now.getHours()
  
  // If minute is 60, move to next hour and set minute to 0
  if (roundedMinute === 60) {
    hour = (hour + 1) % 24
    roundedMinute = 0
  }
  
  return formatTime(hour, roundedMinute)
}

/**
 * Format date and time for display
 * @param date - Date string (yyyy-MM-dd)
 * @param time - Time string (HH:mm)
 * @returns Formatted date time string
 */
export function formatDateTime(date: string, time: string): string {
  const dateObj = new Date(date + 'T' + time)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return dateObj.toLocaleDateString(DATE_TIME_CONFIG.LOCALE, options)
}

/**
 * Get current time string (HH:mm)
 * @returns Current time string
 */
export function getCurrentTime(): string {
  const now = new Date()
  return formatTime(now.getHours(), now.getMinutes())
}
