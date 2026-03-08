<div align="center">

# @theluckystrike/webext-badge

Typed badge text and color management for Chrome extensions. Set badge text, background color, and text color with a clean API.

[![npm version](https://img.shields.io/npm/v/@theluckystrike/webext-badge)](https://www.npmjs.com/package/@theluckystrike/webext-badge)
[![npm downloads](https://img.shields.io/npm/dm/@theluckystrike/webext-badge)](https://www.npmjs.com/package/@theluckystrike/webext-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@theluckystrike/webext-badge)

[Installation](#installation) · [Quick Start](#quick-start) · [API](#api) · [License](#license)

</div>

---

## Features

- **Badge text** -- set and get badge text per tab or globally
- **Badge colors** -- background and text color management
- **Typed** -- full TypeScript support for all badge operations
- **Promise-based** -- async/await for all Chrome badge APIs
- **Per-tab badges** -- set different badges for different tabs
- **Zero dependencies** -- just TypeScript and Chrome APIs

## Installation

```bash
npm install @theluckystrike/webext-badge
```

<details>
<summary>Other package managers</summary>

```bash
pnpm add @theluckystrike/webext-badge
# or
yarn add @theluckystrike/webext-badge
```

</details>

## Quick Start

```typescript
import { Badge } from "@theluckystrike/webext-badge";

await Badge.setText("42");
await Badge.setBackgroundColor("#FF0000");
await Badge.setTextColor("#FFFFFF");

// Per-tab badges
await Badge.setText("NEW", { tabId: 123 });
```

## API

| Method | Description |
|--------|-------------|
| `setText(text, opts?)` | Set badge text (optionally per tab) |
| `getText(opts?)` | Get current badge text |
| `setBackgroundColor(color, opts?)` | Set badge background color |
| `getBackgroundColor(opts?)` | Get badge background color |
| `setTextColor(color, opts?)` | Set badge text color |
| `getTextColor(opts?)` | Get badge text color |



## Part of @zovo/webext

This package is part of the [@zovo/webext](https://github.com/theluckystrike) family -- typed, modular utilities for Chrome extension development:

| Package | Description |
|---------|-------------|
| [webext-storage](https://github.com/theluckystrike/webext-storage) | Typed storage with schema validation |
| [webext-messaging](https://github.com/theluckystrike/webext-messaging) | Type-safe message passing |
| [webext-tabs](https://github.com/theluckystrike/webext-tabs) | Tab query helpers |
| [webext-cookies](https://github.com/theluckystrike/webext-cookies) | Promise-based cookies API |
| [webext-i18n](https://github.com/theluckystrike/webext-i18n) | Internationalization toolkit |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License -- see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [theluckystrike](https://github.com/theluckystrike) · [zovo.one](https://zovo.one)

</div>
