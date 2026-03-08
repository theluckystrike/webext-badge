[![CI](https://github.com/theluckystrike/webext-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-badge/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-badge)](https://www.npmjs.com/package/@theluckystrike/webext-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlejs/size/@theluckystrike/webext-badge)](https://bundlejs.com/?q=@theluckystrike/webext-badge)

# webext-badge

Typed badge text and color management for Chrome extensions.

## Features

- **Set badge text** — Display text or numbers on the extension icon
- **Set badge colors** — Use named colors (red, green, blue, etc.) or custom hex/RGBA values
- **Background color** — Customize badge background with full color control
- **Clear badges** — Remove badge text with a single function call
- **Pulse animation** — Flash badges temporarily for notifications
- **Per-tab badges** — Show different badges on different tabs
- **Status indicators** — Built-in success/error/warning/info patterns
- **Count formatting** — Auto-format large numbers (999+)
- **TypeScript support** — Full type safety with IntelliSense

## Install

```bash
npm install @theluckystrike/webext-badge
# or
pnpm add @theluckystrike/webext-badge
# or
yarn add @theluckystrike/webext-badge
```

## Quick Start

### Set Badge Text and Color

```typescript
import { setBadge, clearBadge, COLORS } from "@theluckystrike/webext-badge";

// Set badge with text and color
await setBadge("New", "blue");

// Use named colors
await setBadge("5", "red");
await setBadge("OK", "green");

// Or use custom hex colors
await setBadge("!", "#FF5722");
```

### Clear Badge

```typescript
import { clearBadge } from "@theluckystrike/webext-badge";

// Clear badge from all tabs
await clearBadge();

// Clear badge from specific tab
await clearBadge(tabId);
```

### Per-Tab Badges

```typescript
import { setBadge } from "@theluckystrike/webext-badge";

// Set badge on specific tab
await setBadge("5", "red", tabId);

// Each tab can have its own badge
await setBadge("3", "green", tabId1);
await setBadge("7", "orange", tabId2);
```

## Advanced Patterns

### Notification Counter with Auto-Clear

Display unread counts with automatic clearing when the user visits the tab:

```typescript
import { showCount, getBadgeText } from "@theluckystrike/webext-badge";

// Update badge with unread count
async function updateUnreadCount(count: number, tabId?: number) {
  await showCount(count, tabId);
}

// When user clicks notification or visits tab, clear the badge
async function onUserVisitTab(tabId: number) {
  const currentText = await getBadgeText(tabId);
  if (currentText && currentText !== "999+") {
    // Clear only if it's a count badge (not a status badge)
    await showCount(0, tabId);
  }
}
```

### Status Indicators

Built-in status patterns for common use cases:

```typescript
import { showStatus } from "@theluckystrike/webext-badge";

// Success - Green "OK"
await showStatus("success");

// Error - Red "ERR"  
await showStatus("error");

// Warning - Orange "!"
await showStatus("warning");

// Info - Blue "i" (or custom text)
await showStatus("info");
await showStatus("info", "3"); // Blue "3"
```

### Animated Pulse for Notifications

Flash the badge temporarily to draw attention:

```typescript
import { flashBadge } from "@theluckystrike/webext-badge";

// Flash badge for 3 seconds (default)
await flashBadge("!", "red");

// Flash for custom duration
await flashBadge("New", "blue", 5000); // 5 seconds

// Flash on specific tab
await flashBadge("!", "orange", 2000, tabId);
```

### Custom Color Values

Use hex strings or RGBA arrays for full control:

```typescript
import { setBadgeColor } from "@theluckystrike/webext-badge";

// Hex color
await setBadgeColor("#FF5722");

// RGBA array [red, green, blue, alpha]
await setBadgeColor([255, 87, 34, 255]);
```

## API Reference

### Core Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `setBadgeText(text, tabId?)` | Set badge text | `Promise<void>` |
| `getBadgeText(tabId?)` | Get current badge text | `Promise<string>` |
| `setBadgeColor(color, tabId?)` | Set background color | `Promise<void>` |
| `getBadgeColor(tabId?)` | Get background color | `Promise<BadgeColor>` |
| `setBadgeTextColor(color, tabId?)` | Set text color | `Promise<void>` |
| `setBadge(text, color, tabId?)` | Set text and color together | `Promise<void>` |
| `clearBadge(tabId?)` | Clear badge text | `Promise<void>` |

### Helper Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `showCount(count, tabId?)` | Display formatted count (0 clears, >999 shows "999+") | `Promise<void>` |
| `showStatus(status, text?, tabId?)` | Show colored status badge | `Promise<void>` |
| `flashBadge(text, color, durationMs?, tabId?)` | Temporarily show badge | `Promise<void>` |

### Types and Constants

| Export | Type | Description |
|--------|------|-------------|
| `BadgeColor` | `type` | `string \| [number, number, number, number]` |
| `ColorName` | `type` | `"red" \| "green" \| "blue" \| "orange" \| "purple" \| "gray" \| "black" \| "white"` |
| `BadgeState` | `interface` | `{ text, backgroundColor, textColor? }` |
| `COLORS` | `const object` | Named color palette |

### Named Colors

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

## Permissions

**No special permissions required.**

This library uses the Chrome [`chrome.action`](https://developer.chrome.com/docs/extensions/reference/action/) API, which is available to extensions by default. No additional entries in your `manifest.json` permissions array are needed.

## Part of @zovo/webext

`webext-badge` is part of the **@zovo/webext** ecosystem — a collection of typed, lightweight utilities for Chrome extension development.

Other packages in the ecosystem:
- [`@theluckystrike/webext-storage`](https://github.com/theluckystrike/webext-storage) — Typed storage wrapper
- [`@theluckystrike/webext-messaging`](https://github.com/theluckystrike/webext-messaging) — Type-safe message passing

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
