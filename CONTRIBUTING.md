# Contributing to webext-badge

Thank you for your interest in contributing to webext-badge!

## Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-badge.git
   cd webext-badge
   ```

3. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Create a feature branch**:
   ```bash
   git checkout -b my-feature
   ```

## Development

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

### Code Style

This project uses standard TypeScript conventions. Run `npm run build` before submitting to ensure type checking passes.

## Pull Request Process

1. Update documentation if your changes affect the API
2. Add tests for new functionality
3. Ensure `npm test` and `npm run build` pass
4. Update the CHANGELOG.md with your changes
5. Submit a pull request to the `main` branch

## Commit Messages

Follow conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test updates
- `refactor:` for code refactoring

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
