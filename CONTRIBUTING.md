# Contributing to webext-badge

Thank you for your interest in contributing to webext-badge! This document outlines the process for contributing to this project.

## Getting Started

1. **Fork the repository** — Click the "Fork" button on GitHub to create your own copy
2. **Clone your fork** — `git clone https://github.com/YOUR_USERNAME/webext-badge.git`
3. **Install dependencies** — `pnpm install` (or `npm install` / `yarn`)

## Development Workflow

1. **Create a feature branch** — `git checkout -b feature/your-feature-name`
2. **Make your changes** — Write your code, add tests
3. **Run tests** — `pnpm test` to ensure everything passes
4. **Build the project** — `pnpm build` to compile TypeScript
5. **Commit your changes** — Use clear, descriptive commit messages
6. **Push to your fork** — `git push origin feature/your-feature-name`
7. **Open a Pull Request** — Describe your changes and submit

## Testing

Run the test suite:

```bash
pnpm test        # Run tests once
pnpm test:watch  # Run tests in watch mode
```

## Code Style

- Use TypeScript with strict mode
- Follow existing code conventions
- Add JSDoc comments for public APIs
- Ensure type safety throughout

## Pull Request Guidelines

- PRs should target the `main` branch
- Include a clear description of the changes
- Add tests for new functionality
- Ensure all tests pass before submitting
- Update documentation if needed

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add showCount helper function`
- `fix: resolve type error in setBadgeColor`
- `docs: update API reference`

## Questions?

If you have questions, feel free to open an issue or reach out through GitHub.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
