# Tasks: Product-Spec Help Command

**Input**: Design documents from `/specs/007-product-help-command/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Verification coverage is included because this feature expands the public installed assistant-command bundle and adds user-visible workflow guidance that must remain canonical across install, remove, check, and doctor flows.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (for example, `US1`, `US2`, `US3`)
- Include exact file paths in descriptions

## Path Conventions

- Single project layout at repository root
- Packaged assistant command assets in `assets/claude/commands/` and `assets/codex/commands/`
- CLI asset registry and orchestration code in `src/core/`
- Integration coverage in `tests/integration/`
- Feature planning artifacts in `specs/007-product-help-command/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Keep the feature docs and validation notes aligned with the intended implementation surface before code changes begin.

- [X] T001 Align implementation notes and manual validation expectations in `specs/007-product-help-command/plan.md` and `specs/007-product-help-command/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add the new help asset to the managed assistant bundle so all later story work installs, removes, and validates consistently.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Add `product-spec-help.md` to the managed assistant command registry in `src/core/assets/registry.ts`

**Checkpoint**: The help command is part of the manifest-backed assistant asset bundle for both targets.

---

## Phase 3: User Story 1 - Get a Quick Workflow Overview (Priority: P1) 🎯 MVP

**Goal**: Make `/product-spec-help` with no input produce a compact, scan-friendly overview of the canonical workflow.

**Independent Test**: Install the assets, run `/product-spec-help` in Claude Code or Codex, and verify the response shows the workflow in order with prerequisite/output artifacts and one-line purpose explanations.

- [X] T003 [P] [US1] Author overview-mode workflow map and artifact summaries in `assets/claude/commands/product-spec-help.md`
- [X] T004 [P] [US1] Author overview-mode workflow map and artifact summaries in `assets/codex/commands/product-spec-help.md`
- [X] T005 [US1] Add integration assertions for installing, retaining, and removing the help asset in `tests/integration/cli.spec.ts`

**Checkpoint**: `/product-spec-help` exists for both targets and the no-input overview path is ready for manual validation.

---

## Phase 4: User Story 2 - Ask About One Step or Artifact in Detail (Priority: P1)

**Goal**: Make `/product-spec-help <question>` answer one artifact or handoff directly before expanding into supporting workflow context.

**Independent Test**: Run `/product-spec-help what is domain.md and why is it needed?` and `/product-spec-help what comes after roadmap?` and verify the answers stay focused while explaining prerequisite, downstream effect, and next step.

- [X] T006 [P] [US2] Add question-mode response rules, topic-first explanations, and step-to-step handoff guidance in `assets/claude/commands/product-spec-help.md`
- [X] T007 [P] [US2] Add question-mode response rules, topic-first explanations, and step-to-step handoff guidance in `assets/codex/commands/product-spec-help.md`
- [X] T008 [US2] Add integration assertions for question-mode examples and spec-kit handoff coverage in `tests/integration/cli.spec.ts`

**Checkpoint**: Focused artifact and relationship questions are answered directly without collapsing back into a full workflow dump.

---

## Phase 5: User Story 3 - Get a Trustworthy Workflow Map That Uses Current Terminology (Priority: P2)

**Goal**: Ensure the help command and package docs consistently use canonical `docs/product/` naming, explain legacy aliases safely, and keep roadmap separate from current truth.

**Independent Test**: Ask about canonical artifacts, legacy paths, `current-truth.md`, and `roadmap.md`, then verify the responses use current names and accurately describe the product-spec to spec-kit handoff.

- [X] T009 [P] [US3] Normalize canonical `docs/product/`, legacy-alias, and roadmap-versus-current-truth guidance in `assets/claude/commands/product-spec-help.md`
- [X] T010 [P] [US3] Normalize canonical `docs/product/`, legacy-alias, and roadmap-versus-current-truth guidance in `assets/codex/commands/product-spec-help.md`
- [X] T011 [P] [US3] Add `/product-spec-help` to installed assistant command listings and explanatory docs in `README.md`
- [X] T012 [US3] Expand integration assertions for canonical terminology and missing-help-asset health behavior in `tests/integration/cli.spec.ts`

**Checkpoint**: Help responses and package docs reinforce the same canonical workflow language and file paths.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Reconcile the implementation with the feature docs and finish end-to-end verification.

- [X] T013 [P] Update final behavior notes in `specs/007-product-help-command/quickstart.md` and `specs/007-product-help-command/contracts/help-command-contract.md`
- [X] T014 Run end-to-end verification for the expanded assistant bundle and reconcile any remaining assertion gaps in `tests/integration/cli.spec.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup**: No dependencies
- **Phase 2: Foundational**: Depends on Phase 1 and blocks all user stories
- **Phase 3: US1 Overview Mode**: Depends on Phase 2
- **Phase 4: US2 Question Mode**: Depends on Phase 3 because it extends the same help-command assets
- **Phase 5: US3 Canonical Terminology**: Depends on Phases 3 and 4 so the final wording matches the implemented help behavior
- **Phase 6: Polish**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after foundational work; no dependency on other stories
- **US2 (P1)**: Depends on US1 because it extends the same installed help-command assets with focused explanation behavior
- **US3 (P2)**: Depends on US1 and US2 so canonical naming and docs reflect the final help-command behavior

### Parallel Opportunities

- Within US1, `T003` and `T004` can run in parallel
- Within US2, `T006` and `T007` can run in parallel
- Within US3, `T009`, `T010`, and `T011` can run in parallel
- In Polish, `T013` can run before the final verification task `T014`

---

## Parallel Example: User Story 1

```bash
Task: "Author overview-mode workflow map and artifact summaries in assets/claude/commands/product-spec-help.md"
Task: "Author overview-mode workflow map and artifact summaries in assets/codex/commands/product-spec-help.md"
```

---

## Parallel Example: User Story 3

```bash
Task: "Normalize canonical docs/product, legacy-alias, and roadmap-versus-current-truth guidance in assets/claude/commands/product-spec-help.md"
Task: "Normalize canonical docs/product, legacy-alias, and roadmap-versus-current-truth guidance in assets/codex/commands/product-spec-help.md"
Task: "Add /product-spec-help to installed assistant command listings and explanatory docs in README.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the no-input overview path manually in one assistant target
5. Demo the installed help overview before adding deeper question behavior

### Incremental Delivery

1. Add the help asset to the managed bundle
2. Deliver overview mode for both assistant targets
3. Add detailed question-mode behavior
4. Normalize canonical terminology and package docs
5. Finish with quickstart and integration verification

### Parallel Team Strategy

With multiple developers:

1. One developer updates the shared registry and integration coverage scaffolding
2. One developer authors the Claude help asset
3. One developer authors the Codex help asset
4. Once the core help assets are in place, another developer updates README and feature docs while test coverage is finalized

---

## Notes

- All tasks use exact file paths and follow the required checklist format
- No new shared template is introduced for this feature; the help command is asset-only
- Suggested MVP scope: **US1 only**
- Manual assistant validation remains important because the command behavior lives in packaged Markdown assets rather than compiled runtime logic
