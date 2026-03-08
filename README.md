[![CI](https://github.com/theluckystrike/webext-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-badge/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-badge)](https://www.npmjs.com/package/@theluckystrike/webext-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![npm downloads](https://img.shields.io/npm/dm/@theluckystrike/webext-badge)](https://www.npmjs.com/package/@theluckystrike/webext-badge)

# webext-badge

> Typed badge text and color management for Chrome extensions — counters, status indicators, and animations. Part of @zovo/webext.

A lightweight, type-safe library for managing browser extension badges in Chrome, Edge, Firefox, and other Chromium-based browsers. Perfect for notification counters, status indicators, and temporary alerts.

## Features

- **Set badge text** — Display any text on the extension badge
- **Custom colors** — Use named colors, hex values, or RGBA arrays
- **Background & text colors** — Full control over badge appearance
- **Clear badges** — Remove badges easily
- **Pulse/flash animations** — Temporarily show badges that auto-clear
- **Per-tab badges** — Different badges for different tabs
- **Templates** — Pre-built patterns for common use cases:
  - Notification counters (auto-formats "999+")
  - Status indicators (success/error/warning/info)
  - Temporary alerts (auto-dismiss)

## Install

```bash
npm install @theluckystrike/webext-badge
# or
pnpm add @theluckystrike/webext-badge
# or
yarn add @theluckystrike/webext-badge
```

## Quick Start

```typescript
import { setBadge, clearBadge, showCount, showStatus, flashBadge, COLORS } from "@theluckystrike/webext-badge";

// Set badge with text and color
await setBadge("New", "blue");

// Show a count (auto-formats large values as "999+")
await showCount(42);

// Show status indicators
await showStatus("success");        // Green "OK"
await showStatus("error");          // Red "ERR"
await showStatus("warning");        // Orange "!"
await showStatus("info", "3");      // Blue "3"

// Flash a badge temporarily (auto-clears after 3 seconds)
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

// In your message handler
browser.runtime.onMessage.addListener((message) => {
  if (message.type === "UNREAD_COUNT") {
    await showCount(message.count);
  }
});

// Handles all these cases:
// showCount(0)     → clears badge
// showCount(5)    → shows "5"
// showCount(100)  → shows "100"
// showCount(1500) → shows "999+"
```

### Status Indicators

Show quick visual feedback for operations:

```typescript
import { showStatus } from "@theluckystrike/webext-badge";

async function handleSync() {
  try {
    await syncData();
    await showStatus("success");      // Green "OK"
    
    // Auto-clear after 2 seconds
    setTimeout(() => clearBadge(), 2000);
  } catch (error) {
    await showStatus("error");        // Red "ERR"
  }
}
```

### Animated Pulse Effect

Create attention-grabbing temporary badges:

```typescript
import { flashBadge, COLORS } from "@theluckystrike/webext-badge";

// Flash an important alert for 5 seconds
await flashBadge("!", COLORS.orange, 5000);

// Pulse animation sequence
async function pulseWithAnimation(count: number = 3) {
  for (let i = 0; i < count; i++) {
    await flashBadge("●", COLORS.blue, 500);
    await new Promise(r => setTimeout(r, 200));
  }
}
```

### Per-Tab Badges

Show different badges for different browser tabs:

```typescript
import { setBadge, getBadgeText } from "@theluckystrike/webext-badge";

// Get all tabs and set per-tab badges
const tabs = await browser.tabs.query({});
for (const tab of tabs) {
  if (tab.id && tab.url?.includes("inbox")) {
    await setBadge("5", "green", tab.id);
  }
}
```

## API Reference

### Core Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `setBadgeText(text, tabId?)` | Set badge text content | `Promise<void>` |
| `getBadgeText(tabId?)` | Get current badge text | `Promise<string>` |
| `setBadgeColor(color, tabId?)` | Set badge background color | `Promise<void>` |
| `getBadgeColor(tabId?)` | Get current background color | `Promise<BadgeColor>` |
| `setBadgeTextColor(color, tabId?)` | Set badge text color | `Promise<void>` |
| `setBadge(text, color, tabId?)` | Set text and color together | `Promise<void>` |
| `clearBadge(tabId?)` | Clear badge (set to empty) | `Promise<void>` |

### Helper Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `showCount(count, tabId?)` | Display count (0 clears, >999 shows "999+") | `Promise<void>` |
| `showStatus(status, text?, tabId?)` | Show colored status badge | `Promise<void>` |
| `flashBadge(text, color, durationMs?, tabId?)` | Temporarily show badge | `Promise<void>` |

### Color Values

Use named colors, hex values, or RGBA arrays:

```typescript
// Named colors
"red" | "green" | "blue" | "orange" | "purple" | "gray" | "black" | "white"

// Hex colors
"#FF5722" | "#4CAF50" | "#2196F3"

// RGBA arrays
[255, 87, 34, 255]  // RGBA
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

webext-badge is part of the @zovo/webext ecosystem — a collection of type-safe utilities for building modern browser extensions.

Other packages in the ecosystem:

- **webext-storage** — Typed wrapper for browser.storage
- **webext-messaging** — Type-safe message passing
- **webext-tabs** — Tab management utilities

Learn more at [zovo.one](https://zovo.one)

## Requirements

- TypeScript 5.0+
- Chrome/Edge 88+ or Firefox 87+
- Chrome Extensions Manifest V3

## License

MIT

---

Built with 🔧 by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
