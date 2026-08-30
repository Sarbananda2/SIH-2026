# Evidence Synthesis

What the Phase 3 research settled, and what it changed. Two-minute read; every
claim links to the detailed note it came from.

Last updated: 2026-08-31
Status: provisional — one blocking verification outstanding

## The blocking question

**Is the sponsoring department SSB?** Third-party mirrors say yes; sih.gov.in is
unconfirmed. If yes, the customer guards the **open, unfenced** India–Nepal and
India–Bhutan borders, where people cross lawfully every day — and a
fenced-perimeter intrusion product is aimed at the wrong problem. Nothing below
should be treated as decided until someone checks the portal.
→ [`../problem-space/problem-statement.md`](../problem-space/problem-statement.md)

## What the evidence established

| Finding | Strength | Source |
| --- | --- | --- |
| One official monitors ~60 cameras; the auditor called it unworkable | Official audit | [domain-context](../problem-space/domain-context.md) |
| 32–45% of Delhi Police cameras non-functional; 22–48% of C4i cameras monitorable | Official audit (CAG 15/2020) | [domain-context](../problem-space/domain-context.md) |
| 328 SSB outposts have no electricity; 308 of 734 lack road access | Standing Committee | [domain-context](../problem-space/domain-context.md) |
| CIBMS stalled at 71 km of a planned 1,955 km | Consistent across PIB, Rajya Sabha, MHA annual report | [domain-context](../problem-space/domain-context.md) |
| >90% of US border sensor alerts were false; 2% led to apprehension | Govt audit (DHS OIG) | [user-signals](../market-research/user-signals.md) |
| Below ~0.70 reliability, automation is worse than none | Academic synthesis, 20 studies | [user-signals](../market-research/user-signals.md) |
| False-alarm-prone automation harms operators more than miss-prone | Academic | [user-signals](../market-research/user-signals.md) |
| Detection AUC falls 0.704 → 0.499 (chance) across scenes | Cross-dataset audit | [feasibility](../technical-research/video-analytics-feasibility.md) |
| "AI over existing cameras" is already a shipping Indian product category | Verified vendors | [competitors](../market-research/competitor-landscape.md) |

## Two myths we must not repeat

Both are widely quoted in this space and **neither has a primary source**:

- "Operators go blind after 22 minutes" — unsourceable; Donald et al. (2015)
  found *no* vigilance decrement in 42 working operators.
- "45% missed after 12 minutes" — unsourceable; the citable Sandia/NIJ figure is
  30–60 minutes.

The real constraint is **structural (feeds per operator), not temporal.** Using
either myth in the pitch is an avoidable way to lose credibility with a judge.

## Where the market is already strong

Do not compete here. **Awiros** (Gurugram, ~100 apps, deployed across seven
Indian smart cities including ~7,000 cameras in Bengaluru), **Videonetics**
(ONVIF Profile S/G/T/Q, markets on "no rip-and-replace"), and **Staqu** (analog,
IP and PTZ; eleven state police forces) already sell AI analytics over existing
cameras. Building that is not differentiation — it is entering a funded,
deployed category late.
→ [`../market-research/competitor-landscape.md`](../market-research/competitor-landscape.md)

## The gap

Every vendor publishes accuracy. **None publishes an operating envelope** — how
performance degrades with pixel density, fog, dust, or night. Combined with the
generalisation collapse and the >90% false-alarm history, the underserved need
is not better detection. It is **knowing, per camera, whether detection can be
trusted at all** — and saying so honestly.

Concrete and buildable: per-camera capability assessment at onboarding using
**DORI pixel density** (25 px/m detection floor, IEC 62676-4). It answers "using
existing CCTV infrastructure" directly, and no competitor does it.

## Working product direction

Trustworthy triage with honest per-camera calibration — not better detection.
Three independent research threads converged on this. It is a **hypothesis to be
attacked in Phase 12**, not a decision.

**It has a serious open weakness:** if the department really is SSB with open
borders and a stated pain of *cost*, then calibration-and-trust may still be the
wrong pitch, and identity-at-checkpoint (face, ANPR, vehicle classification) may
be what is actually wanted. Resolve the blocking question first.

## Implementation constraint worth carrying forward

Ultralytics YOLO is **AGPL-3.0** — a real problem for government deployment.
RT-DETR and RF-DETR are Apache-2.0 and comparable.
→ [`../technical-research/video-analytics-feasibility.md`](../technical-research/video-analytics-feasibility.md)
