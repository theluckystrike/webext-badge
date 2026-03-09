[![CI](https://github.com/theluckystrike/webext-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-badge/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-badge)](https://www.npmjs.com/package/@theluckystrike/webext-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Last Commit](https://img.shields.io/github/last-commit/theluckystrike/webext-badge)](https://github.com/theluckystrike/webext-badge/commits)

# webext-badge

Typed badge text and color management for Chrome extensions. Provides a fully-typed API for setting, getting, and manipulating browser action badges with support for named colors, hex values, and RGBA tuples.

Part of the [chrome-extension-guide](https://github.com/theluckystrike/chrome-extension-guide) ecosystem.

## Features

- 🎨 **Typed Colors**: Use named colors (`red`, `green`, `blue`), hex strings (`#FF5722`), or RGBA tuples (`[255, 87, 34, 255]`)
- 📊 **Count Display**: Automatically formats large numbers as "999+"
- ⚡ **Status Indicators**: Built-in success, error, warning, and info states
- ✨ **Flash Messages**: Temporarily show a badge that clears after a duration
- 🔧 **Per-Tab Control**: Control badges for specific tabs

## Installation

```bash
npm install @theluckystrike/webext-badge
```

## Usage

```typescript
import { 
  setBadge, 
  clearBadge, 
  showCount, 
  showStatus, 
  flashBadge, 
  COLORS,
  setBadgeText,
  setBadgeColor,
  setBadgeTextColor 
} from "@theluckystrike/webext-badge";

// Set badge with text and color in one call
await setBadge("New", "blue");

// Or set them separately
await setBadgeText("5");
await setBadgeColor("red");
await setBadgeTextColor("white"); // Chrome 110+

// Show a count (auto-formats, shows 999+ for large values)
await showCount(42);  // Shows "42" in red
await showCount(1500); // Shows "999+" in red
await showCount(0);   // Clears the badge

// Show status indicators with preset colors and text
await showStatus("success");      // Green "OK"
await showStatus("error");        // Red "ERR"
await showStatus("warning");      // Orange "!"
await showStatus("info");         // Blue "i"
await showStatus("error", "X");   // Red "X" (custom text)

// Flash a badge temporarily (clears after duration)
await flashBadge("!", "orange", 3000); // Shows for 3 seconds

// Clear the badge
await clearBadge();

// Per-tab badges
await setBadge("5", "red", tabId);
await showCount(10, tabId);
await flashBadge("✓", "green", 2000, tabId);
```

## API Reference

### Types

```typescript
// Color can be a named color, hex string, or RGBA tuple
type BadgeColor = string | [number, number, number, number];

// Predefined color names
type ColorName = "red" | "green" | "blue" | "orange" | "purple" | "gray" | "black" | "white";

// Badge state interface
interface BadgeState {
  text: string;
  backgroundColor: BadgeColor;
  textColor?: BadgeColor;
}
```

### Core Functions

| Function | Description |
|----------|-------------|
| `setBadgeText(text, tabId?)` | Set the badge text |
| `getBadgeText(tabId?)` | Get the current badge text |
| `setBadgeColor(color, tabId?)` | Set the badge background color |
| `getBadgeColor(tabId?)` | Get the badge background color |
| `setBadgeTextColor(color, tabId?)` | Set the badge text color (Chrome 110+) |
| `setBadge(text, color, tabId?)` | Set both badge text and color |
| `clearBadge(tabId?)` | Clear the badge (sets text to empty string) |

### Helper Functions

| Function | Description |
|----------|-------------|
| `showCount(count, tabId?)` | Display count badge. 0 clears, >999 shows "999+", uses red for >0, gray for 0 |
| `showStatus(status, text?, tabId?)` | Show colored status badge with preset colors: `success`(green), `error`(red), `warning`(orange), `info`(blue) |
| `flashBadge(text, color, durationMs?, tabId?)` | Temporarily show badge that clears after duration (default: 3000ms) |

### Color Constants

```typescript
const COLORS = {
  red: "#F44336",
  green: "#4CAF50",
  blue: "#2196F3",
  orange: "#FF9800",
  purple: "#9C27B0",
  gray: "#9E9E9E",
  black: "#000000",
  white: "#FFFFFF",
} as const;
```

All functions accept:
- **Named colors**: `"red"`, `"green"`, `"blue"`, `"orange"`, `"purple"`, `"gray"`, `"black"`, `"white"`
- **Hex strings**: `"#FF5722"`, `"#abc"`
- **RGBA tuples**: `[255, 87, 34, 255]`

## Project Structure

```
webext-badge/
├── src/
│   ├── index.ts        # Main source code
│   └── index.test.ts   # Test suite
├── .github/
│   └── workflows/
│       └── ci.yml      # GitHub Actions CI
├── CHANGELOG.md        # Version history
├── LICENSE             # MIT license
├── package.json        # npm package config
├── tsconfig.json       # TypeScript config
└── README.md           # This file
```

## Requirements

- Chrome 88+ (for Manifest V3)
- TypeScript 5.0+ (for full type support)
- `@types/chrome` package for Chrome API types

## License

MIT

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
