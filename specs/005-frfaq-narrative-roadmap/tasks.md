# Tasks: FRFAQ Narrative and Roadmap Commands

**Input**: Design documents from `/specs/005-frfaq-narrative-roadmap/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Verification coverage is included where needed because the plan and contract require expanded install/remove/check/doctor validation for the new asset bundle.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. `US1`, `US2`, `US3`)
- Include exact file paths in descriptions

## Path Conventions

- Single project layout at repository root
- Source code in `src/`
- Integration coverage in `tests/integration/`
- Shared packaged assets in `assets/product/templates/`
- Assistant-specific packaged commands in `assets/claude/commands/` and `assets/codex/commands/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the repo for the expanded FRFAQ asset bundle and new history-template layout.

- [X] T001 Create the history template directory structure in `assets/product/templates/history/`
- [X] T002 Update asset path expectations in `specs/005-frfaq-narrative-roadmap/quickstart.md` and `specs/005-frfaq-narrative-roadmap/contracts/asset-bundle-contract.md` if implementation details diverge during build-out

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Expand the shared asset registry and installation model so all later user-story work can be installed, tracked, and validated.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Expand assistant command and shared template registrations in `src/core/assets/registry.ts`
- [X] T004 [P] Extend asset category and manifest validation types in `src/types/index.ts` and `src/core/state/manifest.ts`
- [X] T005 [P] Update shared asset installation/removal behavior for nested history templates in `src/core/orchestration/shared-assets.ts`
- [X] T006 Update install summary expectations and shared-target bookkeeping in `src/core/orchestration/add.ts`
- [X] T007 [P] Extend assistant health expectations for the expanded command bundle in `src/adapters/claude.ts` and `src/adapters/codex.ts`
- [X] T008 [P] Add foundational CLI integration coverage for the expanded managed asset set in `tests/integration/cli.spec.ts`

**Checkpoint**: Registry, manifest, and install/remove/check plumbing support the expanded FRFAQ bundle.

---

## Phase 3: User Story 1 - Capture the durable product story (Priority: P1) 🎯 MVP

**Goal**: Add `narrative` commands and templates so users can create a durable product story from domain, press, and FAQ inputs.

**Independent Test**: Run `product-spec add both` and verify both assistant targets install `product-spec-narrative.md` plus `.product/templates/narrative-template.md`, with health checks recognizing the new managed assets.

- [X] T009 [P] [US1] Create the Claude narrative command asset in `assets/claude/commands/product-spec-narrative.md`
- [X] T010 [P] [US1] Create the Codex narrative command asset in `assets/codex/commands/product-spec-narrative.md`
- [X] T011 [P] [US1] Create the primary narrative template in `assets/product/templates/narrative-template.md`
- [X] T012 [P] [US1] Create the narrative history template in `assets/product/templates/history/narrative-history-template.md`
- [X] T013 [US1] Wire narrative assets into the registry-backed install surface in `src/core/assets/registry.ts`
- [X] T014 [US1] Add integration coverage for narrative asset installation and health reporting in `tests/integration/cli.spec.ts`

**Checkpoint**: Narrative assets install cleanly and are independently verifiable.

---

## Phase 4: User Story 2 - Turn the story into a product roadmap (Priority: P1)

**Goal**: Add `roadmap` commands and templates that convert the narrative into phased, outcome-oriented bets.

**Independent Test**: Run `product-spec add both` and verify both assistant targets install `product-spec-roadmap.md` plus `.product/templates/roadmap-template.md`, with the template clearly separating committed, exploratory, and deferred work.

- [X] T015 [P] [US2] Create the Claude roadmap command asset in `assets/claude/commands/product-spec-roadmap.md`
- [X] T016 [P] [US2] Create the Codex roadmap command asset in `assets/codex/commands/product-spec-roadmap.md`
- [X] T017 [P] [US2] Create the primary roadmap template in `assets/product/templates/roadmap-template.md`
- [X] T018 [P] [US2] Create the roadmap history template in `assets/product/templates/history/roadmap-history-template.md`
- [X] T019 [US2] Wire roadmap assets into the registry-backed install surface in `src/core/assets/registry.ts`
- [X] T020 [US2] Add integration coverage for roadmap asset installation and health reporting in `tests/integration/cli.spec.ts`

**Checkpoint**: Roadmap assets install cleanly and remain independently testable from narrative behavior.

---

## Phase 5: User Story 3 - Preserve continuity across the FRFAQ workflow (Priority: P2)

**Goal**: Make the canonical workflow explicit across commands, including `align` updating `current-truth.md`.

**Independent Test**: Inspect the installed command set and confirm the visible handoff flow is `domain -> press -> faq -> narrative -> roadmap -> speckit* -> align -> current-truth`, with `align` pointing to `current-truth.md`.

- [X] T021 [P] [US3] Update the Claude align, press, and faq command handoffs in `assets/claude/commands/product-spec-align.md`, `assets/claude/commands/product-spec-press.md`, and `assets/claude/commands/product-spec-faq.md`
- [X] T022 [P] [US3] Update the Codex align, press, and faq command handoffs in `assets/codex/commands/product-spec-align.md`, `assets/codex/commands/product-spec-press.md`, and `assets/codex/commands/product-spec-faq.md`
- [X] T023 [P] [US3] Create the current-truth primary template in `assets/product/templates/current-truth-template.md`
- [X] T024 [P] [US3] Create the current-truth history template in `assets/product/templates/history/current-truth-history-template.md`
- [X] T025 [US3] Update shared product guidance so `align` maintains `current-truth.md` instead of `requirements.md` in `assets/product/templates/current-truth-template.md` and `specs/005-frfaq-narrative-roadmap/contracts/asset-bundle-contract.md`
- [X] T026 [US3] Add integration coverage for the canonical workflow asset names and `current-truth` install paths in `tests/integration/cli.spec.ts`

**Checkpoint**: Workflow continuity is explicit and `current-truth.md` is represented as the maintained post-align artifact.

---

## Phase 6: User Story 4 - Upgrade the existing FRFAQ templates into a shared framework (Priority: P2)

**Goal**: Redesign the existing templates into a consistent decision-oriented system with companion history artifacts and migration-friendly structure.

**Independent Test**: Review installed `domain`, `press`, `faq`, and current-state templates and verify each includes a shared decision-oriented layer plus companion history templates, while main documents remain current-state focused.

- [X] T027 [P] [US4] Redesign the domain template around the shared decision-oriented structure in `assets/product/templates/domain-template.md`
- [X] T028 [P] [US4] Redesign the press template around the shared decision-oriented structure in `assets/product/templates/press-template.md`
- [X] T029 [P] [US4] Redesign the FAQ template around the shared decision-oriented structure in `assets/product/templates/faq-template.md`
- [X] T030 [P] [US4] Replace the old requirements template with the new current-state truth model in `assets/product/templates/current-truth-template.md` and retire or repurpose `assets/product/templates/requirements-template.md`
- [X] T031 [P] [US4] Create companion history templates for the redesigned existing artifacts in `assets/product/templates/history/domain-history-template.md`, `assets/product/templates/history/press-history-template.md`, and `assets/product/templates/history/faq-history-template.md`
- [X] T032 [US4] Update registry and installation expectations for the redesigned shared template set in `src/core/assets/registry.ts` and `src/core/orchestration/shared-assets.ts`
- [X] T033 [US4] Extend CLI integration coverage for the redesigned template bundle and history-template paths in `tests/integration/cli.spec.ts`

**Checkpoint**: Existing FRFAQ templates share one coherent structure and install as a migration-ready bundle.

---

## Phase 7: User Story 5 - Keep current truth and roadmap distinct (Priority: P2)

**Goal**: Ensure `current-truth.md` remains the live current-state spec while `roadmap.md` stays forward-looking.

**Independent Test**: Inspect the installed `roadmap` and `current-truth` templates and verify their sections and wording clearly separate future sequencing from present reality.

- [X] T034 [P] [US5] Refine roadmap template language to emphasize sequencing, confidence, and phased bets in `assets/product/templates/roadmap-template.md`
- [X] T035 [P] [US5] Refine current-truth template language to emphasize shipped or supported product reality in `assets/product/templates/current-truth-template.md`
- [X] T036 [P] [US5] Update align command guidance for current-state truth maintenance in `assets/claude/commands/product-spec-align.md` and `assets/codex/commands/product-spec-align.md`
- [X] T037 [US5] Add verification coverage that distinguishes roadmap and current-truth responsibilities in `tests/integration/cli.spec.ts`

**Checkpoint**: Roadmap and current truth have clearly separated responsibilities.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, docs, and validation across all user stories

- [X] T038 [P] Normalize product artifact naming and references across packaged command assets in `assets/claude/commands/` and `assets/codex/commands/`
- [X] T039 [P] Update package-facing documentation references for the expanded workflow in `README.md` and `AGENTS.md`
- [X] T040 Run the full quickstart validation and align any mismatched wording in `specs/005-frfaq-narrative-roadmap/quickstart.md` and `tests/integration/cli.spec.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup**: No dependencies
- **Phase 2: Foundational**: Depends on Phase 1 and blocks all user stories
- **Phase 3: US1 Narrative**: Depends on Phase 2
- **Phase 4: US2 Roadmap**: Depends on Phase 2; can proceed after or in parallel with US1 if staffed
- **Phase 5: US3 Workflow Continuity**: Depends on US1 and US2 because it stitches their handoffs into the canonical flow
- **Phase 6: US4 Template Redesign**: Depends on Phase 2 and should follow US1-US3 so the redesign includes the final artifact set
- **Phase 7: US5 Current Truth Boundary**: Depends on US2, US3, and US4 because it finalizes the separation between roadmap and current truth
- **Phase 8: Polish**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after foundational work; no dependency on other user stories
- **US2 (P1)**: Can start after foundational work; independent of US1 at install-surface level
- **US3 (P2)**: Depends on US1 and US2 assets existing
- **US4 (P2)**: Depends on foundational asset plumbing; benefits from US3 workflow decisions already being in place
- **US5 (P2)**: Depends on US2 roadmap template plus US3 current-truth workflow decisions

### Parallel Opportunities

- Foundational tasks `T004`, `T005`, `T007`, and `T008` can proceed in parallel after `T003`
- Within US1, `T009`-`T012` can run in parallel
- Within US2, `T015`-`T018` can run in parallel
- Within US3, `T021`-`T024` can run in parallel
- Within US4, `T027`-`T031` can run in parallel
- Within US5, `T034`-`T036` can run in parallel

---

## Parallel Example: User Story 1

```bash
Task: "Create the Claude narrative command asset in assets/claude/commands/product-spec-narrative.md"
Task: "Create the Codex narrative command asset in assets/codex/commands/product-spec-narrative.md"
Task: "Create the primary narrative template in assets/product/templates/narrative-template.md"
Task: "Create the narrative history template in assets/product/templates/history/narrative-history-template.md"
```

---

## Parallel Example: User Story 4

```bash
Task: "Redesign the domain template in assets/product/templates/domain-template.md"
Task: "Redesign the press template in assets/product/templates/press-template.md"
Task: "Redesign the FAQ template in assets/product/templates/faq-template.md"
Task: "Create history templates in assets/product/templates/history/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate that `narrative` assets install and are tracked correctly
5. Demo the durable-story workflow increment

### Incremental Delivery

1. Finish setup and foundational asset plumbing
2. Deliver `narrative`
3. Deliver `roadmap`
4. Stitch the canonical workflow and `current-truth` positioning into command handoffs
5. Redesign the existing templates into the shared framework
6. Finalize the roadmap/current-truth boundary and run quickstart validation

### Parallel Team Strategy

With multiple developers:

1. One developer expands registry/manifest/install plumbing
2. One developer builds `narrative` assets
3. One developer builds `roadmap` assets
4. After those land, another developer updates workflow continuity and current-truth positioning
5. Template redesign and verification can then be split by artifact family

---

## Notes

- All tasks use exact file paths and follow the required checklist format
- Story phases are structured so each increment can be validated independently
- Integration coverage is included because the feature changes the public CLI-installed asset bundle
- Suggested MVP scope: **US1 only**
