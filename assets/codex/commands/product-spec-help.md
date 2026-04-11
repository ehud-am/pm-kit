---
description: Explain the product-spec workflow and answer questions about steps, artifacts, and handoffs.
handoffs:
  - label: Start with Domain
    agent: product-spec-domain
    prompt: Help me capture the domain context for this project
  - label: Write the Next Spec
    agent: speckit.specify
    prompt: Create a technical spec for the next roadmap bet. I want to build...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are explaining how `product-spec` and `spec-kit` fit together. `/product-spec-help` never creates a managed product artifact. It explains the workflow, answers focused questions, and helps the user find the right next step.

### Canonical Workflow Reference

Use this workflow as the default source of truth:

| Step | Usually Needs | Creates or Updates | Why It Matters |
|------|---------------|-------------------|----------------|
| `/product-spec-domain` | A project idea, market context, or customer problem | `docs/product/domain.md` | Defines the users, problem space, terminology, and competitive context. |
| `/product-spec-press` | Usually `docs/product/domain.md` | `docs/product/press.md` | Turns the idea into a customer-facing promise. |
| `/product-spec-faq` | Usually `docs/product/press.md` | `docs/product/faq.md` | Challenges the promise before engineering commits to it. |
| `/product-spec-narrative` | Usually `docs/product/domain.md`, `docs/product/press.md`, and `docs/product/faq.md` | `docs/product/narrative.md` | Creates the durable internal product story. |
| `/product-spec-roadmap` | Usually `docs/product/narrative.md` | `docs/product/roadmap.md` | Sequences future bets without replacing current truth. |
| `/speckit.specify` | Usually a scoped roadmap bet or clearly defined next feature | `specs/<feature>/spec.md` | Creates the engineering-ready feature specification. |
| `/speckit.clarify` | Usually `specs/<feature>/spec.md` | Updates `specs/<feature>/spec.md` | Resolves important open questions without inventing a new primary artifact. |
| `/speckit.plan` | `specs/<feature>/spec.md` | `specs/<feature>/plan.md` | Turns the spec into a technical implementation plan. |
| `/speckit.tasks` | `specs/<feature>/plan.md` | `specs/<feature>/tasks.md` | Breaks the plan into an execution checklist. |
| `/speckit.implement` | `specs/<feature>/tasks.md` | Updates source code and project files | Executes the plan and produces working changes. |
| `/product-spec-align` | Updated specs, implementation changes, or newly shipped reality | `docs/product/current-truth.md` and related product docs | Reconciles product language with what is actually true today. |

### Response Modes

1. **Overview mode**: if the user input is empty or whitespace only.
   - Start with a one-sentence framing that `/product-spec-help` explains the workflow but is not itself a production step.
   - Show a compact workflow diagram.
   - Follow with a scan-friendly table or bullets covering:
     - what usually comes before each step
     - what it creates or updates
     - what the artifact is
     - why it matters
   - Keep the answer compact enough to scan quickly.

2. **Question mode**: if the user input is not empty.
   - Answer the question directly first.
   - Then add focused context:
     - `Usually needs: ...`
     - `Creates/updates: ...`
     - `Why it matters: ...`
     - `Next: ...`
   - Only include the surrounding workflow needed to make the answer clear.
   - Treat prompts like `what is domain.md and why is it needed?` and `what comes after roadmap?` as representative examples of the depth the user wants.

### Answering Rules

1. Use canonical product artifact paths under `docs/product/`.
2. If the user mentions `product/` or `.product/`, explain that those are legacy paths and normalize to `docs/product/`.
3. If the user asks about an unknown or ambiguous term, make the best reasonable mapping to the closest canonical concept and say what you are assuming.
4. If the user asks about `roadmap.md` and `current-truth.md`, be explicit that roadmap is future-facing and current truth describes what is true today.
5. If the user asks about `/speckit.clarify` or `/speckit.implement`, explain that those usually update an existing artifact or the codebase rather than creating a new primary planning document.
6. Suggest the next logical step when it naturally follows from the answer.
