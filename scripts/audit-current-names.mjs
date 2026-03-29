import { readFile } from "node:fs/promises";

const files = [
  "README.md",
  "CHANGELOG.md",
  "AGENTS.md",
  "package.json",
  "src/cli/main.ts",
  "src/cli/commands/add.ts",
  "src/cli/commands/remove.ts",
  "src/cli/commands/help.ts",
  "src/cli/commands/version.ts",
  "src/cli/output/reporter.ts",
  "src/core/assets/registry.ts",
  "src/core/orchestration/add.ts",
  "src/core/orchestration/check.ts",
  "tests/integration/cli.spec.ts",
  "assets/claude/commands/product-spec-align.md",
  "assets/claude/commands/product-spec-domain.md",
  "assets/claude/commands/product-spec-faq.md",
  "assets/claude/commands/product-spec-press.md",
  "assets/codex/commands/product-spec-align.md",
  "assets/codex/commands/product-spec-domain.md",
  "assets/codex/commands/product-spec-faq.md",
  "assets/codex/commands/product-spec-press.md"
];

const allowedSubstrings = [
  ".product-spec/manifest.json",
  "productSpecVersion",
  "github:ehud-am/product-spec",
  "Initial product-spec command set",
  'expect(result.stdout).not.toContain("Usage: pmkey");'
];

const forbiddenPatterns = [/pmkey/g, /pm-kit/g, /pmkit/g, /\/pmkey/g, /\/pmkit/g];
const failures = [];

for (const file of files) {
  const original = await readFile(file, "utf8");
  let sanitized = original;
  for (const allowed of allowedSubstrings) {
    sanitized = sanitized.split(allowed).join("");
  }

  const matches = [];
  for (const pattern of forbiddenPatterns) {
    const found = sanitized.match(pattern);
    if (found) {
      matches.push(...found);
    }
  }

  if (matches.length > 0) {
    failures.push(`${file}: found forbidden legacy name fragments`);
  }
}

if (failures.length > 0) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}
