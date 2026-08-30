# Research

Research notes for the project. Keep findings here rather than in chat threads
or personal files — this directory is the team's shared memory.

## Categories

| Directory | What belongs here |
| --- | --- |
| [`problem-space/`](problem-space/) | The problem statement itself, domain background, constraints, stakeholders, field realities |
| [`technical-research/`](technical-research/) | Evaluations of models, libraries, hardware, protocols, and approaches we might build on |
| [`market-research/`](market-research/) | Existing products and deployed systems solving adjacent problems, and where they fall short |
| [`findings/`](findings/) | Short synthesised conclusions that other documents and decisions can cite |

Add a category only when you have something real to put in it. An empty
directory is worse than no directory.

## How to write a research note

One question per file, named after the question:
`technical-research/on-device-vs-server-inference.md`.

Start each file with a short header so a teammate can judge relevance in five
seconds:

```markdown
# On-device vs server inference

Question: Where should detection run given intermittent connectivity?
Status: in progress | concluded | abandoned
Last updated: 2026-08-30
Author: <name>
```

Then the body: what you looked at, what you found, what you concluded, and the
sources. **Always record sources** — a claim without a link cannot be checked by
anyone else, and unverifiable claims are a liability in a judged submission.

When a note reaches a conclusion the team will build on, write a short summary
in [`findings/`](findings/) and link back to the detailed note. When a
conclusion changes what we build, record it as a decision in
[`../docs/decisions/`](../docs/decisions/).
