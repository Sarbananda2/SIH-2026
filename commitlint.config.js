/**
 * Commit message convention for this repository.
 *
 * Format:  type(scope): subject
 * Example: research(competitors): record BriefCam and Videonetics findings
 *
 * Extends conventional commits, with `research` added because most work in this
 * repository is research rather than code. See CONTRIBUTING.md.
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "research", // research notes, findings, evidence
        "docs",     // documentation, README, guides
        "decision", // architecture or product decision records
        "planning", // roadmap, scope, milestones, submission material
        "assets",   // diagrams, screenshots
        "chore",    // tooling, config, dependencies, housekeeping
        "fix",      // correcting an error in existing content
        "refactor", // reorganising files without changing meaning
        "revert",
      ],
    ],
    "header-max-length": [2, "always", 72],
  },
};
