# product-spec

The product management counterpart to [spec-kit](https://github.com/github/spec-kit). product-spec brings product management disciplines to spec-driven development, following Amazon's Working Backwards (PR/FAQ) methodology.

While spec-kit handles engineering specifications, product-spec handles the product narrative: the domain context, press releases, FAQs, and requirements that define what you're building and why before spec-kit defines how.

## Installation

### Recommended: install globally from npm

```sh
npm install -g product-spec
```

Then inside any project:

```sh
product-spec add claude
product-spec add codex
product-spec add both
product-spec check both
```

### Option 2: run directly without a global install

```sh
npx --yes --package product-spec product-spec add claude
```

Use the same pattern for other commands:

```sh
npx --yes --package product-spec product-spec check both
```

### Option 3: install from GitHub source

This is the least recommended path, but it is useful when testing unpublished changes:

```sh
npm install -g github:ehud-am/product-spec
```

## CLI Usage

Project integration commands:

```text
product-spec add claude
product-spec add codex
product-spec add both
product-spec remove claude
product-spec remove codex
product-spec remove both
product-spec check both
product-spec doctor both
product-spec version
product-spec help
```

| Command | Purpose |
|---------|---------|
| `product-spec add <target>` | Add product-spec-managed assistant commands and shared templates to the current project |
| `product-spec remove <target>` | Remove only product-spec-managed files for the selected target |
| `product-spec check [target]` | Validate that managed integrations are present and healthy |
| `product-spec doctor [target]` | Show richer diagnostics and recovery guidance |
| `product-spec version` | Print the installed CLI version |
| `product-spec help` | Show command help and examples |

## Assistant Commands

After adding an integration, use the installed slash commands inside the assistant:

```text
/product-spec-domain ...
/product-spec-press ...
/product-spec-faq
/product-spec-align
```

| Target | Command directory | Slash commands |
|--------|-------------------|----------------|
| Claude Code | `.claude/commands/` | `/product-spec-domain`, `/product-spec-press`, `/product-spec-faq`, `/product-spec-align` |
| Codex | `.Codex/commands/` | `/product-spec-domain`, `/product-spec-press`, `/product-spec-faq`, `/product-spec-align` |

## How It Works

product-spec creates a `.product/` folder in your project that maintains a living, cumulative view of the product across releases. Each document grows over time, telling the full story of the project from its first release to the one currently under development.

### Documents

| File | Purpose |
|------|---------|
| `.product/domain.md` | Industry context, target users, terminology, competitive landscape |
| `.product/press.md` | Press releases for every release, upcoming first and historical below |
| `.product/faq.md` | External and internal FAQs for every release, upcoming first and historical below |
| `.product/requirements.md` | Release-independent, complete view of all product use cases and capabilities |

### Workflow

```text
/product-spec-domain  -->  /product-spec-press  -->  /product-spec-faq  -->  /speckit.specify  -->  /product-spec-align
    (context)       (promise)         (challenge)       (engineer)             (reconcile)
```

1. `/product-spec-domain` establishes the domain context: who the users are, what problem matters, and who the alternatives are.
2. `/product-spec-press` writes a press release as if the next release has already shipped.
3. `/product-spec-faq` challenges the press release with hard questions from customers and stakeholders.
4. `/speckit.specify` hands off to spec-kit for engineering specifications.
5. `/product-spec-align` reconciles product docs with the final engineering scope.

## Key Concepts

### Cumulative Documents

Unlike traditional release notes, product-spec documents are cumulative. The press release file contains all press releases ever written for the project, with the upcoming release at the top and historical releases below. The same applies to FAQs.

### `requirements.md` as the Product Spec

While `press.md` and `faq.md` are organized by release, `requirements.md` is organized by functional area. It is the release-independent, always-current answer to "what does this product do?"

### Working Backwards

The methodology is Amazon's PR/FAQ approach:
- start with the customer experience, not the technical solution
- force hard questions early before committing engineering resources
- treat the press release as a contract for value, clarity, and scope

## Release and Publishing

GitHub Actions now handles:
- CI validation on pushes and pull requests
- packaging tagged releases
- publishing the npm package when a `v*` tag is pushed

## Rename Notes

`product-spec` is now the canonical package name, CLI name, assistant command prefix, and project-local manifest path.

## Requirements

- Node.js and npm
- [Claude Code](https://claude.ai/code) and/or Codex for assistant integration targets
- [spec-kit](https://github.com/github/spec-kit) for the `/speckit.specify` portion of the workflow

## Changelog

Project history lives in [CHANGELOG.md](CHANGELOG.md).

## License

MIT
