# CLI Contract: pmkit

**Branch**: `003-prime-time-cli` | **Date**: 2026-03-29

## Purpose

Define the user-facing command contract for the `pmkit` CLI so add/remove/check behavior is consistent across Claude Code and Codex integrations.

## Command Surface

```text
pmkit <command> [target] [options]
```

### Supported commands

| Command | Purpose |
|---------|---------|
| `pmkit add <target>` | Add pmkit-managed integration files for `claude`, `codex`, or `both` to the current project |
| `pmkit remove <target>` | Remove pmkit-managed integration files for `claude`, `codex`, or `both` from the current project |
| `pmkit check [target]` | Validate integration state for one assistant or all supported assistants |
| `pmkit doctor [target]` | Provide richer diagnostics and repair guidance for one assistant or all |
| `pmkit version` | Print installed CLI version and manifest version when available |
| `pmkit help` | Show top-level help and command usage |

## Targets

| Target | Meaning |
|--------|---------|
| `claude` | Operate on Claude Code integration paths |
| `codex` | Operate on Codex integration paths |
| `both` | Operate on both supported assistant targets |

## Global behavior

- All mutating commands operate on the current project directory.
- The CLI must exit non-zero for invalid arguments, invalid manifest state, or failed filesystem operations.
- Human-readable output is the default.
- Optional structured output may be added later, but is not required for this feature scope.

## `pmkit add`

### Input

```text
pmkit add <claude|codex|both>
```

### Reads

| Resource | Required | Purpose |
|----------|----------|---------|
| packaged asset registry | Yes | Determine source files to install |
| current project root | Yes | Resolve destination paths |
| `.pmkit/manifest.json` | No | Refresh or merge existing managed state |

### Writes

| Path | Action |
|------|--------|
| assistant command directories | Create if needed, then copy pmkit slash commands |
| `.product/templates/` | Create if needed, then copy shared templates |
| `.pmkit/manifest.json` | Create or update managed ownership state |

### Invariants

- Re-running `add` for an already managed target must be safe and idempotent.
- Shared templates must not be duplicated.
- Only packaged pmkit asset files may be written.

### Output

Human-readable summary listing:
- target(s) requested
- target(s) added, refreshed, or skipped
- template status
- next recommended command (`pmkit check`)

## `pmkit remove`

### Input

```text
pmkit remove <claude|codex|both>
```

### Reads

| Resource | Required | Purpose |
|----------|----------|---------|
| `.pmkit/manifest.json` | Yes | Determine which files pmkit owns |
| current project root | Yes | Resolve deletion targets |

### Writes

| Path | Action |
|------|--------|
| pmkit-managed assistant files | Delete only if recorded in manifest |
| `.product/templates/` managed files | Delete only when no remaining targets require them |
| `.pmkit/manifest.json` | Update or remove after ownership changes |

### Invariants

- `remove` must never delete files that are not recorded as pmkit-managed.
- Removing one target must not break the other target's managed assets.
- Removing a target that is already absent must succeed as a no-op with clear output.

### Output

Human-readable summary listing:
- target(s) requested
- files removed
- files skipped
- remaining managed targets

## `pmkit check`

### Input

```text
pmkit check [claude|codex|both]
```

### Reads

| Resource | Required | Purpose |
|----------|----------|---------|
| assistant target directories | Yes | Confirm expected paths and files |
| `.pmkit/manifest.json` | No | Compare expected vs actual managed state |
| packaged asset registry | Yes | Validate expected filenames and checksums if used |

### Writes

None

### Output

Per target, report:
- status: `healthy`, `missing`, `unhealthy`, or `partial`
- whether manifest state matches on-disk state
- main issue(s), if any
- recommended next step

## `pmkit doctor`

### Input

```text
pmkit doctor [claude|codex|both]
```

### Behavior

- Runs all `check` validations
- Adds more detailed explanations, including missing directories, orphaned files, manifest mismatches, or unsupported manual edits
- Does not mutate project state automatically in this feature scope

## Error conditions

| Scenario | Expected behavior |
|----------|-------------------|
| Unknown command | Print help and exit non-zero |
| Unknown target | Print valid target options and exit non-zero |
| Manifest invalid | Report corruption and recommend `doctor` or re-add flow |
| Asset copy failure | Abort operation, report affected path, exit non-zero |
| Permission denied | Report path and recommended fix, exit non-zero |

## File path expectations

| Target | Command directory |
|--------|-------------------|
| Claude Code | `.claude/commands/` |
| Codex | `.Codex/commands/` |

Shared templates are installed under `.product/templates/`.
