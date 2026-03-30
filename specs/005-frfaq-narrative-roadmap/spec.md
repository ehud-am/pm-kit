# Feature Specification: FRFAQ Narrative and Roadmap Commands

**Feature Branch**: `005-frfaq-narrative-roadmap`  
**Created**: 2026-03-30  
**Status**: Draft  
**Input**: User description: "Add narrative and roadmap commands and templates to complete the FRFAQ approach, using Amazon Working Backwards guidance to extend the existing press and FAQ workflow."

## Clarifications

### Session 2026-03-30

- Q: How broadly should the existing `domain`, `press`, `faq`, and `requirements` templates be updated as part of this feature? → A: Redesign all existing templates into a more structured framework with explicit assumptions, decisions, and history throughout.
- Q: Where should document history primarily live in the redesigned FRFAQ system? → A: Move most history out of the main documents into separate changelog-style files.
- Q: How consistent should the new decision-oriented structure be across the FRFAQ templates? → A: Every template gets a consistent section for assumptions, key decisions, and related artifacts, adapted lightly per document type.
- Q: How should commands handle older FRFAQ documents that still use the previous template style? → A: When a command updates an older document, it should reshape it into the new template structure while preserving still-valid content.
- Q: What is the intended boundary between `requirements` and `roadmap` after the redesign? → A: `requirements` remains the canonical cross-release capability inventory, while `roadmap` handles sequencing, phases, and priorities.
- Q: What should the live current-state artifact maintained by `align` be called? → A: `current-truth.md`
- Q: What should the canonical end-to-end workflow order be? → A: `domain -> press -> faq -> narrative -> roadmap -> speckit* -> align -> current-truth`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Capture the durable product story (Priority: P1)

A product manager who has drafted a press release and FAQs needs a stable artifact that explains the long-lived story behind the release: the customer, the unmet need, the future state, the strategic promise, and the principles that should stay true even as individual releases evolve. They run the `narrative` command to create or update `.product/narrative.md` using an Amazon-style Working Backwards structure that synthesizes the domain, press release, and FAQ into one coherent document.

**Why this priority**: Without a durable narrative, the team has release copy but no shared story to guide follow-on decisions. The narrative is the bridge from PRFAQ thinking to roadmap choices.

**Independent Test**: Can be tested by creating domain, press, and FAQ inputs, running the `narrative` command, and verifying that `.product/narrative.md` captures customer context, core tension, promised future state, guiding principles, and explicit non-goals in a way that stays useful beyond a single release.

**Acceptance Scenarios**:

1. **Given** an existing domain document and press release, **When** a user runs the `narrative` command, **Then** the system creates `.product/narrative.md` with a cohesive story that explains who the customer is, what problem matters most, why it matters now, and what future the product is trying to create.
2. **Given** an existing `.product/narrative.md`, **When** a user runs the `narrative` command after the press release or FAQs change, **Then** the system updates the narrative while preserving enduring sections that still apply and refreshing assumptions that no longer hold.
3. **Given** incomplete source inputs, **When** a user runs the `narrative` command, **Then** the system makes reasonable inferences, documents assumptions, and still produces a readable narrative rather than a sparse outline.

---

### User Story 2 - Turn the story into a product roadmap (Priority: P1)

A product manager who has a clear narrative needs to turn that story into a sequence of customer-visible bets. They run the `roadmap` command to create or update `.product/roadmap.md`, using the narrative, press release, FAQs, and known requirements to produce a roadmap organized around customer outcomes, phases, confidence, dependencies, and explicit tradeoffs instead of a raw feature backlog.

**Why this priority**: The roadmap is how the team operationalizes the narrative. Without it, the FRFAQ work ends at storytelling and does not help teams decide what comes now, next, and later.

**Independent Test**: Can be tested by creating a narrative and supporting PRFAQ artifacts, running the `roadmap` command, and verifying that `.product/roadmap.md` presents a staged plan with customer outcomes, scope boundaries, dependencies, and rationale for sequencing.

**Acceptance Scenarios**:

1. **Given** an existing `.product/narrative.md`, **When** a user runs the `roadmap` command, **Then** the system creates `.product/roadmap.md` with phased initiatives tied to customer outcomes and the strategic story captured in the narrative.
2. **Given** an existing `.product/roadmap.md`, **When** new insights emerge from updated FAQs or engineering specs, **Then** the `roadmap` command refreshes priorities, dependencies, and confidence without discarding historical decisions that still matter.
3. **Given** multiple possible future ideas, **When** the user runs the `roadmap` command, **Then** the document distinguishes committed work from exploratory work and deferred opportunities so the roadmap remains honest and decision-useful.

---

### User Story 3 - Preserve continuity across the FRFAQ workflow (Priority: P2)

A team using the full product-spec workflow wants `narrative` and `roadmap` to feel like first-class companions to `domain`, `press`, `faq`, and `align`. Each command should suggest the next logical step, reuse the shared product folder conventions, and keep the artifacts mutually reinforcing so the team can move through the canonical flow `domain -> press -> faq -> narrative -> roadmap -> speckit* -> align -> current-truth` without reconstructing the thinking each time.

**Why this priority**: This is what makes the added commands feel like part of one workflow rather than isolated prompts. It matters after the core documents exist, so it follows the two new command outcomes.

**Independent Test**: Can be tested by using the end-to-end workflow and confirming that both new commands create the expected files, reference the right upstream artifacts, and provide handoffs that guide the user into the next product or spec activity.

**Acceptance Scenarios**:

1. **Given** a project with existing `.product/` artifacts, **When** the user runs either new command, **Then** the system writes to the expected file in `.product/` and preserves the same workflow conventions already used by the existing commands.
2. **Given** a user finishes the `narrative` command, **When** the command completes, **Then** it suggests `roadmap` as the next step in the canonical FRFAQ workflow.
3. **Given** a user finishes the `roadmap` command, **When** the command completes, **Then** it suggests creating or updating the next `speckit` specification as the next step in the canonical workflow.
4. **Given** engineering specs have been created or updated, **When** a user runs `align`, **Then** the system updates `current-truth.md` as the maintained representation of what is actually true in the product today.

---

### User Story 4 - Upgrade the existing FRFAQ templates into a shared framework (Priority: P2)

A team already using `domain`, `press`, `faq`, and `requirements` wants the new work to improve the full artifact set rather than only introducing two new files. They expect the existing templates to be redesigned into a more structured framework with explicit assumptions and key decisions, while keeping the main documents focused on current understanding and moving most historical detail into dedicated changelog-style artifacts.

**Why this priority**: This directly affects the scope of the template work and how much planning, migration, and validation will be needed. It is important, but it builds on the decision to add the two new commands.

**Independent Test**: Can be tested by reviewing the revised templates for `domain`, `press`, `faq`, and `requirements` and confirming that each one includes structured sections for assumptions and decisions, while history is captured through dedicated changelog-style artifacts instead of crowding the main document.

**Acceptance Scenarios**:

1. **Given** the existing `domain`, `press`, `faq`, and `requirements` templates, **When** this feature is implemented, **Then** each template is redesigned into a shared framework that includes explicit assumptions and key decisions appropriate to that artifact, while keeping the main document focused on current-state understanding.
2. **Given** a user updates an existing product document after the redesign, **When** the command rewrites the document, **Then** the resulting output preserves the document's core purpose while directing historical changes into changelog-style companion artifacts.
3. **Given** the two new `narrative` and `roadmap` templates, **When** a team reads them alongside the revised existing templates, **Then** the full artifact set feels structurally consistent instead of a mix of unrelated formats.
4. **Given** any FRFAQ template in the redesigned system, **When** a user opens the document, **Then** they can find a shared decision-oriented layer for assumptions, key decisions, and related artifacts in a consistent location adapted to that document type.
5. **Given** an existing FRFAQ document created from the older template style, **When** the corresponding command updates it, **Then** the command migrates the document into the redesigned structure while preserving still-valid content and moving historical detail into the new changelog-style location.

---

### User Story 5 - Keep current truth and roadmap distinct (Priority: P2)

A team using both `current-truth` and `roadmap` wants each artifact to have a clear job so information is not duplicated or scattered. They expect `current-truth.md` to remain the living current-state product specification maintained by `align`, while `roadmap` focuses on sequencing, phases, and prioritization decisions for future work.

**Why this priority**: This boundary affects template design, command behavior, and how users interpret the full artifact set. It matters for planning, but it depends on the earlier framework decisions already made.

**Independent Test**: Can be tested by reviewing the redesigned `current-truth` and `roadmap` templates and confirming that the former captures the current product reality while the latter organizes ordering, confidence, and timing posture without collapsing into one another.

**Acceptance Scenarios**:

1. **Given** a product capability that is already built or supported, **When** a user reviews `current-truth.md`, **Then** the capability appears there as part of the maintained statement of current product reality regardless of near-term delivery order.
2. **Given** a set of upcoming bets and sequencing decisions, **When** a user reviews `roadmap`, **Then** the document explains phases, priorities, and rationale without becoming the primary inventory of all product capabilities.
3. **Given** a change in roadmap priority, **When** the artifact set is updated, **Then** `roadmap` reflects the sequencing change while `current-truth.md` remains the maintained source of what capabilities are currently true in the product.

---

### Edge Cases

- What happens when `narrative` is run before a press release or FAQ exists? The system still produces a narrative from available context, clearly noting which parts are inferred and which source artifacts are missing.
- What happens when `roadmap` is run before a narrative exists? The system informs the user that the roadmap is stronger with a narrative, makes a best-effort draft from available product artifacts, and suggests creating the narrative next.
- What happens when the narrative and roadmap imply work that is not yet reflected in engineering specs? The product artifacts may express the intent, but they must clearly separate strategic intent from committed delivery.
- What happens when historical roadmap decisions conflict with the newest narrative? The updated roadmap should preserve the historical record while marking the superseded direction and the reason it changed.
- What happens when a project has multiple upcoming releases in discussion at once? The roadmap should group work by outcome or phase so teams can see the sequence without confusing exploration with commitments.
- What happens when existing documents were created from the older, lighter templates? The redesigned commands should preserve useful current-state content while migrating historical detail into the new changelog-style structure without erasing prior reasoning.
- What happens when a capability appears in `current-truth.md` but is not prioritized on the current roadmap? The capability remains in `current-truth.md` as part of the maintained current product reality, while the roadmap can omit it or mark adjacent future work as deferred without creating a contradiction.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST add a `narrative` command that creates or updates `.product/narrative.md`
- **FR-002**: The `narrative` command MUST synthesize existing product context into a durable story that explains the customer, the core problem, the future state, and the product promise
- **FR-003**: The `narrative` output MUST use an Amazon-inspired Working Backwards structure that emphasizes customer need, strategic intent, and principles rather than implementation detail
- **FR-004**: The `narrative` output MUST include explicit non-goals or boundaries so the story clarifies what the team is not trying to do
- **FR-005**: The system MUST add a `roadmap` command that creates or updates `.product/roadmap.md`
- **FR-006**: The `roadmap` command MUST translate the narrative and related product artifacts into a staged plan organized around customer outcomes or phases
- **FR-007**: The `roadmap` output MUST distinguish committed work, exploratory work, and deferred opportunities so readers can tell what is certain versus tentative
- **FR-008**: The `roadmap` output MUST capture dependencies, sequencing rationale, and major tradeoffs that affect the order of work
- **FR-009**: Both new commands MUST preserve existing document content where it remains valid and update only the portions affected by new information
- **FR-010**: Both new commands MUST follow the same `.product/` folder conventions as the existing product-spec commands
- **FR-011**: Each new command MUST have a packaged command asset and a corresponding packaged template asset
- **FR-012**: The new templates MUST provide structured sections that guide users toward Amazon-style product thinking without requiring prior expertise in the framework
- **FR-013**: The `narrative` command MUST identify the source artifacts it relied on, including which inputs were available and which were inferred
- **FR-014**: The `roadmap` command MUST maintain a readable history of roadmap changes or rationale so teams can understand why priorities moved over time
- **FR-015**: Both new commands MUST provide workflow handoffs that connect naturally to the existing `press`, `faq`, `align`, and specification steps
- **FR-015**: Both new commands MUST provide workflow handoffs that connect naturally to the canonical sequence `domain -> press -> faq -> narrative -> roadmap -> speckit* -> align -> current-truth`
- **FR-016**: The existing `domain`, `press`, `faq`, and `requirements` templates MUST be redesigned as part of this feature rather than left in their current lightweight form
- **FR-017**: The redesigned existing templates MUST include explicit sections for assumptions and key decisions, adapted to the purpose of each artifact
- **FR-018**: The redesigned existing templates MUST remain structurally consistent with the new `narrative` and `roadmap` templates so the full FRFAQ artifact set feels like one framework
- **FR-019**: Commands updating older documents MUST preserve still-valid content while incorporating the new structured framework
- **FR-019**: Commands updating older documents MUST preserve still-valid content while incorporating the new structured framework
- **FR-020**: The redesigned FRFAQ system MUST store most historical detail in separate changelog-style files rather than embedding it throughout the primary product documents
- **FR-021**: Any document that previously carried cumulative history in-line MUST either retain only a concise current-state summary or be paired with a dedicated history artifact that preserves earlier context
- **FR-022**: Every FRFAQ template, including `domain`, `press`, `faq`, `requirements`, `narrative`, and `roadmap`, MUST include a consistent decision-oriented layer for assumptions, key decisions, and related artifacts
- **FR-023**: The shared decision-oriented layer MUST appear in a predictable structure across templates, with only light adaptation for the purpose of each document
- **FR-024**: Standard command usage MUST serve as the primary migration path for older FRFAQ documents, so teams do not need a separate manual refresh step to adopt the redesigned template system
- **FR-025**: The live current-state artifact maintained by `align` MUST be named `current-truth.md`
- **FR-026**: `current-truth.md` MUST serve as the living current-state product specification that reflects what is actually built and supported
- **FR-027**: The redesigned `roadmap` template MUST focus on sequencing, phases, confidence, and prioritization rather than replacing the current-state product specification maintained in `current-truth.md`
- **FR-028**: `current-truth.md` and `roadmap` MUST complement one another without duplicating the same primary responsibility
- **FR-029**: The product-spec workflow MUST explicitly position `align` as the step that maintains `current-truth.md` after specification and implementation knowledge evolves

### Key Entities

- **Narrative Document**: A durable product story that captures the customer, problem, future state, strategic promise, guiding principles, boundaries, and major assumptions
- **Roadmap Document**: A staged view of planned product progress organized around customer outcomes, phases, confidence, dependencies, and tradeoffs
- **Current Truth Document**: A living current-state product specification maintained by `align` that describes what is actually true of the product today
- **Workflow Sequence**: The canonical order `domain -> press -> faq -> narrative -> roadmap -> speckit* -> align -> current-truth`, which moves from product context through customer promise and planning into engineering specification and maintained current-state truth
- **Roadmap Initiative**: A discrete bet or workstream on the roadmap with a customer outcome, scope boundary, timing posture, rationale, and confidence level
- **Narrative Principle**: A durable rule or belief that should guide roadmap choices and tradeoffs across releases
- **Source Artifact Set**: The collection of available product documents, such as domain, press release, FAQs, current truth, and specs, used to produce or update the narrative and roadmap

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user who already has domain, press, and FAQ artifacts can produce both a narrative and a roadmap in under 20 minutes without creating custom document structures from scratch
- **SC-002**: In 90% of generated narrative documents, reviewers can identify the target customer, core problem, future state, and non-goals without needing verbal clarification from the author
- **SC-003**: In 90% of generated roadmap documents, reviewers can distinguish what is committed now, what is likely next, and what remains exploratory or deferred
- **SC-004**: After adding the two new commands, a team can move from product context to an engineering-ready next bet using the documented workflow with no missing artifact between FAQ and specification
- **SC-004**: After adding the two new commands and current-truth positioning, a team can move from product context to an engineering-ready next bet using the documented workflow with no missing artifact between FAQ and specification
- **SC-005**: Teams reviewing a roadmap update can identify the reason for a priority change in under 5 minutes by reading the roadmap document alone
- **SC-006**: Reviewers can identify the active assumptions, important decisions, and recent history in any FRFAQ document in under 2 minutes without needing to inspect another artifact
- **SC-007**: Reviewers can locate historical changes for any FRFAQ artifact in under 2 minutes using the dedicated changelog structure without scanning the main document body

## Assumptions

- The existing `domain`, `press`, `faq`, and `align` commands remain the core surrounding workflow for the new artifacts
- Users want `narrative` and `roadmap` to generate or update files inside the existing `.product/` directory rather than introducing a second storage location
- The narrative should be longer-lived than a single release announcement and therefore should focus on enduring story elements rather than launch copy
- The roadmap should communicate direction and sequencing for humans, not serve as a task tracker or sprint plan
- Amazon Working Backwards concepts should be reflected through clear structure and prompts rather than by requiring strict internal jargon
- Existing FRFAQ templates should be redesigned broadly enough to feel like a shared document system, not a set of isolated prompt files with inconsistent depth
- The team prefers current-state clarity in the main product artifacts, with most historical context recorded in companion changelog-style files
- The team prefers a uniform cross-document structure for assumptions, decisions, and related artifacts so users can navigate any FRFAQ document with the same mental model
- The team prefers migration to happen during normal document updates rather than through a separate migration-only workflow
- The team wants `current-truth.md` and `roadmap` to stay distinct so current product reality is not mixed with changing delivery priorities
- The team wants the canonical workflow to progress from product thinking into engineering specs and then back into a maintained statement of current product truth
