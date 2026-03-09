[![CI](https://github.com/theluckystrike/webext-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-badge/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-badge)](https://www.npmjs.com/package/@theluckystrike/webext-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# webext-badge

> Typed badge text and color management for Chrome extensions — counters, status indicators, and animations. Part of @zovo/webext.

## Features

- **Set Badge Text** — Display any text on the extension icon
- **Custom Colors** — Use named colors, hex values, or RGBA arrays
- **Background & Text Color** — Full control over badge appearance
- **Clear Badge** — Remove badge with a single call
- **Pulse Animation** — Flash badges temporarily to grab attention
- **Per-Tab Badges** — Different badges for different browser tabs
- **Preset Templates** — Ready-to-use counters and status indicators

## Install

```bash
npm install @theluckystrike/webext-badge
# or
pnpm add @theluckystrike/webext-badge
```

## Quick Start

```typescript
import { setBadge, clearBadge, showCount, showStatus, flashBadge, COLORS } from "@theluckystrike/webext-badge";

// Set badge with text and color
await setBadge("New", "blue");

// Show a count (auto-formats, shows 999+ for large values)
await showCount(42);

// Show status indicators
await showStatus("success");        // Green "OK"
await showStatus("error");          // Red "ERR"
await showStatus("warning");        // Orange "!"
await showStatus("info", "3");      // Blue "3"

// Flash a badge temporarily (clears after 3 seconds by default)
await flashBadge("!", "orange", 3000);

// Clear the badge
await clearBadge();

// Per-tab badges
await setBadge("5", "red", tabId);
```

## Advanced Patterns

### Notification Counter

Display unread counts with automatic overflow handling:

```typescript
import { showCount } from "@theluckystrike/webext-badge";

// Updates badge with unread message count
async function updateUnreadBadge(count: number) {
  await showCount(count);
}

// Examples:
// showCount(0)     → clears badge
// showCount(5)     → shows "5"
// showCount(1000)  → shows "999+"
```

### Status Indicators

Quick visual feedback for different states:

```typescript
import { showStatus } from "@theluckystrike/webext-badge";

// Connection status
await showStatus("success");  // Green "OK"
await showStatus("error");    // Red "ERR"

// Warnings with custom text
await showStatus("warning", "!");   // Orange "!"
await showStatus("warning", "3");   // Orange "3"

// Info badges
await showStatus("info");     // Blue "i"
await showStatus("info", "2"); // Blue "2"
```

### Animated Pulse

Create attention-grabbing animations:

```typescript
import { flashBadge } from "@theluckystrike/webext-badge";

// Flash badge for 2 seconds
await flashBadge("!", "orange", 2000);

// Pulse animation with async/await
async function pulseAnimation(text: string, color: string, pulses: number = 3) {
  for (let i = 0; i < pulses; i++) {
    await flashBadge(text, color, 500);
    await new Promise(r => setTimeout(r, 200));
  }
}

// Usage
await pulseAnimation("NEW", "green", 3);
```

## API

### Core Functions

| Function | Description |
|----------|-------------|
| `setBadgeText(text, tabId?)` | Set badge text |
| `getBadgeText(tabId?)` | Get current badge text |
| `setBadgeColor(color, tabId?)` | Set background color |
| `getBadgeColor(tabId?)` | Get background color |
| `setBadgeTextColor(color, tabId?)` | Set text color |
| `setBadge(text, color, tabId?)` | Set text and color together |
| `clearBadge(tabId?)` | Clear badge text |

### Helper Functions

| Function | Description |
|----------|-------------|
| `showCount(count, tabId?)` | Display count (0 clears, >999 shows "999+") |
| `showStatus(status, text?, tabId?)` | Show colored status badge |
| `flashBadge(text, color, durationMs?, tabId?)` | Temporarily show badge |

### Colors

Use named colors or any hex/RGBA value:

```typescript
// Named colors
"red" | "green" | "blue" | "orange" | "purple" | "gray" | "black" | "white"

// Hex values
"#FF5722"

// RGBA array
[255, 87, 34, 255]
```

### Color Constants

Pre-defined colors available via `COLORS` object:

```typescript
COLORS.red     // "#F44336"
COLORS.green   // "#4CAF50"
COLORS.blue    // "#2196F3"
COLORS.orange  // "#FF9800"
COLORS.purple  // "#9C27B0"
COLORS.gray    // "#9E9E9E"
COLORS.black   // "#000000"
COLORS.white   // "#FFFFFF"
```

### Types

```typescript
type BadgeColor = string | [number, number, number, number];
type ColorName = "red" | "green" | "blue" | "orange" | "purple" | "gray" | "black" | "white";

interface BadgeState {
  text: string;
  backgroundColor: BadgeColor;
  textColor?: BadgeColor;
}
```

## Part of @zovo/webext

`webext-badge` is part of the @zovo/webext ecosystem — a collection of typed utilities for Chrome extension development.

Explore other packages:

- [webext-storage](https://github.com/theluckystrike/webext-storage) — Typed wrapper for chrome.storage
- [webext-messaging](https://github.com/theluckystrike/webext-messaging) — Type-safe message passing
- [webext-tabs](https://github.com/theluckystrike/webext-tabs) — Enhanced tab management
- [webext-contextmenus](https://github.com/theluckystrike/webext-contextmenus) — Typed context menus
- [webext-i18n](https://github.com/theluckystrike/webext-i18n) — Internationalization utilities

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
