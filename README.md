# Smart India Hackathon 2026 — Project Repository

Research, documentation, and planning for our SIH 2026 entry.

## Problem statement

**ID 26187 — AI-Based Intelligent Video Analytics Platform for Border
Surveillance using existing CCTV Infrastructure**

The platform must run analytics over **cameras that are already deployed**,
rather than assuming new hardware. Full text, constraints, and open questions:
[`research/problem-space/problem-statement.md`](research/problem-space/problem-statement.md).

> Still to record: the full official description, organising department,
> category, and theme, plus team name and members.

Our reading of it — constraints, assumptions, and open questions — is in
[`research/problem-space/problem-analysis.md`](research/problem-space/problem-analysis.md).
Current stage and what comes next:
[`docs/planning/roadmap.md`](docs/planning/roadmap.md).

## Repository structure

```
.
├── research/          # Research notes
│   ├── problem-space/         # the problem statement, domain, constraints
│   ├── technical-research/    # models, libraries, hardware evaluations
│   ├── market-research/       # existing systems and where they fall short
│   └── findings/              # short, settled conclusions
│
├── docs/              # Project documentation
│   ├── architecture/  #   system design
│   ├── decisions/     #   architecture decision records
│   ├── planning/      #   scope, milestones, demo and submission material
│   └── references/    #   datasets, papers, external docs
│
├── assets/            # Diagrams and screenshots used by the docs
│   ├── diagrams/
│   └── screenshots/
│
├── .husky/            # git hooks — commit message checks
├── commitlint.config.js
├── package.json       # dev tooling only, no application code
├── CONTRIBUTING.md
└── README.md
```

Application code is **not** kept here — it lives in its own repository. The
`package.json` exists only to install the commit-message hooks; run `npm
install` once after cloning to activate them.

## Where things go

| I have… | It goes in… |
| --- | --- |
| Research on the problem or the tech | `research/` |
| A settled conclusion others will build on | `research/findings/` |
| System design or architecture notes | `docs/architecture/` |
| A decision the team made | `docs/decisions/` |
| Notes on scope, tasks, or the demo | `docs/planning/` |
| A dataset, paper, or API link worth keeping | `docs/references/` |
| A diagram or screenshot for the docs | `assets/` |

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) for naming, sourcing, and review
conventions.
