# Quickstart: FRFAQ Narrative and Roadmap Commands

## Goal

Validate that the product-spec package installs the expanded FRFAQ workflow and that the asset set supports the canonical progression:

`domain -> press -> faq -> narrative -> roadmap -> speckit* -> align -> current-truth`

## 1. Install the asset bundle

From a test project:

```bash
product-spec add both
```

Expected results:

- Assistant command files exist for `domain`, `press`, `faq`, `narrative`, `roadmap`, and `align`
- Shared templates exist for the primary FRFAQ artifacts and their history companions
- `.product-spec/manifest.json` records the expanded managed asset set

## 2. Validate command installation

Confirm the following files exist:

```text
.claude/commands/product-spec-domain.md
.claude/commands/product-spec-press.md
.claude/commands/product-spec-faq.md
.claude/commands/product-spec-narrative.md
.claude/commands/product-spec-roadmap.md
.claude/commands/product-spec-align.md
.Codex/commands/product-spec-domain.md
.Codex/commands/product-spec-press.md
.Codex/commands/product-spec-faq.md
.Codex/commands/product-spec-narrative.md
.Codex/commands/product-spec-roadmap.md
.Codex/commands/product-spec-align.md
```

## 3. Validate shared template installation

Confirm the following files exist:

```text
.product/templates/domain-template.md
.product/templates/press-template.md
.product/templates/faq-template.md
.product/templates/narrative-template.md
.product/templates/roadmap-template.md
.product/templates/current-truth-template.md
.product/templates/history/domain-history-template.md
.product/templates/history/press-history-template.md
.product/templates/history/faq-history-template.md
.product/templates/history/narrative-history-template.md
.product/templates/history/roadmap-history-template.md
.product/templates/history/current-truth-history-template.md
```

## 4. Walk the intended workflow

Use the installed commands in this order:

1. `domain` to establish market, users, and terminology
2. `press` to state the customer-facing promise
3. `faq` to challenge the promise honestly
4. `narrative` to capture the durable internal story
5. `roadmap` to sequence bets and phases
6. `speckit.specify`, `speckit.clarify`, and `speckit.plan` for the next engineering-ready bet
7. `align` to reconcile product-facing documents with specs and update `current-truth.md`

Expected results:

- The user can follow the workflow without a missing step between FAQ and specification
- `roadmap` clearly remains future-facing
- `current-truth.md` clearly remains current-state and is updated by `align`

## 5. Validate safety and health behavior

Run:

```bash
product-spec check both
product-spec doctor both
```

Expected results:

- Health checks include the newly installed command and template assets
- Diagnostics mention the expanded FRFAQ workflow and the maintained `current-truth.md` artifact

## 6. Validate migration behavior

Start from a project that still contains older FRFAQ documents using the previous lighter template style, then run the updated commands.

Expected results:

- Existing useful content is preserved
- The updated document adopts the new shared decision-oriented structure
- Most history is moved or recorded in companion history artifacts rather than remaining embedded inline
