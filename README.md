[![CI](https://github.com/theluckystrike/webext-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-badge/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-badge)](https://www.npmjs.com/package/@theluckystrike/webext-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

<div align="center">

# webext-badge

**Typed badge text and color management for Chrome extensions — counters, status indicators, and animations.**

[Install](#install) • [Quick Start](#quick-start) • [API](#api) • [Part of @zovo/webext](#-part-of-zovo-webext)

*Part of the 🦄 @zovo/webext ecosystem*

</div>

## Features

- **Set badge text** — Display any text on your extension's badge
- **Custom colors** — Background and text colors (named colors, hex, or RGBA)
- **Color presets** — Built-in red, green, blue, orange, purple, gray, black, white
- **Clear badges** — Easily clear badge text
- **Flash/pulse** — Temporarily show a badge that auto-clears
- **Per-tab badges** — Different badges for different tabs
- **Counter display** — Auto-format large counts (999+)
- **Status indicators** — Pre-built success, error, warning, info states

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
import { setBadge, clearBadge, showCount, showStatus, flashBadge, COLORS } from "webext-badge";

// Set badge with text and color
await setBadge("New", "blue");

// Show a count (auto-formats, shows 999+ for large values)
await showCount(42);

// Show status indicators
await showStatus("success");        // Green "OK"
await showStatus("error");          // Red "ERR"
await showStatus("warning");        // Orange "!"
await showStatus("info", "3");      // Blue "3"

// Flash a badge temporarily (clears after duration)
await flashBadge("!", "orange", 3000);

// Clear the badge
await clearBadge();

// Per-tab badges
await setBadge("5", "red", tabId);
```

## Advanced Patterns

### Notification Counter

Display unread notification counts with automatic overflow handling:

```typescript
import { showCount } from "webext-badge";

// In your message handler
browser.runtime.onMessage.addListener((message) => {
  if (message.type === "NOTIFICATION_COUNT") {
    await showCount(message.count);
  }
});
```

### Status Indicators

Use pre-built status badges for common states:

```typescript
import { showStatus } from "webext-badge";

// Sync complete - green check
await showStatus("success");

// Error state - red error
await showStatus("error");

// Warning state - orange alert
await showStatus("warning");

// Info state - blue "i"
await showStatus("info", "3");  // Custom text
```

### Animated Pulse

Create attention-grabbing pulse effects using flashBadge:

```typescript
import { flashBadge, setBadge, clearBadge } from "webext-badge";

// Pulse animation for new items
async function pulseNewItems(count: number) {
  for (let i = 0; i < 3; i++) {
    await flashBadge(String(count), "red", 500);
    await new Promise(r => setTimeout(r, 200));
  }
}

// Urgent notification pulse
async function urgentPulse() {
  await flashBadge("!!!", "red", 1000);
}
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
"red" | "green" | "blue" | "orange" | "purple" | "gray" | "black" | "white"
// or
"#FF5722"
// or
[255, 87, 34, 255]
```

---

## 🦄 Part of @zovo/webext

`webext-badge` is part of the @zovo/webext ecosystem of typed Chrome extension APIs:

- [webext-badge](https://github.com/theluckystrike/webext-badge) — Badge management
- [webext-storage](https://github.com/theluckystrike/webext-storage) — Typed storage wrapper
- [webext-tabs](https://github.com/theluckystrike/webext-tabs) — Tab management utilities
- [webext-messaging](https://github.com/theluckystrike/webext-messaging) — Type-safe messaging

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
