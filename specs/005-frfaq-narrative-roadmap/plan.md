# Implementation Plan: FRFAQ Narrative and Roadmap Commands

**Branch**: `005-frfaq-narrative-roadmap` | **Date**: 2026-03-30 | **Spec**: [spec.md](/Users/ehudamiri/Documents/projects/product-spec/specs/005-frfaq-narrative-roadmap/spec.md)
**Input**: Feature specification from `/specs/005-frfaq-narrative-roadmap/spec.md`

## Summary

Extend the packaged product-spec asset bundle so the installed workflow becomes `domain -> press -> faq -> narrative -> roadmap -> speckit* -> align -> current-truth`. The implementation adds new assistant command assets and shared templates for `narrative`, `roadmap`, and `current-truth`, redesigns the existing FRFAQ templates into a shared decision-oriented framework, and updates registry, installation, and verification coverage so normal command usage migrates older documents toward the new structure.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 22 LTS  
**Primary Dependencies**: `commander`, `zod`, Node.js standard library  
**Storage**: File system only; packaged assets under `assets/`, installed state in `.product-spec/manifest.json`, managed project assets under assistant command directories and `.product/templates/`  
**Testing**: `vitest` integration and unit tests, plus CLI execution via `tsx` loader  
**Target Platform**: Local CLI usage on macOS/Linux/Windows project workspaces with Claude Code and Codex target directories  
**Project Type**: CLI that installs and validates Markdown/YAML asset bundles  
**Performance Goals**: Preserve current local CLI responsiveness; `add`, `check`, and `doctor` should remain effectively instantaneous for the small managed asset set and complete within a few seconds in typical local repos  
**Constraints**: Preserve managed-file safety, keep asset installation deterministic, avoid introducing network dependencies, preserve compatibility with existing manifest structure where possible, and migrate older installed documents through normal command usage rather than a separate migration-only flow  
**Scale/Scope**: Expand from 4 assistant commands and 4 shared templates to a broader FRFAQ bundle that includes 6+ commands, 6+ primary templates, and companion history artifacts across up to 2 assistant targets

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file at [constitution.md](/Users/ehudamiri/Documents/projects/product-spec/.specify/memory/constitution.md) is still an unfilled template, so no enforceable project-specific gates are currently defined. Provisional pass with one follow-up note:

- No active constitutional principles are available to validate against; planning proceeds using repository conventions from `AGENTS.md`, package metadata, and existing source structure.
- No constitutional violation is currently identified by the proposed design.
- Follow-up risk: once a real constitution exists, this feature should be rechecked against it.

## Project Structure

### Documentation (this feature)

```text
specs/005-frfaq-narrative-roadmap/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── asset-bundle-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
assets/
├── claude/commands/
│   ├── product-spec-align.md
│   ├── product-spec-domain.md
│   ├── product-spec-faq.md
│   ├── product-spec-press.md
│   ├── product-spec-narrative.md
│   └── product-spec-roadmap.md
├── codex/commands/
│   ├── product-spec-align.md
│   ├── product-spec-domain.md
│   ├── product-spec-faq.md
│   ├── product-spec-press.md
│   ├── product-spec-narrative.md
│   └── product-spec-roadmap.md
└── product/templates/
    ├── domain-template.md
    ├── press-template.md
    ├── faq-template.md
    ├── narrative-template.md
    ├── roadmap-template.md
    ├── current-truth-template.md
    └── history/
        ├── domain-history-template.md
        ├── press-history-template.md
        ├── faq-history-template.md
        ├── current-truth-history-template.md
        ├── narrative-history-template.md
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

**Structure Decision**: Keep the existing single-project CLI structure. This feature is implemented as an asset-bundle expansion plus orchestration and test updates, centered on [registry.ts](/Users/ehudamiri/Documents/projects/product-spec/src/core/assets/registry.ts), [add.ts](/Users/ehudamiri/Documents/projects/product-spec/src/core/orchestration/add.ts), [shared-assets.ts](/Users/ehudamiri/Documents/projects/product-spec/src/core/orchestration/shared-assets.ts), and CLI integration coverage in [cli.spec.ts](/Users/ehudamiri/Documents/projects/product-spec/tests/integration/cli.spec.ts).

## Phase 0: Research Summary

Research outputs are captured in [research.md](/Users/ehudamiri/Documents/projects/product-spec/specs/005-frfaq-narrative-roadmap/research.md). Key decisions:

- Use `current-truth.md` as the maintained current-state artifact updated by `align`.
- Keep `roadmap` distinct from `current-truth` so sequencing and current reality do not collapse into one document.
- Redesign all FRFAQ templates around a shared decision-oriented layer while moving most history into dedicated history artifacts.
- Implement migration through normal command updates rather than a separate migration-only command.
- Extend the static asset registry and manifest-driven installation path instead of introducing dynamic asset discovery.

## Phase 1: Design & Contracts

### Data Model

Documented in [data-model.md](/Users/ehudamiri/Documents/projects/product-spec/specs/005-frfaq-narrative-roadmap/data-model.md). The design centers on:

- Expanded packaged asset definitions for assistant commands and shared templates
- A canonical workflow sequence model
- Primary product artifact definitions for `narrative`, `roadmap`, and `current-truth`
- Companion history artifact relationships

### Contracts

Documented in [asset-bundle-contract.md](/Users/ehudamiri/Documents/projects/product-spec/specs/005-frfaq-narrative-roadmap/contracts/asset-bundle-contract.md). The contract defines:

- Installed command filenames per assistant target
- Installed shared template filenames and target paths
- Expected CLI-visible behavior for `add`, `remove`, `check`, and `doctor`
- Backward-compatibility expectations for existing managed projects

### Quickstart

Documented in [quickstart.md](/Users/ehudamiri/Documents/projects/product-spec/specs/005-frfaq-narrative-roadmap/quickstart.md). It validates the canonical workflow and the new installed asset set end-to-end.

## Post-Design Constitution Check

Rechecked against the current placeholder constitution:

- No newly introduced constitutional conflicts were discovered.
- The design stays aligned with repository conventions: file-system-managed assets, deterministic installation, test-backed CLI behavior, and no destructive migration path.
- Remaining governance risk is unchanged: once project principles are formalized, this plan should be revalidated.

## Complexity Tracking

No constitution violations or exceptional complexity justifications are currently required.
