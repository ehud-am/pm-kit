# Data Model: FRFAQ Narrative and Roadmap Commands

## Entity: Asset Bundle Definition

- **Purpose**: Represents the packaged set of assistant commands and shared templates that `product-spec add` installs into a target project.
- **Fields**:
  - `assistantCommands`: Installed command assets for Claude and Codex
  - `sharedTemplates`: Installed `.product/templates/` assets
  - `historyTemplates`: Installed companion history templates for FRFAQ artifacts
  - `workflowVersion`: Version marker for the redesigned FRFAQ system
- **Relationships**:
  - Contains many `Assistant Command Asset`
  - Contains many `Product Template Asset`

## Entity: Assistant Command Asset

- **Purpose**: A packaged Markdown command file installed into an assistant-specific command directory.
- **Fields**:
  - `id`: Stable managed asset identifier
  - `target`: `claude` or `codex`
  - `sourcePath`: Package path under `assets/<target>/commands/`
  - `targetPath`: Installed project path under the assistant command directory
  - `workflowRole`: One of `domain`, `press`, `faq`, `narrative`, `roadmap`, `align`
- **Validation Rules**:
  - `id`, `sourcePath`, and `targetPath` must be unique per target
  - `workflowRole` must map to exactly one installed command filename per target
  - Installed file content must remain checksum-trackable in the manifest

## Entity: Product Template Asset

- **Purpose**: A packaged Markdown template installed under `.product/templates/`.
- **Fields**:
  - `id`: Stable managed asset identifier
  - `templateType`: `primary` or `history`
  - `sourcePath`: Package path under `assets/product/templates/`
  - `targetPath`: Installed project path under `.product/templates/`
  - `artifactName`: One of `domain`, `press`, `faq`, `narrative`, `roadmap`, `current-truth`
- **Validation Rules**:
  - Every primary artifact must have exactly one primary template
  - Artifacts that preserve history externally should have a matching history template
  - Template target paths must remain inside `.product/templates/`

## Entity: Workflow Sequence

- **Purpose**: Defines the canonical product-spec journey across FRFAQ and engineering artifacts.
- **Fields**:
  - `steps`: Ordered list `domain`, `press`, `faq`, `narrative`, `roadmap`, `speckit`, `align`, `current-truth`
  - `handoffRules`: Mapping from one command to its recommended next command
  - `terminalArtifact`: `current-truth.md`
- **Validation Rules**:
  - `narrative` must follow `faq`
  - `roadmap` must follow `narrative`
  - `align` must lead to `current-truth`

## Entity: FRFAQ Document Family

- **Purpose**: Groups the related product artifacts that together describe context, promise, plan, and reality.
- **Members**:
  - `domain.md`
  - `press.md`
  - `faq.md`
  - `narrative.md`
  - `roadmap.md`
  - `current-truth.md`
- **Shared Traits**:
  - Current-state focused primary document
  - Shared decision-oriented layer for assumptions, key decisions, and related artifacts
  - Optional companion history document

## Entity: Current Truth Document

- **Purpose**: The maintained representation of what is actually true in the product today.
- **Fields**:
  - `productSummary`
  - `activeCapabilities`
  - `knownBoundaries`
  - `sourceSpecs`
  - `recentAlignmentNotes`
- **State Transitions**:
  - Created when `align` first needs a current-state artifact
  - Updated whenever `align` reconciles engineering specs and product-facing artifacts
- **Validation Rules**:
  - Must reflect current reality rather than roadmap intent
  - Must not become the primary sequencing artifact

## Entity: Roadmap Initiative

- **Purpose**: A discrete future-facing bet that appears in `roadmap.md`.
- **Fields**:
  - `name`
  - `customerOutcome`
  - `phase`
  - `confidenceLevel`
  - `dependencies`
  - `tradeoffs`
  - `status`: `committed`, `exploratory`, or `deferred`
- **Validation Rules**:
  - Must map back to the narrative and roadmap structure
  - Must not be represented as already true in `current-truth.md` unless built

## Entity: History Artifact

- **Purpose**: Companion changelog-style file that records historical decisions and revisions for an FRFAQ document.
- **Fields**:
  - `artifactName`
  - `entries`
  - `sourceUpdate`
  - `effectiveDate`
- **Relationships**:
  - Belongs to one `FRFAQ Document Family` member
  - Updated when the associated primary document changes meaningfully

## Relationship Notes

- `Assistant Command Asset` drives generation or update of one or more `FRFAQ Document Family` members.
- `align` consumes engineering specs and FRFAQ documents, then updates `Current Truth Document`.
- `Workflow Sequence` governs recommended handoffs between assistant command assets.
- `History Artifact` preserves prior reasoning so primary documents can stay current-state focused.
