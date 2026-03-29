import type { Command } from "commander";

export function configureHelp(program: Command): void {
  program.addHelpText(
    "after",
    `
Examples:
  product-spec add claude
  product-spec add both
  product-spec remove codex
  product-spec check both
  product-spec doctor claude
`
  );

  program
    .command("help")
    .description("Show help for product-spec")
    .action(() => {
      program.outputHelp();
    });
}
