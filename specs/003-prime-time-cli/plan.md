# Implementation Plan: Prime-Time CLI and Multi-Agent Readiness

**Branch**: `003-prime-time-cli` | **Date**: 2026-03-29 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/003-prime-time-cli/spec.md`

## Summary

Turn pm-kit into a production-ready npm CLI named `pmkit`, implemented in TypeScript on Node, with a single binary and subcommands for `add`, `remove`, `check`, `doctor`, `help`, and `version`. The CLI will manage static pm-kit command/template assets for both Claude Code and Codex via agent adapters, track pmkit-owned files in a project-local manifest, and provide safe install/remove/check flows for global and local usage.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 22 LTS  
**Primary Dependencies**: `commander` for CLI parsing, `zod` for config/state validation, `vitest` for test execution, `tsx` for local development, `typescript` for build/type-check  
**Storage**: File system only; project-local managed state in `.pmkit/manifest.json`; managed assets written into assistant command directories and `.product/templates/`  
**Testing**: Vitest unit tests + integration tests using temporary fixture projects and filesystem assertions  
**Target Platform**: Cross-platform developer environments with Node.js installed, with primary support for macOS and Linux and compatibility with Windows path handling  
**Project Type**: Single-package CLI developer tool  
**Performance Goals**: `pmkit add`, `remove`, and `check` complete in under 3 seconds on a typical local project, excluding first-time npm installation  
**Constraints**: Must preserve Markdown asset fidelity, avoid deleting non-pmkit files, support both global and local CLI usage, and keep runtime dependencies minimal  
**Scale/Scope**: One npm package, two assistant adapters, fewer than 20 managed asset files, single-project repo migration from shell installer to structured CLI

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| Project constitution defined and enforceable | ✅ Pass | `.specify/memory/constitution.md` currently contains placeholder template text rather than active governance rules, so no concrete gates are enforceable yet |
| Simplicity and scope discipline | ✅ Pass | Design stays as a single-package CLI with filesystem operations only and no service/runtime backend |
| Safe project modification | ✅ Pass | Planned manifest-based ownership tracking keeps `remove` scoped to pmkit-managed files |
| Documentation and onboarding clarity | ✅ Pass | Plan includes README/global-vs-local guidance, quickstart coverage, and explicit CLI contracts |

**Constitution verdict**: No blocking constitution gates are defined beyond general safety and simplicity expectations, and the planned design satisfies those expectations.

*Post-design re-check*: Research and design artifacts preserve a single-package architecture, explicit safety boundaries, and documented contracts. ✅ Still passes.

## Project Structure

### Documentation (this feature)

```text
specs/003-prime-time-cli/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── cli-contract.md  # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
assets/
├── claude/commands/
├── codex/commands/
└── product/templates/

src/
├── cli/
│   ├── main.ts
│   ├── commands/
│   └── output/
├── core/
│   ├── orchestration/
│   ├── state/
│   ├── assets/
│   └── fs/
├── adapters/
│   ├── claude.ts
│   ├── codex.ts
│   └── types.ts
└── types/

tests/
├── unit/
├── integration/
└── fixtures/

package.json
tsconfig.json
README.md
```

**Structure Decision**: Use a single-package CLI project at the repository root. Static Markdown assets move into a dedicated `assets/` tree, and all behavior lives under `src/` with clear boundaries between CLI parsing, shared orchestration, and agent-specific adapters.

## Phase 0 Summary (Research complete)

All major implementation choices are resolved in [research.md](research.md):

1. Publish a TypeScript CLI to npm rather than extending the shell installer
2. Keep one `pmkit` binary with subcommands instead of multiple executables
3. Model Claude Code and Codex as adapter implementations behind shared orchestration
4. Use a root-level `.pmkit/manifest.json` to track pmkit-owned files for safe `remove`
5. Define `check` as a filesystem and configuration health validation command, with `doctor` reserved for richer diagnostics and repair guidance

## Phase 1 Summary (Design complete)

Design artifacts produced:

- [data-model.md](data-model.md): entities for assistant targets, managed manifests, asset records, and health reports
- [contracts/cli-contract.md](contracts/cli-contract.md): command grammar, flags, exit behavior, and output expectations
- [quickstart.md](quickstart.md): end-to-end validation flow for global/local installation, add/remove/check, and asset verification

## Complexity Tracking

No constitution violations or exceptional complexity require justification.
