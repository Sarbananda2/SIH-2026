# Problem Analysis

Our reading of [`problem-statement.md`](problem-statement.md). This is
interpretation, not official text — where the two disagree, the statement wins.

Status: **partially overturned by Phase 3 evidence — read the banner below**
Last updated: 2026-08-31

> ## ⚠ What the evidence overturned
>
> Phase 3 research contradicted several assumptions in this document. The
> original reasoning is preserved below so the change is traceable, but do not
> build on it without reading this first. Evidence:
> [`domain-context.md`](domain-context.md),
> [`../market-research/user-signals.md`](../market-research/user-signals.md),
> [`../technical-research/video-analytics-feasibility.md`](../technical-research/video-analytics-feasibility.md).
>
> 1. **The border may be open, not fenced.** The sponsoring department appears
>    to be SSB, which guards the India–Nepal and India–Bhutan borders — crossed
>    lawfully every day. "Any human is an intruder" would be the wrong model.
>    *Unconfirmed — see [`problem-statement.md`](problem-statement.md).*
> 2. **The stated pain is cost, not attention.** The description reportedly
>    leads with eliminating dependence on expensive dedicated surveillance
>    hardware. Our attention-bottleneck framing may be our problem, not theirs.
> 3. **Power, not bandwidth, is the binding physical constraint.** A Standing
>    Committee found 328 SSB outposts with no electricity connection, and 308 of
>    734 without road access. Assumption 3 below is aimed at the wrong resource.
> 4. **The dominant failure mode is missing entirely: feeds that never arrive.**
>    CAG Report 15 of 2020 found 32–45% of Delhi Police cameras non-functional,
>    and only 22–48% of C4i-linked cameras monitorable. A camera that is down
>    beats any false-positive problem.
> 5. **Models do not survive a change of scene.** A cross-dataset audit found
>    AUC falling from 0.704 to 0.499 — chance — across scenes. Per-camera
>    calibration is not optional.
>
> What survived: **assumption 4 (attention)** — CAG documents one official
> monitoring ~60 cameras, called unworkable by the auditor — and **assumption 5
> (false positives)**, the best-supported claim we have.

## Confidence markers

Every non-obvious claim below is tagged. Nothing here has been validated against
an external source; that is Phase 3's job.

| Tag | Meaning |
| --- | --- |
| `[STATED]` | Follows directly from the problem statement title |
| `[INFERRED]` | Logical consequence of `[STATED]` items; defensible but unverified |
| `[ASSUMED]` | Domain reasoning only. Could be wrong. Must be validated or killed |
| `[EVIDENCE NEEDED]` | Cannot be resolved by reasoning. Requires a source |

## The problem in one sentence

Cameras have already been deployed at border sites, but the capacity to *watch*
them has not scaled with them — so footage is used to reconstruct incidents
afterwards rather than to intervene during them. `[INFERRED]`

## What the statement commits us to

| Phrase | What it commits us to |
| --- | --- |
| "using existing CCTV infrastructure" | The input is whatever cameras are already deployed. Specifying our own hardware is out of scope. `[STATED]` |
| "video analytics platform" | The deliverable is a platform over video streams, not a single detection model. `[STATED]` |
| "AI-based" / "intelligent" | Automated interpretation of the feed, not tooling that still needs a human watching. `[STATED]` |
| "border surveillance" | The deployment context and its constraints are the operating environment. `[STATED]` |

The first row is the sharpest constraint and the likeliest source of
differentiation. A solution that assumes clean, modern, high-bandwidth cameras
has not answered this problem statement.

---

# Phase 1 — Deconstruction

## 1. The problem

**Visible symptom:** incidents on camera are noticed late or not at all.

**Underlying problem:** surveillance capacity is bounded by *human attention*,
not by camera coverage. `[INFERRED]` Adding cameras without adding analytical
capacity makes this worse, not better — each additional feed dilutes the
attention available to every other feed.

This distinction matters more than it first appears. If the problem were
coverage, the answer would be more cameras. The problem statement explicitly
rules that out by fixing the camera estate as given — which implies the gap is
in **utilisation of footage already being captured**, not in capturing more.
`[INFERRED]`

**The deeper reading:** money has already been spent on coverage; the value of
that spend is not being realised. A problem statement asking for analytics *on
existing infrastructure* is, in effect, a statement about stranded capital
assets. `[INFERRED]`

**Symptom vs. root cause:** "we need AI on the video" is a proposed *solution*
to the symptom. The root cause is that the monitoring model does not scale with
camera count. Any product that reduces feeds-to-watch without producing
trustworthy output has moved the bottleneck rather than removed it.

## 2. The people

| Who | Relationship to the problem |
| --- | --- |
| Control-room operator / sentry | Feels it most severely — watches more feeds than any person can attend to `[ASSUMED]` |
| Shift supervisor / post commander | Must decide what to respond to, with incomplete picture `[ASSUMED]` |
| Response / patrol teams | Act on alerts; pay the cost of false alarms in wasted deployment `[ASSUMED]` |
| Investigators / analysts | Use footage forensically after an incident `[ASSUMED]` |
| Procuring authority | Funds the system; judged on outcomes, not on camera count `[ASSUMED]` |
| Border-area residents | Indirectly affected by both incidents and false accusations `[ASSUMED]` |

**Who benefits most if solved:** the operator, whose job becomes tractable, and
the commander, whose decisions get better inputs. `[INFERRED]`

**Who would pay:** this is a **government procurement context, not a consumer or
SaaS market.** `[INFERRED]` That has consequences we must carry into later
phases — buyer and user are different people, procurement cycles are long,
and "willingness to pay" is not the right validation lens.

**`[EVIDENCE NEEDED]`** Which force or agency actually operates these cameras,
how many feeds one operator is responsible for, and what their current workflow
is. Everything in this section is structural reasoning until that is sourced.

## 3. The context

**Where:** border outposts and the control rooms aggregating their feeds.
`[INFERRED]`

**When:** continuously. The problem does not have an off period, which is itself
significant — sustained vigilance is precisely what humans do worst. `[INFERRED]`

**When it becomes severe** `[ASSUMED]`:

- Night and low light — when both camera performance and human alertness fall
- Adverse weather: fog, dust, rain, heat shimmer
- Late in long shifts, when vigilance has decayed
- As feed count per operator rises
- When bandwidth degrades and feeds drop or stutter

**Surrounding systems:** existing CCTV and whatever VMS records it; possibly
thermal, radar, or ground sensors; communications to response teams; command and
reporting chains; evidence handling. `[ASSUMED]` A new platform has to live
inside this, not replace it — which is a strong argument that **integration
capability matters more than model accuracy.** `[INFERRED]`

## 4. The cause

Why are incidents missed? Working the chain down:

1. **Because nobody was watching that feed at that moment.**
2. Why? Because feeds outnumber operators. `[INFERRED]`
3. Why? Because camera coverage was expanded without proportionally expanding
   monitoring capacity — cameras are cheap to add, trained attention is not.
   `[ASSUMED]`
4. Why hasn't attention been automated already? Candidate causes, none yet
   verified `[EVIDENCE NEEDED]`:
   - Cost of commercial video analytics at scale
   - Difficulty integrating with heterogeneous, legacy, non-standard cameras
   - Bandwidth insufficient to move video to where compute lives
   - False-positive rates high enough that operators stop trusting alerts
   - Procurement and accreditation cycles slower than the technology
   - Analytics tuned on clean datasets failing on degraded real-world feeds

**Candidate root cause:** the bottleneck is not detection *capability* — object
detection is a solved research problem — but **trustworthy triage**: converting
continuous video into a small number of high-confidence, actionable events that
an operator will keep believing. `[INFERRED]`

If Phase 3 substantiates this, it reframes the product: the hard part is
precision and operator trust, not recognition.

## 5. The impact

Categories that plausibly apply:

- **Security consequences** — missed or late detection of the events the system
  exists to catch. Primary. `[INFERRED]`
- **Operational inefficiency** — attention spent on empty frames; response teams
  deployed on false alarms. `[INFERRED]`
- **Stranded investment** — capital already spent on cameras returning less than
  it could. `[INFERRED]`
- **Human cost of the work itself** — sustained monitoring is fatiguing and
  low-yield. `[ASSUMED]`

Categories that do **not** obviously apply and should not be padded into the
case: environmental impact, revenue loss, customer churn.

**`[EVIDENCE NEEDED]` — everything quantitative.** We have no figures for
incident rates, missed-detection rates, response times, operator-to-feed ratios,
or budgets. Any number in a pitch deck must come from a citable source, not from
this document.

---

## Working assumptions to validate or kill

Each is inference, not fact. Phase 3 must resolve each one; survivors that shape
the build become ADRs in [`../../docs/decisions/`](../../docs/decisions/).

| # | Assumption | If wrong, what changes |
| --- | --- | --- |
| 1 | The camera estate is heterogeneous — mixed vendors, ages, resolutions | Integration stops being the hard part |
| 2 | Video quality is poor by ML-benchmark standards | Off-the-shelf models become viable and differentiation collapses |
| 3 | Bandwidth to any central point is constrained | Centralised cloud inference becomes viable |
| 4 | Operator attention, not camera coverage, is the binding constraint | The whole framing above is wrong |
| 5 | False positives are the primary failure mode | Optimising for precision is the wrong priority |

Assumption 5 is the one most likely to decide whether this succeeds. Assumption
4 is the one whose failure would invalidate the most work — it should be tested
first.

## What the statement does not say

Unknowns, not assumptions. Answers come from the official description or Phase 3:

- Camera types, resolutions, codecs, and stream protocols actually in use
- Connectivity and compute on site — edge, control room, or central?
- Which events must be detected, and what is worth alerting on
- Who operates the system and what they do with an alert
- Retention, evidence-handling, chain-of-custody, and audit requirements
- Scale: cameras per site, sites per deployment

## Scope

**In scope:** ingesting existing camera feeds; automated interpretation;
surfacing events to an operator; the platform around that.

**Out of scope:** specifying or procuring camera hardware; replacing existing
infrastructure.

**Undecided pending the full description:** where inference runs; cross-camera
tracking; forensic search over recorded footage.

## What Phase 3 must answer

1. What is actually deployed at border sites today, and with what limitations?
2. Who operates it, at what feed-to-operator ratio, with what workflow?
3. Which detection tasks carry real operational value, ranked?
4. What accuracy and latency make this useful rather than ignorable?
5. What already exists commercially, in open source, and in prior work — and
   where does it fall short? — [`../market-research/`](../market-research/)
6. Can assumptions 1–5 above be substantiated?

Conclusions go to [`../findings/`](../findings/).
