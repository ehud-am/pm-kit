# Contract: FRFAQ Asset Bundle

## Purpose

Define the externally visible asset-installation contract for the FRFAQ workflow expansion. This project does not expose a network API for this feature; its public interface is the installed command and template bundle produced by the CLI.

## Assistant Command Contract

For each assistant target, `product-spec add <target>` must install these command files into the target's command directory:

| Workflow Role | Claude Target Path | Codex Target Path |
|------|------|------|
| Domain | `.claude/commands/product-spec-domain.md` | `.Codex/commands/product-spec-domain.md` |
| Press | `.claude/commands/product-spec-press.md` | `.Codex/commands/product-spec-press.md` |
| FAQ | `.claude/commands/product-spec-faq.md` | `.Codex/commands/product-spec-faq.md` |
| Narrative | `.claude/commands/product-spec-narrative.md` | `.Codex/commands/product-spec-narrative.md` |
| Roadmap | `.claude/commands/product-spec-roadmap.md` | `.Codex/commands/product-spec-roadmap.md` |
| Align | `.claude/commands/product-spec-align.md` | `.Codex/commands/product-spec-align.md` |

### Command Behavior Expectations

- `product-spec-domain` creates or updates `.product/domain.md`
- `product-spec-press` creates or updates `.product/press.md`
- `product-spec-faq` creates or updates `.product/faq.md`
- `product-spec-narrative` creates or updates `.product/narrative.md`
- `product-spec-roadmap` creates or updates `.product/roadmap.md`
- `product-spec-align` reconciles product-facing artifacts with engineering specs and updates `.product/current-truth.md`
- `product-spec-align` must preserve the distinction between forward-looking roadmap intent and current product truth

## Shared Template Contract

`product-spec add` must install these shared templates under `.product/templates/`:

| Template Role | Target Path |
|------|------|
| Domain primary template | `.product/templates/domain-template.md` |
| Press primary template | `.product/templates/press-template.md` |
| FAQ primary template | `.product/templates/faq-template.md` |
| Narrative primary template | `.product/templates/narrative-template.md` |
| Roadmap primary template | `.product/templates/roadmap-template.md` |
| Current truth primary template | `.product/templates/current-truth-template.md` |
| Domain history template | `.product/templates/history/domain-history-template.md` |
| Press history template | `.product/templates/history/press-history-template.md` |
| FAQ history template | `.product/templates/history/faq-history-template.md` |
| Narrative history template | `.product/templates/history/narrative-history-template.md` |
| Roadmap history template | `.product/templates/history/roadmap-history-template.md` |
| Current truth history template | `.product/templates/history/current-truth-history-template.md` |

## CLI Operation Contract

### `product-spec add`

- Installs the full assistant command set for the selected target(s)
- Installs the full shared template set
- Records all managed assets in `.product-spec/manifest.json`
- Overwrites managed assets deterministically from packaged sources

### `product-spec remove`

- Removes only managed assets for the selected target(s)
- Must not remove unrelated user-created command files
- Must remove or update shared template tracking only according to manifest-managed ownership rules

### `product-spec check`

- Reports degraded health when any managed command or template asset is missing or drifted
- Must reflect the expanded FRFAQ bundle, including newly added commands and templates

### `product-spec doctor`

- Provides recovery guidance that reflects the canonical workflow and the renamed `current-truth.md` artifact

## Backward Compatibility Contract

- Existing managed projects remain supported
- When a command updates an older FRFAQ document, it must migrate the document toward the redesigned structure while preserving still-valid content
- The historical `requirements` concept must no longer be presented as the maintained current-state artifact once `current-truth.md` is installed
- The install/remove/check/doctor flows must continue to work for both `claude` and `codex`
