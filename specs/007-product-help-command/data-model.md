# Data Model: Product-Spec Help Command

## Entity: Help Request

- **Purpose**: Represents the user input passed to `/product-spec-help`.
- **Fields**:
  - `rawInput`: Original text after the command
  - `normalizedInput`: Trimmed text used to decide mode
  - `mode`: `overview` or `question`
  - `questionTopic`: Optional focused topic extracted from non-empty input
- **Validation Rules**:
  - Empty or whitespace-only `normalizedInput` maps to `overview`
  - Non-empty `normalizedInput` maps to `question`
  - The command must remain tolerant of natural-language phrasing rather than requiring structured syntax

## Entity: Workflow Knowledge Entry

- **Purpose**: Captures one canonical step in the product-spec/spec-kit workflow so the help command can explain it consistently.
- **Fields**:
  - `stepName`: `domain`, `press`, `faq`, `narrative`, `roadmap`, `specify`, `plan`, `tasks`, or `align`
  - `commandName`: Installed slash command or spec-kit command associated with the step
  - `inputArtifact`: Artifact usually needed before the step, if any
  - `outputArtifact`: Artifact created or updated by the step
  - `artifactPath`: Canonical path when the output is a product-spec artifact
  - `purposeSummary`: One-line explanation of what the artifact is and why it matters
  - `nextStep`: The most typical downstream workflow step
- **Validation Rules**:
  - Product artifact paths must use canonical `docs/product/` locations
  - Entries that primarily refine an existing artifact must say "updates" rather than implying a new file
  - `roadmap` and `current-truth` responsibilities must remain distinct

## Entity: Artifact Guide Entry

- **Purpose**: A response-ready explanation unit derived from a workflow knowledge entry for overview and deep-dive answers.
- **Fields**:
  - `artifactName`
  - `whatItIs`
  - `whyItMatters`
  - `createdBy`
  - `usuallyNeeds`
  - `informs`
  - `legacyAliases`: Optional legacy names or paths
- **Relationships**:
  - Maps to one `Workflow Knowledge Entry`
- **Validation Rules**:
  - `whatItIs` and `whyItMatters` together must stay concise enough for overview mode
  - Legacy aliases may appear only as clarifying context, not as canonical names

## Entity: Term Mapping

- **Purpose**: Represents a best-effort normalization from a user-provided term to a canonical workflow concept.
- **Fields**:
  - `inputTerm`
  - `matchedConcept`
  - `matchType`: `exact`, `alias`, or `best-effort`
  - `assumptionNote`: Optional note explaining the mapping
- **Validation Rules**:
  - `best-effort` mappings must disclose the assumption in the response
  - Alias mappings for `product/` or `.product/` paths must normalize to `docs/product/` terminology

## Entity: Installed Help Command Asset

- **Purpose**: A packaged assistant command file that exposes `/product-spec-help` for one integration target.
- **Fields**:
  - `target`: `claude` or `codex`
  - `sourcePath`: Package path under `assets/<target>/commands/`
  - `targetPath`: Installed project path under the assistant command directory
  - `commandName`: `/product-spec-help`
  - `managed`: Manifest-tracked ownership flag
- **Validation Rules**:
  - Both assistant targets must expose equivalent help behavior
  - The asset must be discoverable through the existing assistant asset registry and manifest-backed install/check/remove flows

## Relationship Notes

- `Help Request` selects the `Help Response Mode` through input normalization.
- `Workflow Knowledge Entry` provides the canonical facts used to build an `Artifact Guide Entry`.
- `Term Mapping` sits between free-form user questions and the canonical workflow/artifact model.
- `Installed Help Command Asset` packages the behavior for each assistant target and is tracked like other assistant command assets.
