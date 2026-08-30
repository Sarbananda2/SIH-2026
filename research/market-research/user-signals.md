# User signals

Last updated: 2026-08-31

Question: What do operators, installers, and buyers of CCTV/video-analytics
systems actually say goes wrong — and do those signals support or kill
assumptions 4 and 5 in
[`../problem-space/problem-analysis.md`](../problem-space/problem-analysis.md)?

Status: concluded (both target assumptions resolved)
Phase: 9 — listen to the market

This note gathers *evidence about users*, not vendor capability claims. For what
competing products do, see other notes in this directory.

---

## How to read the evidence tags

| Tag | Meaning | Weight |
| --- | --- | --- |
| `[ACADEMIC]` | Peer-reviewed study with a stated method | Strong |
| `[GOVT AUDIT]` | Government audit / inspector-general / legislature report | Strong |
| `[INDUSTRY REPORT]` | Trade survey or analyst work; note who paid for it | Medium |
| `[COMMUNITY SIGNAL: n]` | Practitioner forum or issue-tracker posts, n independent | Weak individually, meaningful in aggregate |
| `[ANECDOTE]` | A single unverified account | Weakest — illustrative only |
| `[UNVERIFIED CLAIM]` | Widely repeated but no locatable primary source | **Do not cite in the pitch** |

**Method note.** Reddit (r/cctv, r/securityguards, r/homedefense) was not
reachable from this environment — both the search index and direct API access
failed. Community signal below therefore comes from GitHub issue trackers and
IPVM practitioner discussions, which are attributable and countable. Reddit
remains an unsampled source; treat the community section as a floor, not a
ceiling.

---

## Pattern 1 — Monitoring capacity is staffed far below camera count

**The complaint:** camera estates grow; the people watching them do not. Feeds
per operator reach levels no research supports.

**Signals:**

- `[ACADEMIC]` Keval & Sasse studied 13 UK CCTV control rooms — 13 managers and
  38 operators, via structured observation and interview. Operator-to-camera
  ratios ranged from 16:100 down to **3:90**. They identify "too many cameras
  and too few operators" as a primary effectiveness limit, alongside poor
  configuration and lack of system integration.
  [Springer](https://link.springer.com/article/10.1057/palgrave.sj.8350092) ·
  [UCL open copy](https://discovery.ucl.ac.uk/id/eprint/19823/)
- `[GOVT AUDIT]` **The single strongest data point found.** DHS Office of
  Inspector General, *A Review of Remote Surveillance Technology Along U.S. Land
  Borders* (OIG-06-15, Dec 2005). At one Border Patrol location, **one** Law
  Enforcement Communication Assistant was simultaneously doing radio dispatch,
  processing sensor alerts, **and monitoring 32 cameras**. Another sector ran a
  24/7 operation with only eight such staff. Between Sept 2001 and Mar 2005
  field agents rose from 9,487 to 10,742 (+1,255) while monitoring positions
  *fell* from 244 to 241. A senior sector official is recorded saying he did not
  need more field agents until he got more monitoring staff to support them.
  [oig.dhs.gov](https://www.oig.dhs.gov/sites/default/files/assets/Mgmt/OIG_06-15_Dec05.pdf)
- `[GOVT AUDIT]` The same report: cameras lacked motion detection, so "illegal
  activity may go unnoticed unless [Border Patrol] personnel happen to be
  monitoring video terminals at the time an illegal crossing is in progress."
  The report concludes additional personnel were needed to perform video
  analysis and respond to detections.
- `[GOVT AUDIT]` GAO, Feb 2026, on northern-border technology: officials said
  they **prefer Remote Video Surveillance Systems least, specifically because
  they require people to watch the feeds**, and prefer autonomous alerting
  towers because they do not need continuous monitoring.
  [GAO-26-109195](https://files.gao.gov/reports/GAO-26-109195/index.html) ·
  [GAO-26-107501](https://files.gao.gov/reports/GAO-26-107501/index.html)
- `[COMMUNITY SIGNAL: ~12]` IPVM practitioner thread on monitoring
  effectiveness. Reported real-world limits: a big-box retailer capping
  operators at 16 views for no more than 2 hours; a court complex with 1,800
  cameras staffed by 20–30 operators on 1-hour viewing limits; a nuclear
  facility capping viewing at a few hours.
  [ipvm.com](https://ipvm.com/discussions/video-operator-viewing-effectiveness)

**Who is affected:** control-room operators and dispatchers first; commanders
second, because their picture is only as good as what got noticed.

**Current workaround:** rotation and time-capping (retail, courts, nuclear
above); assigning field agents to communications centres as overflow; accepting
that most feeds are recorded-only and reviewed forensically.

**Opportunity:** the product's job is to cut *feeds requiring attention*, not to
add detection capability. A system that raises the number of things an operator
must look at has made the problem worse even if every detection is correct.

---

## Pattern 2 — Detection performance falls as simultaneous feeds rise

**The complaint:** operators cannot search many tiled feeds at once.

**Signals:**

- `[ACADEMIC]` Tickner & Poulton (1973), *Ergonomics* 16:381–401, monitoring up
  to 16 synthetic TV pictures. Detection accuracy for suspicious events fell
  with feed count: ~83% at 4 monitors, ~84% at 9, **64% at 16**. This is the
  origin of the long-standing guideline that one operator should watch no more
  than 16 feeds, reduced to 9 if the scenes contain considerable movement.
  Summarised and cited in Tatler (2021), *Cognitive Research: Principles and
  Implications* — [PMC7892658](https://pmc.ncbi.nlm.nih.gov/articles/PMC7892658/)
- `[ACADEMIC]` Stainer, Scott-Brown & Tatler, *Security Journal* (2011), on
  screen layout and task complexity in simulated multiplexed CCTV — increased
  surveillance demand from multiple cameras promotes poor detection
  performance. [Springer](https://link.springer.com/article/10.1057/sj.2010.7)
- `[ACADEMIC]` Keval & Sasse also report that operators typically scan feeds
  **at random rather than with a strategy**, so events are missed structurally,
  not just through inattention. (Cited in De Bruyne et al. below.)
- `[UNVERIFIED CLAIM]` The much-quoted "detection drops from 85% on one screen
  to 45% on nine screens" circulates widely without a traceable primary study.
  It is *directionally* consistent with Tickner & Poulton but the specific
  numbers should not be used. Cite Tickner & Poulton instead.

**Opportunity:** the intervention with the best evidence behind it is reducing
*concurrent* feeds demanding attention — cueing one stream forward rather than
tiling forty.

---

## Pattern 3 — The "operators go blind after 22 minutes" statistic is not real

This pattern **partially contradicts** the naive version of assumption 4, and
matters because the team will be tempted to use these numbers in a pitch deck.

**Signals:**

- `[UNVERIFIED CLAIM]` "After 12 minutes an operator misses up to 45% of
  activity; after 22 minutes, up to 95%." Attributed to a 2002 *Security Oz*
  magazine piece; the original is not retrievable. IPVM's founder and a
  manufacturer both state on the record that they searched for and could not
  find the underlying controlled study.
  [ipvm.com](https://ipvm.com/discussions/study-available-on-effectiveness-of-live-guard-monitoring)
  **Do not cite this figure.**
- `[ACADEMIC]` Donald, Donald & Thatcher (2015), *Applied Ergonomics*
  47:220–228. 42 **full-time working CCTV operators** watched a 90-minute video
  detecting four target behaviour types. **No vigilance decrement was found for
  the sample as a whole.** Novices and generalists declined; experienced
  specialists did not.
  [PubMed](https://pubmed.ncbi.nlm.nih.gov/25479991/) ·
  [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0003687014001847)
- `[INDUSTRY REPORT]` Craig Donald (co-author of the above), March 2015, argues
  explicitly that the 20–30 minute concentration limit has been misapplied by
  video-analytics marketers; in his trials some operators performed *better* in
  the final 30 minutes than the middle 30. He locates effectiveness in operator
  selection, experience, and management support rather than in a time limit.
  [securitysa.com](http://www.securitysa.com/8289a)
- `[ACADEMIC]` Earlier work is not uniformly negative either: Tickner & Poulton
  found decrements in a two-hour task but **not** in a one-hour task.

**Reading.** Time-on-task decay is real for untrained people but is *not* the
binding constraint for trained specialists. The constraint that survives
scrutiny is **structural** — feeds per operator and staffing ratio — not
**temporal**. This sharpens assumption 4 rather than killing it, but it changes
which claim we are allowed to make.

---

## Pattern 4 — False alarms dominate real perimeter/border deployments

**The complaint:** alerts fire constantly on animals, weather, vegetation, light
and traffic; responders are dispatched to nothing.

**Signals:**

- `[GOVT AUDIT]` DHS OIG-06-15 again, and this is the closest analogue to our
  problem statement that exists: on the US ISIS border sensor programme,
  **"more than 90 percent of the responses to sensor alerts resulted in 'false
  alarms'"**, and across both borders "90 percent or more were false alarms."
  Agents "spent many hours investigating legitimate activities." The report
  concludes the technology "yielded few apprehensions as a percentage of
  detection, resulted in needless investigations of legitimate activity, and
  consumed valuable staff time."
  [oig.dhs.gov](https://www.oig.dhs.gov/sites/default/files/assets/Mgmt/OIG_06-15_Dec05.pdf)
- `[INDUSTRY REPORT]` MP-IDSA issue brief on CIBMS (Meena Singh Roy, 2017)
  reports that for ISIS and its successor American Shield Initiative — $439M
  spent, both abandoned — **90% of sensor alerts were false alarms; only 2% of
  alerts on the Mexican border resulted in apprehension, under 1% on the
  Canadian border.** It draws the parallel to CIBMS explicitly and notes ISIS
  was "severely undermanned, especially in monitoring the output of the
  surveillance system."
  [idsa.in](https://www.idsa.in/system/files/issuebrief/ib_comprehensive-integrated-border-management-system_pdas.pdf)
- `[INDUSTRY REPORT]` The same brief lists the BSF's own stated shortcomings of
  the pre-CIBMS Jammu system: equipment failing in adverse climatic conditions;
  gaps at rivers and nullahs; **being manpower-intensive it failed to give BSF
  troops rest and relief**; and it was not integrated, so no common operating
  picture existed at any level.
- `[GOVT AUDIT]` DHS's own 2010 SBInet assessment found "a large number of false
  alarms, line of sight constraints, unreliable information transmission, and
  equipment malfunction" after $1.4bn of cost escalation; the programme was
  cancelled. (Via MP-IDSA above and
  [EFF's history of border towers](https://www.eff.org/deeplinks/2024/10/us-border-surveillance-towers-have-always-been-broken),
  Dave Maass, Oct 2024.)
- `[ACADEMIC]` RAND / Homeland Security Operational Analysis Center found
  Integrated Fixed Tower deployment **associated with *decreased* apprehensions**
  in deployment zones — the authors read this as possible deterrence, but a
  Border Patrol official's alternative explanation is that people simply walk
  around the towers. [RAND RR4348](https://www.rand.org/pubs/research_reports/RR4348.html)
- `[INDUSTRY REPORT]` Outside the border domain, the false-alarm base rate for
  monitored intrusion alarms is 94–99% depending on jurisdiction, per the ASU
  Center for Problem-Oriented Policing guide *False Burglar Alarms*; false
  alarms are the highest-volume call type for many US police agencies.
  [popcenter.asu.edu](https://popcenter.asu.edu/content/false-burglar-alarms-2nd-edition-0)

**Who is affected:** response and patrol teams pay the cost directly;
commanders lose confidence in the system; operators learn to discount it.

**Current workaround:** non-response policies (some US cities no longer dispatch
on unverified alarms at all); manual verification before dispatch; disabling
analytics entirely.

---

## Pattern 5 — Analytics degrade after handover, and outdoors specifically

**The complaint:** systems that pass acceptance testing become unusable weeks
later as conditions change.

**Signals:**

- `[INDUSTRY REPORT]` IPVM's *Do Video Analytics Work?* (Sept 2008), based on
  interviews with 100+ industry professionals including a dozen analytics
  manufacturers, concludes analytics work inconsistently and that "most
  manufacturers overestimate how well analytics work." Crucially it identifies a
  **standards mismatch**: a manufacturer counts perimeter analytics as working
  if a line-cross fires at all, while security managers demand something like
  **no more than 3 false alarms per day across many cameras in all weather and
  lighting**. [ipvm.com](https://ipvm.com/reports/do-video-analytics-work)
- `[COMMUNITY SIGNAL: 7]` IPVM discussion on specifying false-alarm rates
  contractually. Practitioners could cite **no formal published standard or
  benchmark**. Proposed figures were ~1 alert/week or ~1/month per camera, with
  the immediate objection that 100 cameras × 1/week = 5,200 operator actions per
  year. Multiple integrators note systems "deteriorate over time," sometimes
  rapidly, as the environment changes; one recommends splitting RFPs into
  installation and ongoing-maintenance sections for this reason. One commenter
  (Robert Baxter) dissents and prioritises misses over false positives — recorded
  here for balance.
  [ipvm.com](https://ipvm.com/discussions/end-user-how-do-i-specify-video-analytics-performance-false-alarm-rate)
- `[COMMUNITY SIGNAL: 9]` IPVM thread on Hikvision NVR analytics: line-crossing
  and intrusion boxes described as useless outdoors because there is no
  intelligent filtering of pixel changes; headlights and cloud cover trigger
  alerts. Analytics "perform reliably indoors but struggle in outdoor
  conditions." Workarounds offered: thermal cameras, external PIR sensors,
  combining line-crossing with motion, conservative trial-and-error tuning.
  [ipvm.com](https://ipvm.com/discussions/struggling-with-video-analytics-on-hikvision-nvrs-member-email)
- `[INDUSTRY REPORT — vendor-commissioned, discount accordingly]` NW Security
  study of 152 UK video-security decision-makers, May 2021: over 9 in 10
  medium/large English businesses reported too many false alerts from
  analytics-capable CCTV. Causes cited: camera location/positioning 39%, poor
  lighting of the field of view 29%, incorrectly specified or configured
  analytics software 27%.
  [IFSEC Insider](https://www.ifsecglobal.com/video-surveillance/93-of-firms-reporting-excess-of-cctv-false-alarms-linked-to-poor-installation-or-maintenance/) ·
  [SourceSecurity](https://www.sourcesecurity.com/news/nw-security-report-study-businesses-video-analytics-security-co-1616084459-ga.1639469603.html)

**Opportunity:** post-deployment drift is a first-class product requirement, not
a support issue. Whatever we build needs per-site tuning, feedback capture, and
a way to measure its own false-alarm rate in production. Note also that the
dominant reported causes are **siting and lighting**, not model quality — which
is consistent with assumptions 1 and 2 and with the "existing infrastructure"
constraint.

---

## Pattern 6 — Open-source operators overwhelmingly debug false positives

This is the most directly countable signal available, and it is a reasonable
proxy for what self-hosting operators actually spend their time on.

GitHub issue + discussion counts, `blakeblackshear/frigate` (the largest
open-source video-analytics NVR), queried 2026-08-31 via the GitHub search API:

| Query | Count |
| --- | --- |
| `"false positive"` | **619** |
| `"false negative"` | 69 |
| `"missed detection"` | 29 |

`[COMMUNITY SIGNAL: 619 vs 98]` — roughly **6:1** in favour of false positives
over both miss-related phrasings combined. `ZoneMinder/zoneminder` returns 33
for false alarm/positive.

Representative threads and the workarounds in them:

- Frigate+ user reporting ~200 false positives in 783 images — phantom people,
  cats, cars and packages off stationary garden furniture. Resolution offered:
  raise `min_score` and `threshold`.
  [#11296](https://github.com/blakeblackshear/frigate/discussions/11296)
- Users receiving daily person-detection notifications that are false on
  inspection, because MQTT publishes at `min_score` while the UI applies the
  higher `threshold`. Fix: raise `min_score` toward `threshold` — i.e. **trade
  recall away to stop the noise**.
- Rain and snow on the lens generating detections.
  [#20391](https://github.com/blakeblackshear/frigate/discussions/20391) ·
  [#15407](https://github.com/blakeblackshear/frigate/discussions/15407) ·
  [#6233](https://github.com/blakeblackshear/frigate/issues/6233)
- Third-party tooling exists **specifically to suppress alert volume** —
  `frigate-notify` ships cooldowns, zone limiting and time-based silencing.
  That a suppression layer is a popular separate project is itself the signal.
  [github.com/0x2142/frigate-notify](https://github.com/0x2142/frigate-notify)

**Important caveat, stated plainly.** This count is biased. A false positive is
visible and reportable; a missed detection is by definition not observed, so it
cannot be filed as an issue. The ratio measures *what users can see and complain
about*, not the true error distribution. It is strong evidence about **operator
experience and workload**, and only weak evidence about which error type is more
frequent. Pattern 4's audit data, which counts dispatched responses rather than
complaints, is what carries the real weight for assumption 5.

---

## Pattern 7 — Automation that cries wolf is worse than no automation

This is the mechanism that connects patterns 4–6 to product risk, and it is the
best-established finding in this whole note.

- `[ACADEMIC]` Wickens & Dixon (2007), *Theoretical Issues in Ergonomics
  Science* 8(3) — a synthesis of 20 studies yielding 35 data points comparing
  aided performance against an unaided baseline. **Reliability of ~0.70 is the
  crossover point below which unreliable automation is worse than no automation
  at all.** Benefit is a strong linear function of reliability above it.
  [Taylor & Francis](https://www.tandfonline.com/doi/abs/10.1080/14639220500370105) ·
  [Semantic Scholar](https://www.semanticscholar.org/paper/cce1f8f253b06bc261d5823b3887f2b4366a7711)
- `[ACADEMIC]` Dixon, Wickens & McCarley (2007), *Human Factors* 49(4):564–572.
  **False-alarm-prone automation hurt overall performance more than miss-prone
  automation.** False alarms damaged both compliance (acting on alerts) *and*
  reliance (trusting the unalerted state); misses damaged only reliance.
  [PubMed](https://pubmed.ncbi.nlm.nih.gov/17702209/) ·
  [Sage](https://journals.sagepub.com/doi/10.1518/001872007X215656) ·
  [DTIC full text](https://apps.dtic.mil/sti/tr/pdf/ADA496817.pdf)
- `[ACADEMIC]` De Bruyne et al., *Displays* (2023), "I spy with my AI" — 31
  participants in a VR control room with six streams, with and without AI visual
  cueing, under manipulated cognitive load. AI cueing **significantly improved
  true-negative rate** (p = 0.046) — i.e. operators made fewer false-positive
  *judgements* — and significantly reduced cognitive load on both NASA-TLX and
  pupil size. Notably, **true-positive rate did not improve** (p = 0.986). The
  authors suggest six streams was too few to show a sensitivity benefit.
  [UGent open copy](https://backoffice.biblio.ugent.be/download/01GWVF9PPZFMTTMZM17YDB824B/01GX30X8HSA15JFTY7824CTJSK) ·
  [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0169814123000367)
- `[ACADEMIC]` Dadashi et al. (2013), *Applied Ergonomics*, on semi-automated
  CCTV: **communicating system confidence honestly** (high-confidence colour for
  hits, low for false positives) reduced reported load and increased spare
  mental capacity. Unreliable confidence signalling removed the benefit.
  [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0003687012000695)

**Opportunity — the sharpest one in this note.** Wickens & Dixon give a
defensible design target, and Dadashi gives a cheap mitigation: an honest,
calibrated confidence signal is worth more than a marginally better model. This
argues for the platform surfacing per-alert confidence and its own measured
precision, rather than a binary alarm.

---

## What we looked for and did not find

Recording these so nobody re-runs the same searches.

- **No published false-alarm-rate standard for video analytics.** No threshold
  in EN 50131 / PD 6662 / EN 50132 applicable to analytics precision was found;
  those standards govern intruder alarm system design, installation and grading,
  not analytics performance. IPVM practitioners independently confirm no
  benchmark exists. Acceptance criteria are negotiated per contract. **This is a
  gap we could turn into a differentiator** by shipping a measured, reportable
  precision figure.
- **No Indian-force operational data.** No public figure for BSF feeds per
  operator, control-room staffing, or CIBMS false-alarm rate was located. MHA
  and PIB material on CIBMS/BOLD-QIT is announcement-grade only. The
  `[EVIDENCE NEEDED]` marker in problem-analysis §2 stands. The US border
  programmes are the closest available proxy and must be labelled as a proxy.
- **No firsthand accounts from border-force personnel.** Nothing usable was
  found. The BSF-attributed shortcomings in Pattern 4 come via MP-IDSA, not
  from personnel directly.
- **Reddit unsampled** — see method note at the top.

---

## Verdicts

### Assumption 4 (attention is the binding constraint): **SUPPORTED**

Supported, but with a required correction to *why*.

Supporting: DHS OIG documents one person dispatching, processing sensor alerts
and watching 32 cameras at once, monitoring posts falling while field agents
rose by 1,255, and a senior commander stating he needed monitoring staff before
he needed more agents — that is the assumption stated almost verbatim by an
operator of a border surveillance system. GAO 2026 records border officials
preferring the technology that does *not* require watching. Keval & Sasse
measure ratios as bad as 3 operators per 90 cameras across 13 real control
rooms. Tickner & Poulton show detection falling to 64% at 16 feeds. The
mechanism is corroborated at three independent levels: audit, field study, and
lab.

Correcting: the popular framing — operators go blind after 20 minutes — is not
supported. Donald et al. (2015) found **no** vigilance decrement across 42
working operators as a whole, and the "12 min / 22 min" statistic has no
locatable source. **The constraint is structural (feeds per operator, staffing
ratio), not temporal (time on task).** If the team pitches vigilance decay, a
judge who knows the literature can dismantle it; if the team pitches
feeds-per-operator, the evidence holds. Rewrite the claim accordingly.

The deeper form of the assumption — that adding cameras without adding
analytical capacity makes things worse — is directly evidenced: RAND found fixed
towers associated with *decreased* apprehensions, and DHS OIG found non-ISIS
detection (people simply noticing things) as effective per ticket as the camera
system.

### Assumption 5 (false positives are the primary failure mode): **SUPPORTED**

Supported, and it is the better-evidenced of the two.

Supporting: DHS OIG measured **>90% of responses to sensor alerts as false
alarms** on the closest analogue programme to this problem statement, with
agents spending many hours investigating legitimate activity; ISIS/ASI recorded
2% and <1% apprehension-per-alert on the Mexican and Canadian borders. SBInet
was cancelled with false alarms named first among its defects. Monitored
intrusion alarms run 94–99% false industry-wide. Frigate's tracker carries
false-positive discussion at ~6:1 over miss-related terms. IPVM's 2008
synthesis identifies exactly the failure mode assumed here — vendors declaring
success at a threshold customers consider unusable.

The mechanism is established rather than merely observed: Dixon, Wickens &
McCarley show false-alarm-prone automation damages performance *more* than
miss-prone automation, and damages both compliance and reliance; Wickens & Dixon
put a number on when automation becomes a net negative (~0.70 reliability). This
is what converts "false positives are annoying" into "false positives are the
failure mode" — an imprecise system does not merely underperform, it makes the
operator worse than they were unaided.

Caveats we must carry honestly:

1. The Frigate ratio is **observation-biased** — misses are unobservable and
   therefore unreportable. It evidences operator burden, not true error
   distribution. Do not present it as an error-rate measurement.
2. There is a genuine dissenting position: at least one IPVM practitioner
   prioritises misses over false positives, and in a border security context a
   single missed infiltration can outweigh a year of false alarms in
   consequence. The correct framing is **precision at a fixed, adequate recall**
   — not precision maximisation. Do not let this become an argument for a system
   that is quiet because it detects nothing.
3. Reported causes skew toward siting, lighting and configuration rather than
   model quality (NW Security; IPVM Hikvision thread). Precision is largely won
   in deployment and tuning, not in the model.

**Net effect on the project.** Both assumptions survive. Assumption 4's stated
*reasoning* needs correcting from vigilance decay to feeds-per-operator, and
problem-analysis §3 ("late in long shifts, when vigilance has decayed") should
be softened. The candidate root cause in problem-analysis §4 — that the hard
part is *trustworthy triage*, not recognition — is substantiated by Pattern 7
and should be promoted from `[INFERRED]` to evidenced, with Wickens & Dixon's
0.70 crossover as a citable design target.
