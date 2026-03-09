# Contributing to webext-badge

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/webext-badge.git`
3. **Install dependencies**: `npm install`

## Development Workflow

```bash
# Make changes to src/index.ts
# Build the project
npm run build

# Run tests
npm test
```

## Project Structure

```
webext-badge/
├── src/
│   └── index.ts       # Main source code
├── dist/              # Compiled JavaScript (generated)
├── README.md         # Documentation
├── CONTRIBUTING.md   # This file
├── package.json      # Project configuration
└── tsconfig.json     # TypeScript configuration
```

## Code Style

- Use TypeScript for all new code
- Follow existing patterns in `src/index.ts`
- Keep functions focused and small
- Add JSDoc comments for public APIs

## Testing

This project uses Vitest for testing. While the current test coverage is minimal, add tests for new functionality:

```bash
npm test
```

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Add or update tests as needed
4. Build and test: `npm run build && npm test`
5. Commit with descriptive messages
6. Push to your fork
7. Open a Pull Request

## Pull Request Guidelines

- **Title**: Clear and descriptive
- **Description**: Explain what the PR does and why
- **Tests**: Include tests for new functionality
- **Breaking Changes**: Discuss in the PR description if applicable

## Reporting Issues

When reporting issues, please include:

- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Any relevant error messages

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
