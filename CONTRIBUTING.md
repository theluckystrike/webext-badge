# Contributing to webext-badge

Thank you for your interest in contributing to webext-badge!

## Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-badge.git
   cd webext-badge
   ```

## Development Setup

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test
```

## Creating a Branch

Create a new branch for your feature or fix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-fix-name
```

## Making Changes

1. Make your changes in the `src/` directory
2. Run `pnpm build` to compile TypeScript
3. Run `pnpm test` to ensure all tests pass
4. Commit your changes with a clear message

## Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin your-branch-name
   ```
2. Open a Pull Request against the `main` branch
3. Fill out the PR template with details about your changes

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Add type annotations where beneficial
- Write tests for new functionality

## Questions?

If you have questions, feel free to open an issue or reach out through the repository.
