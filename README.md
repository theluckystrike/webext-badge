[![CI](https://github.com/theluckystrike/webext-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-badge/actions)
[![npm version](https://img.shields.io/npm/v/@theluckystrike/webext-badge)](https://npmjs.com/package/@theluckystrike/webext-badge)
[![npm downloads](https://img.shields.io/npm/dm/@theluckystrike/webext-badge)](https://npmjs.com/package/@theluckystrike/webext-badge)
[![License](https://img.shields.io/npm/l/@theluckystrike/webext-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

# webext-badge

<p align="center">
  TypeScript-first badge management for Chrome Extensions
</p>

Type-safe, ergonomic utilities for managing Chrome extension badge text and colors. Part of the [chrome-extension-guide](https://github.com/theluckystrike/chrome-extension-guide) ecosystem — a collection of modular tools for building modern Chrome extensions with TypeScript.

## Features

- **🎯 TypeScript First** — Full type safety with auto-complete support
- **🛠️ Ergonomic API** — Simple functions for common badge patterns
- **🎨 Flexible Colors** — Named colors, hex values, or RGBA arrays
- **⚡ Async/Await** — Clean Promise-based API
- **📊 Status Indicators** — Built-in helpers for success/error/warning/info states
- **🔢 Count Display** — Auto-format large numbers as "999+"
- **✨ Flash Badges** — Temporarily show badges that auto-clear
- **🔗 Per-Tab Badges** — Target specific tabs or use global badges

## Install

```bash
npm install @theluckystrike/webext-badge
```

## Quick Start

```typescript
import { setBadge, showCount, showStatus, clearBadge, COLORS } from "@theluckystrike/webext-badge";

// Set a simple badge
await setBadge("New", "blue");

// Show notification count
await showCount(42);

// Show status
await showStatus("success");  // Green "OK"
await showStatus("error");    // Red "ERR"

// Clear when done
await clearBadge();
```

## API Reference

### Core Functions

#### `setBadgeText(text: string, tabId?: number): Promise<void>`

Set the badge text. Use an empty string to hide the badge.

```typescript
await setBadgeText("5");
await setBadgeText("", tabId);  // Clear specific tab
```

#### `getBadgeText(tabId?: number): Promise<string>`

Get the current badge text.

```typescript
const text = await getBadgeText();
```

#### `setBadgeColor(color: BadgeColor | ColorName, tabId?: number): Promise<void>`

Set the badge background color.

```typescript
await setBadgeColor("red");
await setBadgeColor("#FF5722");
await setBadgeColor([255, 87, 34, 255]);
```

#### `getBadgeColor(tabId?: number): Promise<BadgeColor>`

Get the current badge background color.

#### `setBadgeTextColor(color: BadgeColor | ColorName, tabId?: number): Promise<void>`

Set the badge text color.

```typescript
await setBadgeTextColor("white");
```

#### `setBadge(text: string, color: BadgeColor | ColorName, tabId?: number): Promise<void>`

Set both text and color in a single call.

```typescript
await setBadge("3", "green");
```

#### `clearBadge(tabId?: number): Promise<void>`

Clear the badge text (shorthand for setting text to empty string).

```typescript
await clearBadge();
await clearBadge(tabId);  // Clear specific tab
```

### Helper Functions

#### `showCount(count: number, tabId?: number): Promise<void>`

Display a count with automatic formatting:
- `0` — clears the badge
- `1-999` — shows the number
- `1000+` — shows "999+"

Uses red for positive counts, gray for zero.

```typescript
await showCount(42);      // Shows "42"
await showCount(1500);    // Shows "999+"
await showCount(0);      // Clears badge
```

#### `showStatus(status: "success" | "error" | "warning" | "info", text?: string, tabId?: number): Promise<void>`

Show a status indicator with preset colors and default text:

| Status   | Color   | Default Text |
|----------|---------|--------------|
| success  | Green   | "OK"         |
| error    | Red     | "ERR"        |
| warning  | Orange  | "!"          |
| info     | Blue    | "i"          |

```typescript
await showStatus("success");
await showStatus("error", "Failed");
await showStatus("warning", "!");
await showStatus("info", "3");  // Custom text
```

#### `flashBadge(text: string, color: BadgeColor | ColorName, durationMs?: number, tabId?: number): Promise<void>`

Show a badge temporarily that auto-clears after the specified duration. Returns a Promise that resolves when the badge is cleared.

```typescript
await flashBadge("!", "orange", 3000);  // Default 3 seconds
await flashBadge("Saved", "green", 5000, tabId);
```

### Colors

#### Predefined Colors

```typescript
import { COLORS } from "@theluckystrike/webext-badge";

COLORS.red     // "#F44336"
COLORS.green   // "#4CAF50"
COLORS.blue    // "#2196F3"
COLORS.orange  // "#FF9800"
COLORS.purple  // "#9C27B0"
COLORS.gray    // "#9E9E9E"
COLORS.black   // "#000000"
COLORS.white   // "#FFFFFF"
```

#### Custom Colors

**Hex string:**
```typescript
await setBadgeColor("#FF5722");
await setBadgeColor("#F44336");
```

**RGBA array:**
```typescript
await setBadgeColor([255, 87, 34, 255]);
await setBadgeColor([33, 150, 243, 200]);  // Semi-transparent
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

## Examples

### Notification Counter

```typescript
import { showCount } from "@theluckystrike/webext-badge";

// Update badge with unread count
function updateUnreadCount(count: number) {
  await showCount(count);
}

// Usage in message handler
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "NEW_NOTIFICATIONS") {
    await showCount(message.count);
  }
});
```

### API Status Indicator

```typescript
import { showStatus } from "@theluckystrike/webext-badge";

async function handleApiResponse(response: Response) {
  if (response.ok) {
    await showStatus("success", "OK");
  } else {
    await showStatus("error", "ERR");
  }
}
```

### Temporary Alert

```typescript
import { flashBadge } from "@theluckystrike/webext-badge";

// Flash a warning for 2 seconds
await flashBadge("!", "orange", 2000);

// Flash success message
await flashBadge("Saved!", "green", 3000);
```

### Per-Tab Badge

```typescript
import { setBadge } from "@theluckystrike/webext-badge";

// Show badge on specific tab
chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const tabId = tabs[0]?.id;
  if (tabId) {
    await setBadge("5", "red", tabId);
  }
});
```

### Background Script Pattern

```typescript
// background.ts
import { setBadge, clearBadge, showStatus } from "@theluckystrike/webext-badge";

// Track processing state
let isProcessing = false;

async function startProcessing() {
  isProcessing = true;
  await setBadge("⏳", "blue");
}

async function finishProcessing() {
  isProcessing = false;
  await showStatus("success", "✓");
  setTimeout(() => clearBadge(), 3000);
}

async function failProcessing(error: Error) {
  isProcessing = false;
  await showStatus("error", "✕");
}
```

## Chrome Extension Guide

This package is part of the [chrome-extension-guide](https://github.com/theluckystrike/chrome-extension-guide) ecosystem — a modular toolkit for building Chrome extensions with modern TypeScript.

Other packages in the ecosystem:

- **[webext-badge](https://github.com/theluckystrike/webext-badge)** — Badge management (this package)
- **[webext-storage](https://github.com/theluckystrike/webext-storage)** — Typed storage utilities
- **[webext-messaging](https://github.com/theluckystrike/webext-messaging)** — Type-safe message passing

## Requirements

- TypeScript 5.0+
- Chrome 88+ (Manifest V3)
- `@types/chrome` for type definitions

## License

MIT

---

Built with ⚡ by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
