# Feature Specification: Prime-Time CLI and Multi-Agent Readiness

**Feature Branch**: `003-prime-time-cli`  
**Created**: 2026-03-29  
**Status**: Draft  
**Input**: User description: "Prime-time release for pm-kit: add dual support for both Codex and Claude Code; simplify packaging and installation; add CLI operations to enable Codex, Claude Code, or both, uninstall either integration, and run health checks for installation and connectivity; rename the CLI to pmkit and standardize in-app commands to /pmkit-*; suggest other improvements for production readiness."

## Clarifications

### Session 2026-03-29

- Q: Should pm-kit include migration support from older `pm-*` naming and prior installation flows in this release? → A: No; migration support is out of scope because the product has not been released yet.
- Q: Which packaging model should pm-kit support for v1? → A: Support both global and local installs, with global install as the default recommended path in the README.
- Q: Which implementation stack should power the pmkit CLI? → A: TypeScript CLI published to npm, running on Node.
- Q: Should pmkit use one binary with subcommands or multiple executables? → A: Use one unified `pmkit` binary with subcommands.
- Q: Which lifecycle verbs should the CLI use for assistant integrations? → A: Use `add` / `remove`, because the operations create and delete managed project files rather than toggling an in-place runtime state.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Install and Enable Across Agents (Priority: P1)

A developer wants to adopt pm-kit without manual file copying or agent-specific setup steps. They install `pmkit`, run a single command to add support for Codex, Claude Code, or both, and can immediately access the pm-kit slash commands in the selected assistant.

**Why this priority**: Installation and activation friction is the main barrier to adoption. If setup is not fast and predictable, the broader improvements in naming, diagnostics, and operations will not matter.

**Independent Test**: Starting from a machine without pm-kit configured in either agent, install `pmkit`, run the add command for one target agent and then both targets, and verify the expected `/pmkit-*` commands are available in the selected assistants without manual file copying.

**Acceptance Scenarios**:

1. **Given** a developer has not yet installed pm-kit integrations, **When** they install `pmkit` and add Codex support, **Then** the pm-kit command set is installed into Codex using the `/pmkit-*` naming convention
2. **Given** a developer has not yet installed pm-kit integrations, **When** they install `pmkit` and add Claude Code support, **Then** the pm-kit command set is installed into Claude Code using the `/pmkit-*` naming convention
3. **Given** a developer wants both assistants configured, **When** they run the add-both workflow, **Then** both Codex and Claude Code receive the required pm-kit command files and templates in one guided flow
4. **Given** an assistant already has a pm-kit-managed installation, **When** the developer adds that assistant again, **Then** pm-kit refreshes its managed files without requiring the developer to remove files manually

---

### User Story 2 - Manage Agent Integrations from the CLI (Priority: P1)

A developer wants a clear operational interface for pm-kit. They can add or remove Codex support, Claude Code support, or both from the `pmkit` CLI and understand exactly what changed.

**Why this priority**: Prime-time readiness requires predictable lifecycle management, not just first-time installation. Teams need a supported way to switch integrations on and off without editing hidden directories themselves.

**Independent Test**: With `pmkit` installed, run CLI commands to add one agent, remove that same agent, then add both. Confirm each operation changes only the selected integration and reports a clear outcome.

**Acceptance Scenarios**:

1. **Given** only Codex support is present, **When** the developer runs the remove command for Codex, **Then** pm-kit removes only the Codex-managed installation and leaves Claude Code untouched
2. **Given** only Claude Code support is present, **When** the developer runs the remove command for Claude Code, **Then** pm-kit removes only the Claude Code-managed installation and leaves other pm-kit-managed assets intact
3. **Given** neither assistant is present, **When** the developer runs the add-both command, **Then** pm-kit installs the required files for both assistants and reports success for each target separately
4. **Given** the developer runs any add or remove command, **When** the operation completes, **Then** pm-kit prints a concise summary of which assistants were changed, skipped, or already in the requested state

---

### User Story 3 - Verify Installation and Connectivity (Priority: P2)

A developer wants confidence that pm-kit is not only installed, but working. They run a check command to see which assistants are configured, whether pm-kit can reach each local assistant integration, and whether the managed command set appears healthy.

**Why this priority**: Once pm-kit supports more than one assistant, troubleshooting becomes harder. A first-class health check reduces support burden and helps users self-serve.

**Independent Test**: With one assistant configured correctly and another missing or broken, run the check command and confirm the status output distinguishes installed, missing, and unhealthy states with actionable guidance.

**Acceptance Scenarios**:

1. **Given** Codex support is installed and functioning, **When** the developer runs the check command, **Then** Codex is reported as installed and healthy
2. **Given** Claude Code support is not installed, **When** the developer runs the check command, **Then** Claude Code is reported as not installed rather than failing silently
3. **Given** an assistant has partially missing or inaccessible pm-kit files, **When** the developer runs the check command, **Then** pm-kit reports that integration as unhealthy and explains the next recommended action
4. **Given** the developer runs the check command after adding or removing integrations, **When** the status report is displayed, **Then** it reflects the new state without requiring any manual refresh or hidden troubleshooting steps

---

### Edge Cases

- What happens if Codex is installed but Claude Code is not, and the user requests add-both? pm-kit should complete the Codex no-op or update path, install Claude Code support, and report outcomes separately per target.
- What happens if an assistant integration directory exists but contains user-managed files with overlapping names? pm-kit should avoid silently deleting unknown files and should limit uninstall actions to files it manages.
- What happens if the user runs `pmkit check` on a machine where the assistant application exists but pm-kit cannot verify the integration is usable? pm-kit should report the integration as unhealthy with the reason and recommended next step.
- What happens if the user requests remove for an assistant that is already absent? pm-kit should report that no change was needed and exit successfully.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The product MUST expose a single CLI name, `pmkit`, for installation, setup, maintenance, and troubleshooting workflows
- **FR-002**: The product MUST support installing and managing pm-kit integrations for both Codex and Claude Code
- **FR-003**: The product MUST provide a streamlined installation path that allows a new user to get from zero setup to a usable `pmkit` command with minimal manual steps
- **FR-003a**: The product MUST support both a global installation model and a project-local installation model for `pmkit`
- **FR-003b**: The product documentation and README MUST present the global installation model as the default recommended setup path
- **FR-004**: The product MUST allow a user to add pm-kit for Codex only, Claude Code only, or both assistants in one command-driven workflow
- **FR-005**: When an assistant is enabled, the installed slash commands for that assistant MUST use the `/pmkit-*` naming convention
- **FR-006**: The product MUST provide CLI operations to remove Codex support, remove Claude Code support, or remove both integrations
- **FR-007**: Remove operations MUST delete only pm-kit-managed integration assets for the selected assistant and MUST NOT silently delete unrelated user files
- **FR-008**: The product MUST provide a check operation that reports, for each supported assistant, whether pm-kit is installed, missing, or unhealthy
- **FR-009**: The check operation MUST distinguish between installation presence and integration health so users can tell the difference between "not installed" and "installed but broken"
- **FR-010**: When reporting an unhealthy integration, the product MUST provide a recommended next action that helps the user restore a working state
- **FR-011**: Add and remove operations MUST produce a clear summary of what changed, what was skipped, and any follow-up action required
- **FR-012**: The CLI MUST provide built-in help that lists the available operations for adding, removing, and checking integrations
- **FR-013**: The product MUST support repeatable operation, so that re-running add, remove, or check commands does not produce ambiguous or misleading results
- **FR-018**: The CLI MUST use `add` and `remove` as the canonical lifecycle verbs for project integration management to distinguish them from npm installation of the CLI itself
- **FR-014**: The product MUST give users a way to confirm the installed pm-kit version and whether their managed integrations are aligned with that version
- **FR-015**: The product MUST document a recommended packaging and distribution approach that keeps installation simple for developers and easy to maintain across future releases
- **FR-016**: The `pmkit` CLI MUST be implemented as a TypeScript application distributed through npm and executed with Node
- **FR-017**: The product MUST expose its operational workflows through a single `pmkit` binary with subcommands rather than separate executables

### Key Entities *(include if feature involves data)*

- **Assistant Integration Target**: A supported assistant environment, currently Codex or Claude Code, that can be enabled, checked, upgraded, or uninstalled independently.
- **Managed Installation State**: The recorded state of which assistant integrations pm-kit owns in a project, including whether each target is present, healthy, outdated, or absent.
- **Command Set**: The family of user-facing slash commands installed into each supported assistant using the standardized `/pmkit-*` prefix.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user can install `pmkit` and add at least one assistant integration in under 3 minutes without manually copying files
- **SC-001a**: Users can successfully complete setup using either the global or project-local installation path, with the default documented path remaining the fastest to complete
- **SC-002**: At least 90% of users who follow the documented setup flow can successfully enable Codex, Claude Code, or both on their first attempt
- **SC-003**: The check operation correctly classifies each supported assistant as installed and healthy, not installed, or installed but unhealthy in all documented troubleshooting scenarios
- **SC-004**: Add and remove operations complete with a clear per-assistant outcome summary in 100% of supported success and no-op paths
- **SC-005**: Support requests related to installation confusion or agent-setup ambiguity decrease measurably after the new CLI and health-check workflow are introduced
- **SC-006**: The chosen implementation stack supports cross-platform installation, file management, and future assistant expansion without requiring users to adopt separate platform-specific scripts
- **SC-007**: Users can discover all supported lifecycle and diagnostic workflows from a single CLI help surface without needing to know multiple executable names

## Assumptions

- The existing pm-kit command set remains the core product value; this feature focuses on packaging, cross-assistant compatibility, lifecycle operations, and production readiness rather than introducing a new document workflow
- Codex and Claude Code remain the only required assistant targets for this release
- A minimal-step install experience is more important than preserving the current manual copy workflow as the primary path
- Both global and project-local installation paths are supported in this release, but the primary onboarding flow should steer users toward the simpler global setup
- Node is an acceptable runtime dependency for the intended pm-kit audience, and npm-based distribution is consistent with the preferred onboarding experience
- A single binary with subcommands is preferable to multiple executables because pm-kit operations share common asset, state, and agent-detection logic
- Migration support from earlier pm-kit naming or setup approaches is out of scope for this release because the product has not yet shipped
- Users benefit from CLI guidance that is explicit about which assistant integrations are present and healthy instead of relying on hidden filesystem conventions
- Production-readiness improvements beyond the core request should prioritize clear help/version output, safe uninstall behavior, and actionable diagnostics before adding broader new feature areas
- Assistant integration commands operate on project files, so lifecycle language should reflect adding and removing managed assets rather than toggling a runtime feature flag
