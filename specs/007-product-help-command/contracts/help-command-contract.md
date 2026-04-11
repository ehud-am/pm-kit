# Contract: Product-Spec Help Command

## Purpose

Define the externally visible contract for the new `/product-spec-help` assistant command. This project does not expose a network API for this feature; its public interface is the installed command bundle, the help behavior encoded in the packaged asset, and the CLI asset-management flows that install and validate it.

## Assistant Command Installation Contract

For each assistant target, `product-spec add <target>` must install these help command files into the target's command directory:

| Workflow Role | Claude Target Path | Codex Target Path |
|------|------|------|
| Help | `.claude/commands/product-spec-help.md` | `.Codex/commands/product-spec-help.md` |

### Installation Expectations

- The help command must be included in the same managed assistant-command bundle as the other `product-spec-*` commands.
- `product-spec remove <target>` must remove the managed help command for that target while preserving unrelated user-created command files.
- `product-spec check [target]` and `product-spec doctor [target]` must treat a missing managed help command as an unhealthy or incomplete integration state, consistent with other managed assistant assets.

## Help Behavior Contract

### Overview Mode

When invoked with no content, `/product-spec-help` must:

- Present the canonical product-spec workflow in order
- Include the product-spec artifacts `domain.md`, `press.md`, `faq.md`, `narrative.md`, `roadmap.md`, and `current-truth.md`
- Include the spec-kit handoff artifacts `spec.md`, `plan.md`, and `tasks.md`
- Show, for each major step, the artifact usually needed before the step, the artifact created or updated by the step, and a one-line explanation of what that artifact is and why it matters
- Use a diagram or similarly scan-friendly structure rather than a dense prose block

### Question Mode

When invoked with non-empty content, `/product-spec-help <question>` must:

- Answer the asked topic directly first
- Explain what the asked artifact or step is and why it matters
- Explain what usually comes before it, what it creates or influences, and what the next logical step is
- Stay focused on the user’s topic instead of repeating the full workflow unless that context is needed
- Handle representative prompts such as `what is domain.md and why is it needed?` and `what comes after roadmap?`

## Workflow Naming Contract

- Canonical product artifact paths must use `docs/product/`
- `roadmap.md` must be described as future-facing planning, not current truth
- `current-truth.md` must be described as the maintained statement of what is actually true in the product today
- Legacy `product/` and `.product/` paths may appear only when clarifying migration or historical naming
- If the user asks about an ambiguous or legacy term, the response must map it back to the closest canonical concept and make that assumption explicit when needed

## Asset Bundle Scope Contract

- This feature adds assistant command assets only
- No new file is installed under `docs/product/templates/`
- Existing product templates remain unchanged unless separately modified by another feature

## Documentation Contract

- Repository documentation that lists installed assistant commands must include `/product-spec-help`
- User-facing workflow explanations must stay aligned with the help command's canonical ordering and terminology
- The documentation must not imply that `/product-spec-help` is itself a workflow production step that creates a managed product artifact
