# Data Model: Prime-Time CLI and Multi-Agent Readiness

**Branch**: `003-prime-time-cli` | **Date**: 2026-03-29

## Overview

This feature is a filesystem-oriented CLI, so the primary entities are integration targets, managed asset records, manifest state, and health reports rather than database-backed models.

## Entities

### Assistant Integration Target

Represents a supported assistant environment that pmkit can manage within a project.

**Fields**

| Field | Type | Description |
|------|------|-------------|
| `key` | enum | Canonical identifier: `claude` or `codex` |
| `displayName` | string | User-facing assistant name |
| `commandDir` | path | Project-relative directory where slash commands are installed |
| `supportedCommands` | string[] | Slash command filenames this assistant should receive |
| `status` | enum | `present`, `absent`, `unhealthy`, or `unknown` during runtime checks |

**Validation rules**

- `key` must be unique across adapters.
- `commandDir` must map to exactly one assistant-specific location.
- `supportedCommands` must reference entries from the asset registry.

### Asset Record

Represents a single installable pmkit-owned file.

**Fields**

| Field | Type | Description |
|------|------|-------------|
| `id` | string | Stable identifier such as `claude/pmkit-domain` |
| `category` | enum | `assistant-command` or `product-template` |
| `sourcePath` | path | Repository asset path used as the canonical file source |
| `targetPath` | path | Project-relative destination path |
| `target` | enum/string | `claude`, `codex`, or `shared` |
| `checksum` | string | Content hash used for validation/reporting |
| `managed` | boolean | Whether pmkit currently owns the deployed file |

**Validation rules**

- `sourcePath` must exist in the packaged asset bundle.
- `targetPath` must be unique within a project manifest.
- `category` and `target` must be consistent with the selected adapter.

### Managed Manifest

Project-local record of pmkit-managed state stored in `.pmkit/manifest.json`.

**Fields**

| Field | Type | Description |
|------|------|-------------|
| `manifestVersion` | string | Schema version for future migration safety |
| `pmkitVersion` | string | Installed CLI version that last wrote the manifest |
| `projectRoot` | path | Absolute or normalized root identifier used at runtime |
| `targets` | Managed Target State[] | Per-assistant lifecycle state |
| `sharedAssets` | Asset Record[] | Templates or shared files managed outside any one assistant |
| `updatedAt` | datetime | Last successful mutating operation timestamp |

**Validation rules**

- Manifest file must be valid JSON and satisfy schema validation before use.
- `targets` may include only supported assistant keys.
- Asset records must not point outside the project root.

### Managed Target State

Tracks pmkit ownership and health expectations for one assistant in one project.

**Fields**

| Field | Type | Description |
|------|------|-------------|
| `target` | enum | `claude` or `codex` |
| `installed` | boolean | Whether pmkit considers this assistant currently added |
| `assets` | Asset Record[] | Files managed for this assistant |
| `lastOperation` | enum | `add`, `remove`, `check`, or `doctor` |
| `lastHealthyAt` | datetime/null | Timestamp of last healthy check result |

**Validation rules**

- `installed=true` requires at least one managed asset unless the target is in a repair-needed state.
- `lastHealthyAt` can only be set from a healthy check outcome.

### Health Report

Runtime evaluation of project integration state returned by `check` or `doctor`.

**Fields**

| Field | Type | Description |
|------|------|-------------|
| `target` | enum | Assistant under evaluation or `all` |
| `status` | enum | `healthy`, `missing`, `unhealthy`, `partial` |
| `issues` | Health Issue[] | Problems detected during evaluation |
| `recommendedAction` | string | Next step shown to the user |
| `manifestAligned` | boolean | Whether on-disk files match manifest expectations |

### Health Issue

Represents one problem detected while validating integration state.

**Fields**

| Field | Type | Description |
|------|------|-------------|
| `code` | string | Stable issue identifier |
| `severity` | enum | `info`, `warning`, `error` |
| `message` | string | User-facing description |
| `path` | path/null | Related file or directory if applicable |

## Relationships

- One **Managed Manifest** has many **Managed Target State** records.
- One **Managed Target State** has many **Asset Record** entries.
- One **Assistant Integration Target** defines the expected shape for one **Managed Target State**.
- One **Health Report** evaluates one **Managed Target State** or an aggregate set of them.

## State Transitions

### Target lifecycle

| Current State | Operation | Next State |
|--------------|-----------|------------|
| `absent` | `add` | `present` |
| `present` | `add` | `present` (refresh/idempotent) |
| `present` | `remove` | `absent` |
| `unhealthy` | `add` | `present` or `unhealthy` depending on repair success |
| `present` | `check` with missing assets | `unhealthy` |
| `absent` | `check` | `missing` |

### Manifest lifecycle

| Event | Expected Result |
|-------|-----------------|
| First successful `add` | Create `.pmkit/manifest.json` |
| Additional `add` | Merge/update manifest records for the selected targets |
| `remove` with remaining managed assets | Persist manifest with reduced target coverage |
| `remove` of final managed assets | Delete manifest or leave an empty normalized manifest, based on implementation convenience, but never leave stale ownership records |

## Derived Rules

- `remove` must consult the manifest before deleting any file.
- `check` should classify missing manifest plus present files as `partial` or `unhealthy`, not automatically healthy.
- Shared templates should be installed once per project even when both assistants are added.
- The asset registry must be authoritative for both add and check operations.
