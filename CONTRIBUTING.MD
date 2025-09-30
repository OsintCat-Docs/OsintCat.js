# Contributing to OsintCat.js

Thank you for your interest in contributing to the OsintCat JavaScript/TypeScript SDK! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Project Structure](#project-structure)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors. Please:

- Be respectful and considerate in your communication
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect differing viewpoints and experiences
- Report any unacceptable behavior to the maintainers

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/osintcat.js.git
   cd osintcat.js
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/osintcat/osintcat.sjs.git
   ```

## Development Setup

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager
- Git

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## Making Changes

### Creating a Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or modifications

### Commit Messages

Write clear, concise commit messages following this format:

```
type: brief description

Detailed explanation if needed
```

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build process or auxiliary tool changes

Examples:
```
feat: add phone number validation method

fix: handle empty response data in getUserInfo

docs: update README with TypeScript examples
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch
```

### Writing Tests

- Write tests for all new features
- Ensure existing tests pass before submitting
- Aim for high test coverage (>80%)
- Use descriptive test names

Example test structure:

```typescript
describe('OsintCat', () => {
  describe('searchBreaches', () => {
    it('should return breach results for valid email', async () => {
      // Test implementation
    });

    it('should throw error for empty query', async () => {
      // Test implementation
    });
  });
});
```

## Submitting Changes

### Pull Request Process

1. **Update your branch** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Reference any related issues (e.g., "Fixes #123")
   - Screenshots if applicable (for UI changes)

4. **Wait for review** and address any feedback

### Pull Request Checklist

Before submitting, ensure:

- [ ] Code builds without errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] New features include tests
- [ ] Documentation is updated
- [ ] Code follows the project's style guidelines
- [ ] Commit messages are clear and follow conventions
- [ ] Branch is up to date with main

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow existing code style and formatting
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Prefer `const` over `let`, only use `var` if necessary
- Use async/await over promises where appropriate

### Code Style

The project uses TypeScript and follows these conventions:

```typescript
// ✅ Good
export interface UserConfig {
  readonly apiKey: string;
  readonly timeout?: number;
}

async function fetchData(url: string): Promise<Data> {
  const response = await fetch(url);
  return response.json();
}

// ❌ Avoid
export interface user_config {
  apiKey: string;
  timeout: number | undefined;
}

function fetchData(url) {
  return fetch(url).then(r => r.json());
}
```

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for public methods
- Include code examples where helpful
- Keep documentation clear and concise

## Project Structure

```
osintcat.js/
├── src/
│   └── index.ts          # Main source file
├── dist/                 # Built files (generated)
├── tests/                # Test files
├── docs/                 # Additional documentation
├── .github/              # GitHub specific files
├── tsconfig.json         # TypeScript configuration
├── tsup.config.ts        # Build configuration
├── package.json          # Package metadata
├── README.md             # Main documentation
├── CONTRIBUTING.md       # This file
├── CHANGELOG.md          # Version history
└── LICENSE               # MIT License
```

## Feature Requests and Bug Reports

### Reporting Bugs

When reporting bugs, include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - Exact steps to reproduce the behavior
3. **Expected Behavior** - What you expected to happen
4. **Actual Behavior** - What actually happened
5. **Environment**:
   - Node.js version
   - Package version
   - Operating system
6. **Code Sample** - Minimal code to reproduce the issue

### Suggesting Features

When suggesting features, include:

1. **Use Case** - Why this feature would be useful
2. **Description** - Detailed explanation of the feature
3. **Examples** - Code examples showing how it would work
4. **Alternatives** - Any alternative solutions you've considered

## Questions?

If you have questions about contributing:

- Open an issue with the `question` label
- Join our [Telegram Community](https://t.me/osintcatru)
- Email us at info@osintcat.net

## Recognition

Contributors will be recognized in:
- The project's README
- Release notes for their contributions
- Our community channels

Thank you for contributing to OsintCat.js!