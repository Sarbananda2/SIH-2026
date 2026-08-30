# Contributing

Conventions for this repository. Keep them light — the point is that the team
can work in parallel without collisions or duplicated effort.

This repository is the **single source of truth** for the project. It should
record not only what we built, but why: the problem, the research that shaped
our answer, the alternatives we rejected, and how the product evolved.

It holds research, documentation, and planning. Application code lives in its
own repository and is not tracked here.

## Where things go

See the table in [`README.md`](README.md#where-things-go). The short version:
research notes in `research/`, everything about how we build in `docs/`, and
binaries that documents link to in `assets/`.

Every artifact must have an intentional, discoverable location. Nobody should
have to ask "where does this go?" — if the answer is not obvious, that is a
problem with the structure, not with the person asking. Raise it.

## Adding files and directories

Before creating anything, answer four questions:

1. Is this genuinely necessary *now*?
2. Does an appropriate location already exist?
3. Should this go into an existing document instead of a new one?
4. Is the structure still logical once this is added?

Default to editing an existing document over creating a new one. Do not create
anything because it might be useful later.

Specifically avoid: empty directories, placeholder files, duplicate
documentation, stray notes, temporary files, unstructured research dumps, and
directory trees for stages we have not reached.

### Keep the root clean

The repository root holds only `README.md`, `CONTRIBUTING.md`, `.gitignore`, and
the major top-level directories — plus primary configuration and `LICENSE` if
those arrive. Research documents, screenshots, diagrams, and notes never
accumulate in the root.

## Documentation-first

Write the reasoning down before, or alongside, the work — not after. When any of
these happens, it belongs in the repository:

- The problem definition is set or changes
- Research produces a finding the team will act on
- A competitor or existing system is identified
- A product decision is made, or scope changes
- An architecture or technology is chosen
- An important alternative is rejected

Record why, not just what. A decision without its reasoning cannot be revisited
intelligently when the constraints change.

Skip the trivia. Document what helps someone understand the project, make a
future decision, onboard, or trace how we got here.

## Writing

- **One topic per file.** A genuinely new topic gets its own file; a new angle on
  an existing topic gets added to the file that already covers it.
- **Lowercase-kebab-case filenames**, named after the subject:
  `competitor-research.md`, `market-gap-analysis.md`. Never name a file after its
  editing history — no `final.md`, `notes2.md`, `research-latest.md`. Git holds
  the history.
- **Date anything that goes stale.** Add `Last updated: YYYY-MM-DD` to research
  notes and planning documents so readers can judge freshness.
- **Cite sources.** A claim without a link cannot be checked by anyone else, and
  unverifiable claims are a liability in a judged submission.
- **Record dead ends.** A rejected approach that is written down costs the team
  once; an undocumented one gets rediscovered by the next person.
- **Do not paste large excerpts** of third-party material. Link the source and
  summarise in your own words.

## One canonical location per topic

Each subject has exactly one authoritative document. Other documents link to it;
they do not copy it.

```
research  →  referenced by  →  product decisions  →  referenced by  →  architecture
```

Copying research into several documents is how versions drift apart and the team
ends up acting on stale conclusions. A product decision should cite the research
it rests on, not restate it. Summarising in one or two sentences and linking to
the canonical source is fine — reproducing a section is not.

## Decisions

When something changes what the team will build, add an ADR in
[`docs/decisions/`](docs/decisions/) using the template in its README. Supersede
old records rather than rewriting them — the reasoning at the time is the point.

## How the structure evolves

The repository grows through stages: problem definition → research and
validation → product discovery → product definition → architecture and system
design → implementation → testing → deployment → submission.

Build structure when a stage arrives, not before. Equally, reorganise when the
structure stops fitting the project — but only then. Do not move files for
aesthetics, do not nest deeply, and do not break existing links.

Repository hygiene is part of every task, not a separate cleanup job. Before
significant work, check what already exists so you build on it instead of
duplicating it. After, put the output where it belongs, update any index or
README that helps navigation, and remove duplication you introduced.

## Branches and commits

- Branch off `main`: `research/edge-inference`, `docs/threat-model`.
- Keep commits scoped to one change.
- Open a pull request rather than pushing to `main`, so a second person sees it.
- Pull `main` into your branch before asking for review.

### Commit message convention

Commit messages are checked automatically by commitlint via a husky `commit-msg`
hook. A message that does not match is rejected before the commit is created.

```
type(scope): subject
```

- **subject** in lowercase, no trailing full stop, whole header under 72 chars.
- **scope** optional, but useful — the area touched (`competitors`,
  `problem-space`, `roadmap`).

| Type | Use for |
| --- | --- |
| `research` | Research notes, findings, evidence |
| `docs` | Documentation, README, guides |
| `decision` | Architecture or product decision records |
| `planning` | Roadmap, scope, milestones, submission material |
| `assets` | Diagrams and screenshots |
| `chore` | Tooling, config, dependencies, housekeeping |
| `fix` | Correcting an error in existing content |
| `refactor` | Reorganising files without changing meaning |
| `revert` | Reverting an earlier commit |

Examples:

```
research(competitors): record vendor landscape findings
docs: clarify where research notes belong
decision(inference): record edge-vs-central choice
```

The hooks install themselves via the `prepare` script, so `npm install` once
after cloning and the check is active. Rules live in `commitlint.config.js`.

## Assets

Commit the editable source alongside any exported diagram, compress screenshots
before committing, and name files after what they show. Git keeps every version
of a binary forever — see [`assets/README.md`](assets/README.md).

## Secrets

Never commit credentials, API keys, tokens, or private datasets. `.gitignore`
covers the common cases, but check `git status` before committing rather than
relying on it. If something sensitive does get committed, say so immediately —
rotating it matters more than the embarrassment.
