# Research: Prime-Time CLI and Multi-Agent Readiness

**Branch**: `003-prime-time-cli` | **Date**: 2026-03-29

## Decision 1: Build pmkit as a TypeScript CLI published to npm

**Decision**: Implement `pmkit` as a TypeScript CLI running on Node and distributed through npm.

**Rationale**: The feature now includes cross-platform filesystem work, project-local state tracking, dual assistant support, safe remove behavior, and richer diagnostics. TypeScript provides enough structure for adapter contracts, manifest validation, and testing without adding excessive complexity. npm distribution also matches the desired onboarding flow for global install, while still supporting local/project usage through npm scripts or `npx`.

**Alternatives considered**:
- **Shell-only CLI**: Simple for the initial installer, but brittle for multi-agent logic, Windows compatibility, manifest validation, and maintainable test coverage.
- **Python package**: Viable technically, but adds packaging overhead for an audience already primed for npm-based tooling.

## Decision 2: Use one unified binary with subcommands

**Decision**: Expose one `pmkit` executable with subcommands such as `add`, `remove`, `check`, `doctor`, `version`, and `help`.

**Rationale**: A single executable reduces user confusion and allows shared orchestration for path discovery, asset resolution, manifest updates, and output formatting. It also aligns with the clarified requirement that npm handles CLI installation while subcommands manage per-project integration state.

**Alternatives considered**:
- **Separate helper binaries**: Adds discoverability and maintenance overhead with little functional gain.
- **Hidden helper subprocesses**: Useful only if the codebase later outgrows a single-process CLI, which is unnecessary for this scope.

## Decision 3: Use adapter-based assistant integration

**Decision**: Represent Claude Code and Codex as adapter implementations behind a shared integration contract.

**Rationale**: The two assistants share the same lifecycle verbs but differ in target directories, asset sets, and validation rules. A shared contract keeps behavior consistent while isolating assistant-specific path logic and future growth.

**Alternatives considered**:
- **Hard-code separate flows directly in each CLI command**: Faster initially, but duplicates logic across add/remove/check and makes future assistant expansion riskier.
- **Plugin loading system**: Over-designed for two first-party adapters.

## Decision 4: Store managed state in a project-local `.pmkit/manifest.json`

**Decision**: Persist pmkit-owned integration state in `.pmkit/manifest.json` at the repository root.

**Rationale**: The CLI needs a durable ownership record so `remove` can delete only files created by pmkit. A root-level hidden folder keeps this operational metadata separate from `.product/` content and from assistant-specific folders. The manifest also gives `check` a canonical view of expected assets, installed version, and target coverage.

**Alternatives considered**:
- **No manifest; infer ownership from filenames alone**: Unsafe if users edit or partially replace files manually.
- **Store state under `.product/`**: Mixes operational CLI metadata with product documentation.
- **Store state under each assistant directory**: Makes cross-target reporting and add/remove-both flows harder to coordinate.

## Decision 5: Keep assets static and versioned in the repository

**Decision**: Maintain slash commands and templates as versioned files under an `assets/` directory and copy them into project destinations during `add`.

**Rationale**: pm-kit’s value is still rooted in Markdown command and template assets. Treating them as source-controlled assets preserves reviewability and keeps the CLI focused on orchestration rather than content generation. It also allows add/remove/check flows to reason from a single canonical registry.

**Alternatives considered**:
- **Generate command files programmatically**: Harder to review and more error-prone for mostly static content.
- **Download assets remotely at runtime**: Adds network dependency and makes deterministic local behavior harder to guarantee.

## Decision 6: Define `check` as a local health validation command and reserve `doctor` for deeper diagnostics

**Decision**: `pmkit check` will validate local integration health by confirming expected directories, files, and manifest alignment. `pmkit doctor` will be a richer diagnostic mode that explains mismatches and recommends repair actions.

**Rationale**: The spec requires a check operation now, but "working connection" should remain grounded in what the tool can verify reliably without launching external apps or depending on network calls. Separating quick status from deeper troubleshooting keeps the main flow fast and predictable.

**Alternatives considered**:
- **Make `check` perform aggressive repair or interactive prompts**: Blurs read vs. write behavior and can surprise users.
- **Attempt to launch assistant apps or remote health probes**: Fragile, platform-specific, and unnecessary for this release.

## Decision 7: Support both global and local installation, but optimize onboarding around global install

**Decision**: Support both npm global install and project-local install, while documenting global install as the default path.

**Rationale**: This matches the clarified product direction. Global install offers the simplest getting-started flow; local install remains available for teams that prefer pinned dependencies or repo-managed tooling.

**Alternatives considered**:
- **Global only**: Simple but restrictive for teams that avoid global developer dependencies.
- **Local only**: Conflicts with the easiest onboarding path and adds friction for single-user adoption.
