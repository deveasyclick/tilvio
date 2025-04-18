/**
 * Color constants for the application
 *
 * This file centralizes all color definitions to make theme changes easier.
 * The color system includes primary, secondary, and tertiary colors with various shades.
 */

// Type for color shade keys
type ColorShade =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;

// Primary color palette (green)
export const GREEN = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e', // Main primary color
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
};

// Secondary color palette (blue)
export const BLUE = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6', // Main secondary color
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
};

// Tertiary color palette (purple)
export const PURPLE = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7', // Main tertiary color
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764',
};

// Accent color palette (amber)
export const AMBER = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b', // Main accent color
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
};

// Gray palette for neutral UI elements
export const GRAY = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
  950: '#030712',
};

// Semantic colors for feedback and status
export const SEMANTIC = {
  info: BLUE[500], // Blue
  success: GREEN[500], // Green (primary)
  warning: AMBER[500], // Amber (accent)
  error: '#ef4444', // Red
};

// Theme colors for light and dark modes
export const THEME = {
  light: {
    background: GRAY[50],
    text: GRAY[900],
    border: GRAY[200],
    primary: GREEN[500],
    secondary: BLUE[500],
    tertiary: PURPLE[500],
    accent: AMBER[500],
  },
  dark: {
    background: GRAY[900],
    text: GRAY[50],
    border: GRAY[700],
    primary: GREEN[500],
    secondary: BLUE[400], // Slightly lighter in dark mode
    tertiary: PURPLE[400], // Slightly lighter in dark mode
    accent: AMBER[400], // Slightly lighter in dark mode
  },
};

// Function to get a specific shade of the primary color
export function getPrimaryColor(shade: ColorShade = 500): string {
  return GREEN[shade];
}

// Function to get a specific shade of the secondary color
export function getSecondaryColor(shade: ColorShade = 500): string {
  return BLUE[shade];
}

// Function to get a specific shade of the tertiary color
export function getTertiaryColor(shade: ColorShade = 500): string {
  return PURPLE[shade];
}

// Function to get a specific shade of the accent color
export function getAccentColor(shade: ColorShade = 500): string {
  return AMBER[shade];
}

// Function to get a specific shade of gray
export function getGrayColor(shade: ColorShade = 500): string {
  return GRAY[shade];
}

// Export default colors (for easy imports)
export const PRIMARY_COLOR = GREEN[500];
export const SECONDARY_COLOR = BLUE[500];
export const TERTIARY_COLOR = PURPLE[500];
export const ACCENT_COLOR = AMBER[500];
