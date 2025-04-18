# Color System Documentation

This document explains how to use the color system in the project, which is designed to make changing colors easy and consistent across the application.

## Overview

The project uses a comprehensive color system with primary, secondary, tertiary, and accent colors, each with a full range of shades. The color system is implemented using:

1. **CSS Custom Properties**: Defined in `src/index.css` using Tailwind CSS 4's `@theme` directive
2. **Color Constants**: Available in `src/constants/colors.ts` for use in JavaScript/TypeScript
3. **Tailwind Classes**: Available throughout the application (e.g., `bg-primary-500`, `text-secondary-700`)

## Color Palettes

### Primary Color (Green)

The primary color is green, with various shades available:

| Shade | Hex Code | Usage |
|-------|----------|-------|
| 50    | #f0fdf4  | Very light backgrounds, hover states |
| 100   | #dcfce7  | Light backgrounds, borders |
| 200   | #bbf7d0  | Light backgrounds, secondary buttons |
| 300   | #86efac  | Accents, highlights |
| 400   | #4ade80  | Light accents, success indicators |
| 500   | #22c55e  | **Main primary color**, buttons, links |
| 600   | #16a34a  | Hover states, focus states |
| 700   | #15803d  | Active states, text on light backgrounds |
| 800   | #166534  | Dark text, headers on light backgrounds |
| 900   | #14532d  | Very dark text, strong emphasis |
| 950   | #052e16  | Extremely dark, used sparingly |

### Secondary Color (Blue)

The secondary color is blue, complementing the primary green:

| Shade | Hex Code | Usage |
|-------|----------|-------|
| 50    | #eff6ff  | Very light backgrounds, hover states |
| 100   | #dbeafe  | Light backgrounds, borders |
| 200   | #bfdbfe  | Light backgrounds, secondary buttons |
| 300   | #93c5fd  | Accents, highlights |
| 400   | #60a5fa  | Light accents, info indicators |
| 500   | #3b82f6  | **Main secondary color**, buttons, links |
| 600   | #2563eb  | Hover states, focus states |
| 700   | #1d4ed8  | Active states, text on light backgrounds |
| 800   | #1e40af  | Dark text, headers on light backgrounds |
| 900   | #1e3a8a  | Very dark text, strong emphasis |
| 950   | #172554  | Extremely dark, used sparingly |

### Tertiary Color (Purple)

The tertiary color is purple, adding another dimension to the color scheme:

| Shade | Hex Code | Usage |
|-------|----------|-------|
| 50    | #faf5ff  | Very light backgrounds, hover states |
| 100   | #f3e8ff  | Light backgrounds, borders |
| 200   | #e9d5ff  | Light backgrounds, tertiary buttons |
| 300   | #d8b4fe  | Accents, highlights |
| 400   | #c084fc  | Light accents |
| 500   | #a855f7  | **Main tertiary color**, buttons, links |
| 600   | #9333ea  | Hover states, focus states |
| 700   | #7e22ce  | Active states, text on light backgrounds |
| 800   | #6b21a8  | Dark text, headers on light backgrounds |
| 900   | #581c87  | Very dark text, strong emphasis |
| 950   | #3b0764  | Extremely dark, used sparingly |

### Accent Color (Amber)

The accent color is amber, used for highlighting important elements:

| Shade | Hex Code | Usage |
|-------|----------|-------|
| 50    | #fffbeb  | Very light backgrounds, hover states |
| 100   | #fef3c7  | Light backgrounds, borders |
| 200   | #fde68a  | Light backgrounds, accent buttons |
| 300   | #fcd34d  | Accents, highlights |
| 400   | #fbbf24  | Light accents, warning indicators |
| 500   | #f59e0b  | **Main accent color**, buttons, links |
| 600   | #d97706  | Hover states, focus states |
| 700   | #b45309  | Active states, text on light backgrounds |
| 800   | #92400e  | Dark text, headers on light backgrounds |
| 900   | #78350f  | Very dark text, strong emphasis |
| 950   | #451a03  | Extremely dark, used sparingly |

## How to Use

### In CSS/Tailwind

```css
/* Using the primary color */
.my-element {
  background-color: var(--color-primary);
  color: white;
}

/* Using the secondary color */
.my-element-secondary {
  background-color: var(--color-secondary);
  color: white;
}

/* Using specific shades */
.my-element-light {
  background-color: var(--color-primary-100);
  color: var(--color-primary-800);
}

.my-accent-element {
  background-color: var(--color-accent-300);
  color: var(--color-accent-900);
}
```

### In Tailwind Classes

```jsx
<button className="bg-primary text-white">Primary Button</button>
<button className="bg-secondary text-white">Secondary Button</button>
<button className="bg-tertiary text-white">Tertiary Button</button>
<button className="bg-accent text-white">Accent Button</button>

<button className="bg-primary-600 text-white">Darker Primary Button</button>
<button className="bg-secondary-200 text-secondary-800">Light Secondary Button</button>
```

### In JavaScript/TypeScript

```tsx
import { 
  GREEN, 
  BLUE, 
  PURPLE, 
  AMBER, 
  getPrimaryColor, 
  getSecondaryColor,
  getTertiaryColor,
  getAccentColor 
} from '../constants/colors';

// Using the color constants directly
<div style={{ backgroundColor: GREEN[500] }}>Primary Color</div>
<div style={{ backgroundColor: BLUE[500] }}>Secondary Color</div>
<div style={{ backgroundColor: PURPLE[500] }}>Tertiary Color</div>
<div style={{ backgroundColor: AMBER[500] }}>Accent Color</div>

// Using utility functions
<div style={{ backgroundColor: getPrimaryColor(700) }}>Dark Primary</div>
<div style={{ backgroundColor: getSecondaryColor(300) }}>Light Secondary</div>
```

## Changing Colors

To change any of the colors in the system:

1. Update the color values in `src/index.css` in the `@theme` section
2. Update the color values in `src/constants/colors.ts`

That's it! All components using the color system will automatically use the new colors.

## Semantic Colors

The system includes semantic colors for different states:

- **Info**: Blue (same as secondary-500)
- **Success**: Green (same as primary-500)
- **Warning**: Amber (same as accent-500)
- **Error**: Red (#ef4444)

## Theme Colors

The system also includes theme-specific colors for light and dark modes:

### Light Theme

- **background**: Gray-50 (#f9fafb)
- **text**: Gray-900 (#111827)
- **border**: Gray-200 (#e5e7eb)
- **primary**: Green-500 (#22c55e)
- **secondary**: Blue-500 (#3b82f6)
- **tertiary**: Purple-500 (#a855f7)
- **accent**: Amber-500 (#f59e0b)

### Dark Theme

- **background**: Gray-900 (#111827)
- **text**: Gray-50 (#f9fafb)
- **border**: Gray-700 (#374151)
- **primary**: Green-500 (#22c55e)
- **secondary**: Blue-400 (#60a5fa) - Slightly lighter in dark mode
- **tertiary**: Purple-400 (#c084fc) - Slightly lighter in dark mode
- **accent**: Amber-400 (#fbbf24) - Slightly lighter in dark mode

## Example

See `src/examples/ColorUsageExample.tsx` for a complete example of how to use the color system.
