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

You are explaining how `product-spec` and `spec-kit` fit together. `/product-spec-help` does **not** create or update a managed product artifact of its own. Its job is to explain the workflow clearly, answer focused questions, and point the user to the right next step.

### Canonical Workflow Reference

Use this workflow as the primary source of truth, even if the current project has not created these files yet:

| Step | Usually Needs | Creates or Updates | Why It Matters |
|------|---------------|-------------------|----------------|
| `/product-spec-domain` | A project idea, market context, or customer problem | `docs/product/domain.md` | Defines the users, problem space, terminology, and competitive context that the rest of the product work builds on. |
| `/product-spec-press` | Usually `docs/product/domain.md` | `docs/product/press.md` | Turns the product idea into a customer-facing promise written as if it already shipped. |
| `/product-spec-faq` | Usually `docs/product/press.md` | `docs/product/faq.md` | Pressure-tests the promise with hard customer and stakeholder questions before engineering commits to it. |
| `/product-spec-narrative` | Usually `docs/product/domain.md`, `docs/product/press.md`, and `docs/product/faq.md` | `docs/product/narrative.md` | Synthesizes the context, promise, and objections into a durable internal product story. |
| `/product-spec-roadmap` | Usually `docs/product/narrative.md` | `docs/product/roadmap.md` | Turns the durable story into sequenced future bets without confusing future intent with current truth. |
| `/speckit.specify` | Usually a scoped roadmap bet or clearly defined next feature | `specs/<feature>/spec.md` | Converts the next bet into an engineering-ready feature specification. |
| `/speckit.clarify` | Usually `specs/<feature>/spec.md` | Updates `specs/<feature>/spec.md` | Resolves important scope, UX, or security uncertainties without inventing a new primary artifact. |
| `/speckit.plan` | `specs/<feature>/spec.md` | `specs/<feature>/plan.md` | Turns the approved feature specification into a technical implementation plan. |
| `/speckit.tasks` | `specs/<feature>/plan.md` | `specs/<feature>/tasks.md` | Breaks the plan into an ordered implementation checklist. |
| `/speckit.implement` | `specs/<feature>/tasks.md` | Updates source code and project files | Executes the task plan and turns the spec into working changes. |
| `/product-spec-align` | Updated specs, implementation changes, or newly shipped reality | `docs/product/current-truth.md` and related product docs | Reconciles product language with what is actually true in the product today. |

### Response Mode Selection

1. **If the user input is empty or whitespace only, use overview mode**:
   - Start with a one-sentence framing that `/product-spec-help` explains the workflow but is not itself a production step.
   - Show a compact workflow diagram such as:

     ```text
     /product-spec-domain -> /product-spec-press -> /product-spec-faq -> /product-spec-narrative -> /product-spec-roadmap
                                                                                         |
                                                                                         v
                                                                                  /speckit.specify -> /speckit.plan -> /speckit.tasks -> /speckit.implement
                                                                                         |
                                                                                         v
                                                                                  /product-spec-align -> docs/product/current-truth.md
     ```

   - After the diagram, include a scan-friendly table or bullets that keep the same four ideas visible for each step:
     - what usually comes before it
     - what it creates or updates
     - what the artifact is
     - why that artifact matters
   - Keep the answer compact enough that a first-time user can understand the flow in under a minute.

2. **If the user input is not empty, use question mode**:
   - Answer the question directly first in plain language.
   - Then add focused workflow context using a compact structure such as:
     - `Usually needs: ...`
     - `Creates/updates: ...`
     - `Why it matters: ...`
     - `Next: ...`
   - Only include the surrounding steps needed to make the answer clear. Do **not** dump the whole workflow unless it helps answer the question.
   - Treat prompts like `what is domain.md and why is it needed?` and `what comes after roadmap?` as representative examples of the level of detail the user wants.

### Answering Rules

1. Use canonical product artifact paths under `docs/product/`.
2. If the user mentions a legacy path such as `product/domain.md` or `.product/domain.md`, explain that the canonical location now lives under `docs/product/` and treat the older path as legacy migration context.
3. If the user asks about an ambiguous or unknown term, make the best reasonable mapping to the closest canonical concept and say what you are assuming.
4. If the user asks about `roadmap.md` versus `current-truth.md`, make the distinction explicit:
   - `roadmap.md` is future-facing and sequences bets
   - `current-truth.md` describes what is actually true in the product today
5. If the user asks about a refinement or execution step such as `/speckit.clarify` or `/speckit.implement`, be explicit that those steps usually update an existing artifact or the codebase rather than creating a new primary planning document.
6. Suggest the next logical workflow step when it naturally follows from the answer.
