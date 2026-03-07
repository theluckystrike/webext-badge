[![npm](https://img.shields.io/npm/v/webext-badge)](https://www.npmjs.com/package/webext-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# webext-badge

Typed badge text and color management for Chrome extensions.

Part of the [chrome-extension-guide](https://github.com/niceByte/chrome-extension-guide) ecosystem.

## Install

```bash
npm install webext-badge
```

## Usage

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

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
