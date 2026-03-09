[![CI](https://github.com/theluckystrike/webext-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-badge/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-badge)](https://www.npmjs.com/package/@theluckystrike/webext-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# webext-badge

> Typed badge text and color management for Chrome extensions — counters, status indicators, and animations.

Part of **@zovo/webext** — a collection of type-safe utilities for building Chrome extensions.

## Features

- **Set badge text** — Display any text on the extension icon
- **Color management** — Use named colors (red, green, blue, etc.) or custom hex/RGBA values
- **Background & text colors** — Full control over badge appearance
- **Clear badges** — Remove badges with a single call
- **Pulse animations** — Flash badges temporarily with configurable duration
- **Per-tab badges** — Show different badges for different tabs
- **Templates** — Built-in helpers for common patterns:
  - Notification counters (with "999+" overflow)
  - Status indicators (success, error, warning, info)

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

// Show a count (auto-formats large values as "999+")
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

// In your message handler
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "UNREAD_COUNT") {
    showCount(message.count);
  }
});
```

### Status Indicators

Show real-time status updates on your extension icon:

```typescript
import { showStatus } from "@theluckystrike/webext-badge";

// Sync status
await showStatus("success");
await showStatus("error");
await showStatus("warning", "!");
await showStatus("info", "3");
```

### Animated Pulse

Draw attention with temporary flash animations:

```typescript
import { flashBadge } from "@theluckystrike/webext-badge";

// Flash on new notification
await flashBadge("1", "red", 2000);

// Longer pulse for important alerts
await flashBadge("!", "orange", 5000);
```

### Per-Tab Badge Management

Manage badges individually per tab:

```typescript
import { setBadge, clearBadge, getBadgeText } from "@theluckystrike/webext-badge";

// Set different badges per tab
await setBadge("5", "red", tabId1);
await setBadge("3", "blue", tabId2);

// Check current badge state
const text = await getBadgeText(tabId1);

// Clear specific tab
await clearBadge(tabId2);
```

## API Reference

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

## Part of @zovo/webext

`webext-badge` is part of the **@zovo/webext** ecosystem — type-safe utilities for Chrome extension development:

- **@zovo/webext-badge** — Badge text and color management
- **@zovo/webext-storage** — Typed storage utilities
- **@zovo/webext-messaging** — Type-safe message passing
- **@zovo/webext-tabs** — Tab management helpers

Visit [zovo.one](https://zovo.one) for the full ecosystem.

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
