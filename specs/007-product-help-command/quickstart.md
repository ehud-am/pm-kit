# Quickstart: Product-Spec Help Command

## Goal

Validate that product-spec installs a `/product-spec-help` command for supported assistant targets and that the command explains the canonical workflow in both overview and focused-question modes.

## 1. Install the managed assets

From an empty test project:

```bash
product-spec add both
```

Expected results:

- Assistant command files are installed for both Claude Code and Codex
- The existing shared templates under `docs/product/templates/` still install normally
- `.product-spec/manifest.json` records the new help command asset alongside the rest of the assistant-command bundle

## 2. Verify the installed help command files

Confirm the following files exist after install:

```text
.claude/commands/product-spec-help.md
.Codex/commands/product-spec-help.md
```

Also verify the command content:

- Refers to canonical product artifacts under `docs/product/`
- Explains the workflow from domain through current truth
- Includes the engineering-spec handoff artifacts `spec.md`, `plan.md`, and `tasks.md`
- Distinguishes overview mode from question mode
- States that `/product-spec-help` explains the workflow but is not itself a workflow production step

## 3. Validate overview mode manually

Inside Claude Code or Codex in the test project, run:

```text
/product-spec-help
```

Expected results:

- The response gives a compact workflow map in canonical order
- Each major step shows the usual input artifact, the created or updated artifact, and a short explanation of why the artifact matters
- The response is scan-friendly rather than a long undifferentiated prose block

## 4. Validate question mode manually

Inside Claude Code or Codex, run:

```text
/product-spec-help what is domain.md and why is it needed?
```

Expected results:

- The response answers `domain.md` directly first
- The response explains what usually comes before it, what it informs next, and why it matters in the workflow
- The response stays focused on `domain.md` instead of repeating the entire workflow verbatim

Repeat with a relationship-focused question such as:

```text
/product-spec-help what comes after roadmap?
```

Expected results:

- The response explains the handoff into `speckit.specify`
- The response mentions the relevant engineering-spec artifacts and the later alignment step

## 5. Validate health reporting

Delete one installed help command file in the test project and run:

```bash
product-spec check both
product-spec doctor both
```

Expected results:

- Health output reports the missing help asset as a managed-file problem
- Doctor guidance remains consistent with the rest of the installed assistant bundle

## 6. Validate documentation consistency

Review the README and installed assistant command lists.

Expected results:

- `/product-spec-help` appears anywhere the installed assistant command set is enumerated
- Workflow descriptions remain aligned with the canonical ordering and `docs/product/` terminology
- Documentation makes clear that the help command explains the workflow but does not create a product artifact of its own
