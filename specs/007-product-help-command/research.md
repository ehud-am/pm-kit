# Research: Product-Spec Help Command

## Decision 1: Ship the capability as a packaged assistant command, not a CLI subcommand

- **Decision**: Implement `/product-spec-help` as a new assistant command asset for both Claude Code and Codex, installed through the existing `product-spec add` flow.
- **Rationale**: The request is about helping users inside the assistant workflow where the other product-spec commands already live. The current product only installs static assistant-command assets and shared templates; adding one more command fits the existing package model and automatically benefits from the manifest-backed `add`, `remove`, `check`, and `doctor` flows.
- **Alternatives considered**:
  - **New top-level CLI command**: Rejected because the user asked for a workflow-explainer command in the same family as `/product-spec-domain` and related slash commands, not a separate terminal-only surface.
  - **README-only improvement**: Rejected because the spec requires both overview and question-driven explanatory behavior inside the installed assistant experience.

## Decision 2: Keep the workflow map self-contained inside the help asset

- **Decision**: Put the canonical workflow explanation directly in the help command asset instead of depending on local product docs being present.
- **Rationale**: The spec explicitly requires the command to remain useful even when no local workflow artifacts exist. A self-contained workflow map also reduces ambiguity for first-time users and ensures consistent answers across blank projects and partially configured repos.
- **Alternatives considered**:
  - **Read local `docs/product/` files first and explain from there**: Rejected because those files may not exist yet and may reflect incomplete or stale project state rather than canonical product-spec guidance.
  - **Point users to the README instead of embedding knowledge**: Rejected because it adds context-switching and undermines the goal of simple answers inside the assistant.

## Decision 3: Use input shape to switch between overview and deep-dive behavior

- **Decision**: Treat empty or whitespace-only input as overview mode and any non-empty input as question mode.
- **Rationale**: This matches the spec directly, keeps the command interface simple, and aligns with the established product-spec command pattern where `$ARGUMENTS` is optional free text rather than structured flags.
- **Alternatives considered**:
  - **Introduce explicit mode keywords such as `overview:` or `explain:`**: Rejected because the user asked for a two-mode command without extra syntax.
  - **Always return overview plus deep detail together**: Rejected because it would make narrow questions verbose and weaken the simplicity/completeness balance.

## Decision 4: Model workflow knowledge as canonical entries with prerequisite/output/purpose fields

- **Decision**: Structure the help content around canonical workflow entries that each describe the step name, usual prerequisite artifact, created or updated artifact, a one-line "what it is and why it matters" summary, and the next logical handoff.
- **Rationale**: This directly maps to the required overview diagram and gives question-mode responses a consistent source of truth. It also helps separate workflow facts from phrasing details in the assistant command asset.
- **Alternatives considered**:
  - **A loose narrative description of the workflow**: Rejected because it would be harder to keep concise, scan-friendly, and internally consistent.
  - **A file-only glossary with no step relationships**: Rejected because the spec requires explaining what comes before and after, not just what a file is.

## Decision 5: Treat ambiguous and legacy terms as mapping problems, not hard errors

- **Decision**: When users ask about an unknown or legacy term, the help command should map it to the closest canonical concept, state the assumption, and answer using current naming under `docs/product/`.
- **Rationale**: The feature is meant to reduce confusion, and the product already has legacy path history (`product/`, `.product/`) that users may still mention. Best-effort mapping gives them a useful answer without reinforcing outdated terminology as canonical.
- **Alternatives considered**:
  - **Refuse to answer unless the term matches exactly**: Rejected because it would be brittle and unfriendly for a help surface.
  - **Silently normalize without mentioning the assumption**: Rejected because it could hide important naming differences and make debugging harder.

## Decision 6: Expand the assistant asset bundle only; do not add a shared template

- **Decision**: Add `product-spec-help.md` to the assistant command bundle for both targets and update registry/tests/docs, but do not add any new file under `assets/product/templates/`.
- **Rationale**: The feature explains workflow artifacts; it does not create a new managed project document of its own. Keeping it out of the shared-template bundle avoids unnecessary manifest surface area and keeps the implementation aligned with the current architecture.
- **Alternatives considered**:
  - **Add a reusable help template under `docs/product/templates/`**: Rejected because no project-local document is created by this feature.
  - **Generate a help document on installation**: Rejected because the request is for an interactive command, not another persistent artifact in user projects.
