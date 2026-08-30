# Decisions

Architecture Decision Records (ADRs). One file per decision that was hard to
make, expensive to reverse, or likely to be questioned later.

Record a decision when someone would reasonably ask "why is it built this way?".
Do not record routine choices.

## Naming

`NNNN-short-title.md`, numbered sequentially and never reused:
`0002-detection-runs-on-device.md`.

## Template

```markdown
# NNNN. Title

Date: YYYY-MM-DD
Status: proposed | accepted | superseded by [NNNN](NNNN-....md)

## Context
What forced a decision. Constraints, requirements, what we knew at the time.

## Decision
What we are doing, stated plainly.

## Consequences
What this makes easy, what it makes hard, and what we accept as a cost.

## Alternatives considered
What else was on the table and why it lost.
```

Superseding a decision means adding a new record and marking the old one
superseded. Never rewrite history in an accepted ADR — the reasoning at the time
is the point.
