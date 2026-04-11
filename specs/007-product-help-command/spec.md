# Feature Specification: Product-Spec Help Command

**Feature Branch**: `007-product-help-command`  
**Created**: 2026-04-11  
**Status**: Draft  
**Input**: User description: "Our next capability is a product-spec-help command. As the name suggests, this command should explain the product-spec workflow: the steps, the artifact typically needed before each step, the artifact created by each step, and for each artifact a one-line explanation of what it is and why it matters. The command must balance simplicity with completeness. It has two modes: with no content it should share an overview; with a question it should provide a deeper explanation of that aspect, for example: 'what is domain.md and why is it needed?' Assume the examples that say 'product-spec-kit' refer to the new product-spec-help command being invoked with and without a question."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Get a quick workflow overview (Priority: P1)

A product manager, engineer, or new teammate wants to understand the product-spec workflow without reading the README or multiple command files. They run `/product-spec-help` with no additional text and receive a compact workflow map that shows the major steps in order, the artifact usually needed before each step, the artifact created or updated at that step, and a one-line explanation of what each artifact is and why it matters.

**Why this priority**: This is the default entry point for the command. If the overview is not immediately useful, the help command does not solve the core discoverability problem.

**Independent Test**: Run `/product-spec-help` with no content and verify that the response presents the canonical workflow in order, uses a scan-friendly diagram or equivalent structured map, and includes prerequisite and output artifact guidance for each step.

**Acceptance Scenarios**:

1. **Given** a user runs `/product-spec-help` with no content, **When** the command responds, **Then** it presents the canonical workflow from domain context through current truth in order.
2. **Given** the overview includes a workflow step, **When** the user scans that step, **Then** they can see the artifact usually needed before it, the artifact it creates or updates, and a one-line explanation of why that artifact matters.
3. **Given** a workflow step has no strict prerequisite or usually updates an existing artifact instead of creating a new one, **When** it appears in the overview, **Then** the response makes that nuance clear instead of implying a false hard dependency.

---

### User Story 2 - Ask about one step or artifact in detail (Priority: P1)

A user understands there is a workflow but is confused about one part of it. They ask `/product-spec-help what is domain.md and why is it needed?` or another natural-language question about a step, artifact, file, or handoff. The command gives a direct answer first, then explains how that item fits into the workflow: what it is, why it matters, what usually comes before it, what it creates or informs, and what the next logical step is.

**Why this priority**: The overview only works if users can immediately drill into the part they do not understand. This is how the command balances simplicity with completeness instead of forcing everyone to read the same amount of detail.

**Independent Test**: Ask a focused question about a known artifact or step and verify that the response stays centered on that topic while still explaining prerequisite, purpose, downstream effect, and next-step guidance.

**Acceptance Scenarios**:

1. **Given** a user asks about a named artifact such as `domain.md`, **When** the command responds, **Then** it explains what the artifact is, why it is needed, which step usually creates or updates it, and which later steps depend on it.
2. **Given** a user asks about a workflow relationship such as what comes after roadmap or before align, **When** the command responds, **Then** it explains the surrounding steps and the artifact handoff between them.
3. **Given** a user asks a narrow question, **When** the command responds, **Then** it answers that question directly without dumping the entire workflow unless extra context is genuinely needed.

---

### User Story 3 - Get a trustworthy workflow map that uses current terminology (Priority: P2)

A team member wants help they can rely on when working in a real project. The command should describe the current canonical workflow and file names, explain the handoff from product-spec artifacts into spec-kit artifacts, keep roadmap and current truth distinct, and avoid reinforcing old or misleading terminology.

**Why this priority**: Help that is easy to read but inaccurate creates more confusion than no help at all. Users need the command to reinforce the current workflow, not a historical or partial one.

**Independent Test**: Ask about canonical artifacts, legacy names, and the roadmap-to-spec handoff, and verify that the responses use the current `docs/product/` conventions, identify spec-kit artifacts accurately, and keep future planning separate from current truth.

**Acceptance Scenarios**:

1. **Given** a user asks about a primary product artifact, **When** the command responds, **Then** it uses the canonical `docs/product/` path and current artifact names.
2. **Given** a user asks about the transition from product work into engineering spec work, **When** the command responds, **Then** it explains the handoff from `roadmap.md` into the spec-kit artifact chain such as `spec.md`, `plan.md`, and `tasks.md`.
3. **Given** a user asks about `current-truth.md` or `roadmap.md`, **When** the command responds, **Then** it makes clear that roadmap is future-facing while current truth describes what is actually true in the product today.

### Edge Cases

- What happens when the user asks about an unknown, misspelled, or non-canonical artifact name? The command makes a best-effort match to the closest workflow concept, states the assumption it made, and points back to the canonical name if possible.
- What happens when the user asks about a stage that refines or executes work rather than creating a new document, such as clarification or implementation? The command explains that the stage updates an existing artifact or produces product changes rather than inventing a misleading new file.
- What happens when the user asks for help in a project that has not created any workflow artifacts yet? The command still provides the standard workflow guidance instead of requiring local files to exist first.
- What happens when the user asks about a legacy path such as `.product/domain.md` or `product/domain.md`? The command explains the current canonical location under `docs/product/` and treats the old path as legacy migration context.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a `/product-spec-help` assistant command for supported product-spec integration targets.
- **FR-002**: The command MUST treat empty or whitespace-only input as overview mode.
- **FR-003**: In overview mode, the command MUST present the canonical end-to-end workflow in order from product context through current truth, including the engineering-spec handoff between roadmap work and alignment work.
- **FR-004**: In overview mode, each included workflow step MUST show the artifact usually needed before the step, the artifact the step creates or updates, and a one-line explanation of what that artifact is and why it matters.
- **FR-005**: The overview response MUST use a diagram or equally scan-friendly structured format that lets a user understand the workflow quickly.
- **FR-006**: The command MUST accept natural-language questions about workflow steps, artifact files, command names, and relationships between stages.
- **FR-007**: In question mode, the response MUST answer the asked topic directly before expanding into supporting workflow context.
- **FR-008**: In question mode, the response MUST explain why the asked step or artifact matters, what usually comes before it, what it creates or influences, and what the next logical step is.
- **FR-009**: The help content MUST cover the primary product-spec artifacts `domain.md`, `press.md`, `faq.md`, `narrative.md`, `roadmap.md`, and `current-truth.md`.
- **FR-010**: The help content MUST explain the core engineering-spec handoff artifacts `spec.md`, `plan.md`, and `tasks.md` as part of the overall workflow.
- **FR-011**: When a referenced stage usually updates an existing artifact instead of creating a new one, the command MUST describe that distinction accurately.
- **FR-012**: The command MUST use canonical current file paths under `docs/product/` when referring to product artifacts.
- **FR-013**: The command MUST mention legacy `product/` and `.product/` paths only when relevant to clarify migration or historical naming.
- **FR-014**: The command MUST keep `roadmap.md` and `current-truth.md` clearly separated in purpose.
- **FR-015**: If a user asks about an ambiguous or unknown term, the command MUST make a best-effort mapping to the closest canonical workflow concept and state the assumption when doing so.
- **FR-016**: The command MUST remain useful even when no local product-spec artifacts have been created yet.
- **FR-017**: The command MUST suggest the next logical workflow step when the answer naturally implies one.

### Key Entities *(include if feature involves data)*

- **Workflow Step**: A named stage in the product-spec or spec-kit journey that has a typical purpose, prerequisite context, and downstream effect.
- **Workflow Artifact**: A document or output, such as `domain.md`, `roadmap.md`, or `spec.md`, that captures the result of a workflow step and informs later work.
- **Help Request**: The user input sent to `/product-spec-help`, either empty for overview mode or phrased as a natural-language question for detailed mode.
- **Help Response Mode**: The command behavior selected from the request shape, either overview mode for the full map or question mode for one focused explanation.
- **Artifact Guide Entry**: A concise explanation unit that ties together a workflow step, its usual prerequisite, its output artifact, and the artifact's role in the broader process.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: First-time users can identify the correct next workflow step and expected artifact for a named stage in under 60 seconds using overview mode alone.
- **SC-002**: In review sessions, at least 90% of focused questions about a known workflow artifact or step are answered correctly without requiring a follow-up question to understand what it is, why it matters, and what comes before or after it.
- **SC-003**: Reviewers can distinguish `roadmap.md` from `current-truth.md` after reading one relevant help response, without consulting the README or another command file.
- **SC-004**: Users can locate the canonical file path for any primary product artifact or core engineering-spec artifact in under 30 seconds from a help response.

## Assumptions

- The requested capability is an assistant slash command named `/product-spec-help`, not a new top-level `product-spec` CLI subcommand.
- The references to `product-spec-kit` in the prompt are intended to mean `/product-spec-help` invoked with and without a question.
- The command should explain the standard workflow even when the current project has not yet created the corresponding files.
- The canonical product artifact location is `docs/product/`, and legacy `product/` or `.product/` paths matter only as migration history.
- The workflow explanation should include the key spec-kit handoff artifacts needed to move from product thinking into engineering-ready work.
- Clarification and implementation may be discussed when relevant, but the help surface is primarily artifact-oriented rather than an exhaustive tutorial for every possible command.
