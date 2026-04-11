# Implementation Plan: Product-Spec Help Command

**Branch**: `007-product-help-command` | **Date**: 2026-04-11 | **Spec**: [spec.md](/Users/ehudamiri/Documents/projects/product-spec/specs/007-product-help-command/spec.md)
**Input**: Feature specification from `/specs/007-product-help-command/spec.md`

## Summary

Add a packaged `/product-spec-help` assistant command for both Claude Code and Codex so users can understand the workflow without bouncing between the README and multiple command files. The implementation extends the installed command bundle with one new help asset per target, keeps the workflow knowledge self-contained and canonical inside that asset, updates package-facing documentation, and expands integration coverage so install, check, and doctor flows treat the help command as a first-class managed asset while still presenting it as an explainer rather than another production workflow step.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 22 LTS, plus Markdown command assets  
**Primary Dependencies**: `commander`, `zod`, Node.js standard library  
**Storage**: File system only; packaged command assets under `assets/`, installed state in `.product-spec/manifest.json`, and user-project product artifacts under `docs/product/` when those workflow steps are used  
**Testing**: `vitest` integration and unit tests, plus CLI execution via `tsx` loader  
**Target Platform**: Local CLI usage on macOS/Linux/Windows project workspaces with Claude Code and Codex integration targets  
**Project Type**: CLI that installs and validates Markdown/YAML assistant-command and template bundles  
**Performance Goals**: Preserve current near-instant local CLI behavior for `add`, `check`, and `doctor`; overview help content should stay concise enough to scan in under a minute while question-mode answers stay focused on one topic  
**Constraints**: Preserve deterministic offline asset installation, keep canonical workflow/file naming aligned with `docs/product/` and the spec-kit handoff, avoid introducing a new shared template or runtime subsystem for a documentation-only capability, and keep health guidance accurate across both assistant targets  
**Scale/Scope**: Add 1 new assistant command asset per target, update the shared assistant-command registry and user-facing docs, and extend integration coverage for the expanded managed bundle

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file at [constitution.md](/Users/ehudamiri/Documents/projects/product-spec/.specify/memory/constitution.md) is still an unfilled template, so no enforceable project-specific gates are currently defined. Provisional pass with one follow-up note:

- No active constitutional principles are available to validate against; planning proceeds using repository conventions from `AGENTS.md`, package metadata, and the existing source structure.
- No constitutional violation is currently identified by the proposed design.
- Follow-up risk: once a real constitution exists, this feature should be rechecked against it.

## Project Structure

### Documentation (this feature)

```text
specs/007-product-help-command/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── help-command-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
assets/
├── claude/commands/
│   ├── product-spec-align.md
│   ├── product-spec-domain.md
│   ├── product-spec-faq.md
│   ├── product-spec-help.md
│   ├── product-spec-narrative.md
│   ├── product-spec-press.md
│   └── product-spec-roadmap.md
├── codex/commands/
│   ├── product-spec-align.md
│   ├── product-spec-domain.md
│   ├── product-spec-faq.md
│   ├── product-spec-help.md
│   ├── product-spec-narrative.md
│   ├── product-spec-press.md
│   └── product-spec-roadmap.md
└── product/templates/
    ├── current-truth-template.md
    ├── domain-template.md
    ├── faq-template.md
    ├── narrative-template.md
    ├── press-template.md
    ├── requirements-template.md
    ├── roadmap-template.md
    └── history/
        ├── current-truth-history-template.md
        ├── domain-history-template.md
        ├── faq-history-template.md
        ├── narrative-history-template.md
        ├── press-history-template.md
        └── roadmap-history-template.md

src/
├── adapters/
├── cli/
│   ├── commands/
│   └── output/
├── core/
│   ├── assets/
│   ├── fs/
│   ├── orchestration/
│   └── state/
└── types/

tests/
├── integration/
└── unit/
```

**Structure Decision**: Keep the existing single-project CLI structure. This feature is an assistant-command asset bundle expansion with documentation and verification updates, centered on [registry.ts](/Users/ehudamiri/Documents/projects/product-spec/src/core/assets/registry.ts), the new packaged help assets under `assets/*/commands/`, [README.md](/Users/ehudamiri/Documents/projects/product-spec/README.md), and integration coverage in [cli.spec.ts](/Users/ehudamiri/Documents/projects/product-spec/tests/integration/cli.spec.ts). Existing orchestration code continues to install, validate, and remove assets through the registry rather than through a new feature-specific code path.

## Phase 0: Research Summary

Research outputs are captured in [research.md](/Users/ehudamiri/Documents/projects/product-spec/specs/007-product-help-command/research.md). Key decisions:

- Implement this capability as a packaged assistant slash command, not as a new top-level CLI subcommand.
- Keep the workflow guidance self-contained in the installed help asset so it remains useful even before a project has created any product docs.
- Use request-shape routing: empty input produces a compact overview, while non-empty input produces a focused explanation of the asked step, artifact, or relationship.
- Handle ambiguous or legacy artifact names with best-effort mapping back to canonical workflow concepts and `docs/product/` terminology.
- Expand the managed asset registry and integration coverage, but do not add a new shared template because the help command is explanatory rather than document-producing.

## Phase 1: Design & Contracts

### Data Model

Documented in [data-model.md](/Users/ehudamiri/Documents/projects/product-spec/specs/007-product-help-command/data-model.md). The design centers on:

- User help requests and the two response modes they select
- Canonical workflow knowledge entries that describe prerequisites, outputs, and purpose
- Installed help command assets for each assistant target
- Best-effort term mapping for legacy or ambiguous questions

### Contracts

Documented in [help-command-contract.md](/Users/ehudamiri/Documents/projects/product-spec/specs/007-product-help-command/contracts/help-command-contract.md). The contract defines:

- Installed help-command filenames for Claude Code and Codex
- Expected overview-mode and question-mode behavior
- Asset-management expectations for `add`, `remove`, `check`, and `doctor`
- Documentation and naming alignment requirements for canonical paths and workflow terminology

### Quickstart

Documented in [quickstart.md](/Users/ehudamiri/Documents/projects/product-spec/specs/007-product-help-command/quickstart.md). It validates asset installation, health reporting, documentation updates, and manual slash-command behavior for both overview and deep-dive help.

## Post-Design Constitution Check

Rechecked against the current placeholder constitution:

- No newly introduced constitutional conflicts were discovered.
- The design stays aligned with repository conventions: file-system-managed assets, deterministic installation, documentation-first workflow guidance, and test-backed CLI health validation.
- Remaining governance risk is unchanged: once project principles are formalized, this plan should be revalidated.

## Complexity Tracking

No constitution violations or exceptional complexity justifications are currently required.
