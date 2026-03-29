# pm-kit Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-29

## Active Technologies
- TypeScript 5.x on Node.js 22 LTS + `commander` for CLI parsing, `zod` for config/state validation, `vitest` for test execution, `tsx` for local development, `typescript` for build/type-check (003-prime-time-cli)
- File system only; project-local managed state in `.pmkit/manifest.json`; managed assets written into assistant command directories and `.product/templates/` (003-prime-time-cli)

- Markdown (Codex command files and templates — no runtime language)
- Bash (optional installer script, future)
- Python (optional, future installer)

## Project Structure

```text
.Codex/commands/        # Codex slash command definitions (pm-*.md)
.product/templates/      # Document templates (domain, press, faq, requirements)
.product/                # Generated product documents (created at runtime)
.specify/                # spec-kit directory (not owned by pm-kit)
specs/                   # Feature specs (spec-kit output)
```

## Commands

- `/pm-domain` — create/update `.product/domain.md`
- `/pm-press`  — create/update `.product/press.md`
- `/pm-faq`    — create/update `.product/faq.md`
- `/pm-align`  — reconcile `.product/` with `.specify/` specs; create/update `.product/requirements.md`

## Code Style

- All command files are Markdown with YAML frontmatter
- Templates use `[PLACEHOLDER_TOKEN]` for AI-fillable slots
- HTML comments (`<!-- ... -->`) for template instructions (removed when filled)
- No trailing whitespace; single blank line between sections

## Recent Changes
- 003-prime-time-cli: Added TypeScript 5.x on Node.js 22 LTS + `commander` for CLI parsing, `zod` for config/state validation, `vitest` for test execution, `tsx` for local development, `typescript` for build/type-check
- 002-install-script-readme: Added [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

- 001-pm-kit-commands: Initial four commands and four templates

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
