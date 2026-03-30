# Research: FRFAQ Narrative and Roadmap Commands

## Decision 1: Use `current-truth.md` as the `align` output

- **Decision**: Rename the live current-state artifact maintained by `align` to `current-truth.md`.
- **Rationale**: The new workflow distinguishes promise (`press`, `faq`, `narrative`), prioritization (`roadmap`), engineering intent (`speckit*`), and reality (`current-truth`). `current-truth.md` communicates that the document reflects what is actually built and supported today, not future aspirations.
- **Alternatives considered**:
  - Keep `requirements.md`: too ambiguous between current, planned, and desired capabilities.
  - Rename to `product-spec.md`: clearer than `requirements.md`, but more easily confused with forward-looking specs or the product-spec package itself.
  - Rename to `product-overview.md`: too lightweight for the intended role as maintained current-state truth.

## Decision 2: Canonical workflow order

- **Decision**: Standardize the workflow as `domain -> press -> faq -> narrative -> roadmap -> speckit* -> align -> current-truth`.
- **Rationale**: This preserves an Amazon-style Working Backwards progression. Teams start with context, articulate the external customer promise, stress-test it, deepen it into a durable internal story, sequence bets, translate the next bet into engineering specs, and then reconcile built reality back into the product record.
- **Alternatives considered**:
  - Move `narrative` earlier than `press`: weakens the Working Backwards discipline by reducing the forcing function of a customer-facing promise.
  - Put `roadmap` before `narrative`: risks turning roadmap prioritization into a feature backlog before the enduring story is clear.
  - End the workflow at `align` without a named current-state artifact: makes the output of reconciliation less explicit and harder to explain.

## Decision 3: Keep `roadmap` and `current-truth` distinct

- **Decision**: Treat `roadmap` as the forward-looking sequencing artifact and `current-truth.md` as the current-state product truth.
- **Rationale**: Teams need one artifact that says what is true now and another that says what is next. Collapsing them would mix committed sequencing, speculation, shipped capabilities, and partial implementation status into one document.
- **Alternatives considered**:
  - Keep a single capability inventory file plus roadmap notes: insufficiently explicit once the workflow adds narrative and current-state reconciliation.
  - Merge roadmap and current truth: easier to author initially, but much harder to keep honest over time.

## Decision 4: Redesign all FRFAQ templates around a shared decision layer

- **Decision**: Update `domain`, `press`, `faq`, `narrative`, `roadmap`, and `current-truth` so they all share a predictable section pattern for assumptions, key decisions, and related artifacts.
- **Rationale**: A shared structure reduces cognitive load across documents and makes the asset bundle feel like one system rather than a collection of unrelated prompts. It also supports migration, since updated commands can reliably add the same conceptual sections to older documents.
- **Alternatives considered**:
  - Keep only the new templates richly structured: creates a split system with old and new mental models.
  - Customize every template independently: maximizes document-specific freedom but weakens navigability and migration consistency.

## Decision 5: Move most history into dedicated history artifacts

- **Decision**: Keep primary documents focused on current understanding and store most history in dedicated changelog-style companion artifacts.
- **Rationale**: The user explicitly wants current-state clarity in the main artifacts. Dedicated history files preserve rationale and change history without turning every operational document into a reverse-chronological archive.
- **Alternatives considered**:
  - Keep cumulative history inline in every document: makes the main artifacts noisy and harder to scan.
  - Drop most history entirely: conflicts with the desire to preserve decisions and migration context.

## Decision 6: Migrate older documents through normal command usage

- **Decision**: Use normal command updates as the primary migration mechanism from older templates to the redesigned structure.
- **Rationale**: This avoids a separate migration-only workflow and ensures teams gradually converge on the new format as they continue using the product-spec commands. It also aligns with existing add/update semantics in the CLI.
- **Alternatives considered**:
  - Require manual recreation: too error-prone and burdensome.
  - Create a migration-only command: explicit but adds one more concept and does not guarantee adoption during everyday use.

## Decision 7: Extend the static asset registry rather than add dynamic discovery

- **Decision**: Continue registering assistant commands and shared templates statically in the asset registry.
- **Rationale**: The existing implementation already uses a deterministic registry-backed model for installation, manifest tracking, and health checks. This feature expands the asset set but does not require a new discovery mechanism.
- **Alternatives considered**:
  - Dynamic asset discovery from the filesystem: more flexible, but adds complexity and weakens the explicitness of tests and health reporting.
  - Separate registries per workflow phase: unnecessary fragmentation for a modest bundle expansion.
