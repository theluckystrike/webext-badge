# webext-badge

[![npm version](https://img.shields.io/npm/v/webext-badge.svg)](https://www.npmjs.com/package/webext-badge)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Typed badge text and color management for Chrome extensions.

Part of the [Zovo](https://github.com/theluckystrike) ecosystem for building modern Chrome extensions.

## Features

- **Set badge text** — Display any text on the extension badge
- **Set background color** — Customize badge background with named colors or hex/RGBA values
- **Set text color** — Control badge text color for accessibility and visibility
- **Clear badge** — Remove badge text with a single function call
- **Pulse animation** — Temporarily show a badge that auto-clears after a duration
- **Per-tab badges** — Display different badges for different browser tabs
- **Badge templates** — Pre-built patterns for common use cases:
  - **Notification counter** — Auto-formats large counts as "999+", clears at zero
  - **Status indicators** — Pre-configured success (green), error (red), warning (orange), and info (blue) badges

## Install

```bash
npm install webext-badge
```

Requires TypeScript 5.7+ and Chrome 110+ (or equivalent Chromium-based browser).

## Quick Start

### Set badge text and color

```typescript
import { setBadge, clearBadge } from "webext-badge";

// Set badge with text and background color
await setBadge("New", "blue");

// Clear the badge when done
await clearBadge();
```

### Using individual functions

```typescript
import { setBadgeText, setBadgeColor, setBadgeTextColor } from "webext-badge";

// Set just the text
await setBadgeText("5");

// Set just the background color
await setBadgeColor("red");

// Set text color (for light backgrounds)
await setBadgeTextColor("white");
```

### Per-tab badges

```typescript
import { setBadge } from "webext-badge";

// Show a badge on a specific tab
await setBadge("5", "red", tabId);

// Clear badge on a specific tab
import { clearBadge } from "webext-badge";
await clearBadge(tabId);
```

## Advanced Patterns

### Notification counter with auto-clear

Display unread counts that automatically clear when the count reaches zero:

```typescript
import { showCount } from "webext-badge";

// Show notification count
await showCount(42);    // Shows "42"
await showCount(1500);  // Shows "999+"
await showCount(0);     // Clears the badge
```

### Status indicators

Use pre-configured status badges for common states:

```typescript
import { showStatus } from "webext-badge";

// Success - Green badge with "OK"
await showStatus("success");

// Error - Red badge with "ERR"
await showStatus("error");

// Warning - Orange badge with "!"
await showStatus("warning");

// Info - Blue badge with "i" or custom text
await showStatus("info");
await showStatus("info", "3");  // Blue badge with "3"
```

### Animated pulse

Flash a badge temporarily to draw user attention:

```typescript
import { flashBadge } from "webext-badge";

// Flash badge for 3 seconds (default)
await flashBadge("!", "orange");

// Flash with custom duration (5 seconds)
await flashBadge("New", "blue", 5000);

// Flash on a specific tab
await flashBadge("!", "red", 3000, tabId);
```

### Custom colors

Pass any valid color value:

```typescript
import { setBadgeColor, COLORS } from "webext-badge";

// Use built-in named colors
await setBadgeColor("green");
await setBadgeColor("purple");

// Use hex colors
await setBadgeColor("#FF5722");
await setBadgeColor("#2196F3");

// Use RGBA array [red, green, blue, alpha]
await setBadgeColor([255, 87, 34, 255]);

// Access COLORS constant directly
await setBadgeColor(COLORS.red);
```

## API Reference

### Core Functions

| Function | Description |
|----------|-------------|
| `setBadgeText(text, tabId?)` | Set badge text content |
| `getBadgeText(tabId?)` | Get current badge text |
| `setBadgeColor(color, tabId?)` | Set badge background color |
| `getBadgeColor(tabId?)` | Get badge background color |
| `setBadgeTextColor(color, tabId?)` | Set badge text color |
| `setBadge(text, color, tabId?)` | Set text and background color together |
| `clearBadge(tabId?)` | Clear badge text (set to empty string) |

### Helper Functions

| Function | Description |
|----------|-------------|
| `showCount(count, tabId?)` | Display count with auto-formatting (0 clears, 999+ truncates) |
| `showStatus(status, text?, tabId?)` | Show colored status badge (success/error/warning/info) |
| `flashBadge(text, color, durationMs?, tabId?)` | Temporarily show badge that auto-clears |

### Types and Constants

| Export | Type | Description |
|--------|------|-------------|
| `COLORS` | `object` | Pre-defined color palette |
| `BadgeColor` | `string \| [number, number, number, number]` | Valid color value (named, hex, or RGBA) |
| `ColorName` | `"red" \| "green" \| "blue" \| "orange" \| "purple" \| "gray" \| "black" \| "white"` | Named color keys |
| `BadgeState` | `interface` | Object with text, backgroundColor, and optional textColor |

### Color Values

The `COLORS` constant provides named colors:

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

Accepts any valid CSS color:
- Named colors: `"red"`, `"green"`, `"blue"`, etc.
- Hex values: `"#FF5722"`, `"#FFF"`
- RGBA arrays: `[255, 87, 34, 255]`

## Permissions

**No special permissions required.**

This library uses the Chrome `chrome.action` badge API, which does not require any additional permissions in your `manifest.json`. The badge appears on the extension's toolbar icon.

For per-tab badges, you may need the `"tabs"` permission to access tab IDs:

```json
{
  "permissions": ["tabs"]
}
```

## Part of @zovo/webext

`webext-badge` is part of the Zovo ecosystem for building Chrome extensions:

- **[webext-badge](https://github.com/theluckystrike/webext-badge)** — Badge text and color management
- **[webext-storage](https://github.com/theluckystrike/webext-storage)** — Typed wrapper for chrome.storage
- **[webext-messaging](https://github.com/theluckystrike/webext-messaging)** — Type-safe messaging between contexts
- **[webext-events](https://github.com/theluckystrike/webext-events)** — Typed event handlers

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) | [zovo.one](https://zovo.one)
