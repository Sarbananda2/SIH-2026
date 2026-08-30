# Domain Context

Question: How is Indian border video surveillance actually done today, by whom,
at what scale, with what track record — and does the evidence support the
assumptions in [`problem-analysis.md`](problem-analysis.md)?

Status: concluded (Phase 3 problem validation)
Last updated: 2026-08-31

## Confidence and sourcing

Every factual claim below carries an inline source link. Nothing is asserted
without one. Claims are tagged:

| Tag | Meaning |
| --- | --- |
| `[VERIFIED]` | Two or more independent sources, at least one official |
| `[SINGLE SOURCE]` | One source only. Treat as indicative, not settled |
| `[NOT FOUND]` | Searched for and not found. Listed in *What I could not find* |

Two further cautions:

- **This domain changes.** Every source is dated. Border-technology policy moved
  substantially in 2025–26 and figures older than the 2023-24 MHA Annual Report
  should be treated as historic.
- **Absence of published data is itself a finding.** Operational detail about
  border control rooms is not public. Where the record is silent, the strongest
  available evidence is the *domestic civil-policing* analogue (CAG and BPRD
  audits of city CCTV), which is public and unusually candid. That substitution
  is flagged wherever it is made.

---

## 0. The single most important finding: the customer is SSB, not BSF

The official SIH listing for PS 26187 names the sponsoring **organisation as the
Ministry of Home Affairs** and the **department as Sashastra Seema Bal (SSB),
Police-II Division**, category Software, theme Smart Automation
([SIH 2026 problem-statement catalogue, p. 239](https://sih-2026-problem-statements.shaikrohit187.workers.dev/public/pdfs/SIH_2026_All_PS.pdf);
corroborated in a [second independent mirror](https://github.com/NoBugNinja/Smart-India-Hackathon-SIH-2026-Problem-Statements/blob/main/README.md)).
`[SINGLE SOURCE]` — both are third-party mirrors of the portal, not the portal
itself. **Someone must confirm this on sih.gov.in and copy the verbatim
description into [`problem-statement.md`](problem-statement.md).**

If it holds, it changes the problem substantially. SSB does not guard the fenced
India–Pakistan or India–Bangladesh borders. SSB guards the **India–Nepal
(1,751 km) and India–Bhutan (699 km) borders**, which are **open borders** —
unfenced, and crossed lawfully and continuously by civilians
([MHA, Border Management-I Division](https://www.mha.gov.in/en/divisionofmha/border-management-i-division);
[MHA Annual Report 2023-24, para 7.52](https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf)).
`[VERIFIED]`

The same mirrors give the full description. In summary, it asks for a software
platform that ingests **standard IP-based CCTV streams** from **Border Out Posts
(BOPs), check posts, border roads and other strategic locations** and performs:
human detection and tracking; vehicle detection and classification; face
detection; ANPR; virtual-fence intrusion detection; suspicious-activity
detection; night-time movement detection; real-time alerting and event logging.
Its stated motivation is that FRS/ANPR/smart-camera capability today "requires
specialized hardware and proprietary solutions," making large-scale deployment
costly in remote border areas. The stated first goal of the expected solution is
to **eliminate dependence on expensive dedicated surveillance hardware**.

That framing is **cost-led, not attention-led**. See
[§7 Implications](#7-implications-for-the-problem-framing).

---

## 1. Who guards which border, and how the chain of command runs

India's land borders are divided between four border-guarding forces, all under
MHA administrative control
([MHA Annual Report 2023-24, paras 3.6 and 7.25](https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf)).
`[VERIFIED]`

| Border | Length | Force |
| --- | --- | --- |
| Bangladesh | 4,096.70 km | BSF |
| Pakistan | 3,323 km | BSF (Army on the LoC alongside BSF) |
| China | 3,488 km | ITBP (Army on the LAC alongside ITBP) |
| Nepal | 1,751 km | **SSB** |
| Bhutan | 699 km | **SSB** |
| Myanmar | 1,643 km | Assam Rifles |
| Afghanistan | 106 km | — |

Lengths from [MHA, Border Management-I Division](https://www.mha.gov.in/en/divisionofmha/border-management-i-division).
Assam Rifles is the only force with split control — MHA administratively, Army
operationally ([MHA Annual Report 2023-24, para 7.25](https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf)).

State police are *not* border-guarding forces, but sit alongside them; the Home
Minister's 2026 "Smart Border" framing explicitly describes a
"quadrangular security grid" of technology, local administration, district
police and the border force
([The Hindu Bureau via newkerala, 5 June 2026](https://www.newkerala.com/news/a/smart-border-concept-under-final-stage-pilot-project-831.htm)).
`[SINGLE SOURCE]`

### SSB's structure

[MHA Annual Report 2023-24, paras 7.51–7.53](https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf)
`[VERIFIED]`:

- Posted strength **92,541** as on 31.03.2024.
- Force HQ ×1 → **Frontiers ×6** → **Sectors ×18** → **Battalions ×73** → BOPs.
- **539 BOPs** on the India–Nepal border and **195 BOPs** on the India–Bhutan
  border (paras 3.27, 3.28) — **734 BOPs total**.
- SSB is *also* deployed on internal-security duty in J&K, Assam and LWE-affected
  Chhattisgarh, Jharkhand and Bihar — so 92,541 is not a border headcount.
- Origin matters: SSB began in 1963 as the Special Service Bureau, whose job was
  to *build up the border population's morale and capability*. It only became a
  border-guarding force in 2001. It is a civic-facing force by inheritance.

That gives a concrete unit of deployment: **the BOP**, not a national control
room. A hierarchy of BOP → battalion → sector → frontier → FHQ is four levels of
aggregation, each a plausible place for a screen.

---

## 2. What is deployed today

### 2.1 SSB's own kit

The most recent authoritative statement is a Lok Sabha written answer
([LS Unstarred Q. No. 488, answered 3 February 2026, MoS Home Nityanand Rai](https://www.mha.gov.in/MHA1/Par2017/pdfs/par2026-pdfs/LS03022026/488.pdf)).
`[VERIFIED]` — corroborated by [ThePrint, 3 Feb 2026](https://theprint.in/india/ssb-guarding-nepal-bhutan-borders-equipped-with-state-of-the-art-surveillance-equipment-govt/2844824/).

SSB has procured: UAVs, micro-UAVs, hand-held thermal imagers, **"CCTV
Surveillance Setup with Automatic Face Recognition System with Auto Number Plate
Recognition"**, and satellite phones.

Note what that sentence establishes: SSB **already has** FRS- and ANPR-capable
CCTV somewhere. The problem statement is therefore about *scaling that capability
in software across the estate*, not introducing it.

The same answer gives the money, and it is small:

| Head | Period | Allotted | Spent |
| --- | --- | --- | --- |
| Modernisation **and infrastructure** development | 2015-16 to 2025-26 | ₹5,001.63 cr | ₹4,775.11 cr |
| Modernisation Plan-II, III and IV (equipment only) | 2013 to 31.03.2026 | **₹241.15 cr** | **₹210.02 cr** |

₹241 crore of *equipment* money over thirteen years, across 734 BOPs and
2,450 km. Asked for a completion timeline, the Ministry replied that
modernisation is an ongoing process and "specific timeline can not be given."
`[VERIFIED]`

### 2.2 CIBMS — the flagship, and its arrested development

The Comprehensive Integrated Border Management System is MHA's programme to
substitute electronic surveillance for physical fence on stretches that cannot
be fenced. Timeline, all from primary sources:

| Date | Event | Source |
| --- | --- | --- |
| 2012 | MHA issues EoI for CIBMS | [IDSA Issue Brief, Pushpita Das, 5 Oct 2017](https://www.idsa.in/system/files/issuebrief/ib_comprehensive-integrated-border-management-system_pdas.pdf) |
| 2014 | BSF submits detailed report; no decision taken | ibid. |
| 1–2 Jan 2016 | Pathankot attack; Punjab & Haryana HC warns MHA | ibid. |
| 29 Jan 2016 | Home Secretary sanctions CIBMS via two pilot projects | ibid. |
| 22 Mar 2016 | BSF RFP issued | ibid. |
| Sep 2018 | Two 5 km smart-fencing pilots operationalised, Jammu | [PIB, 5 Mar 2019](https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1567516) |
| 5 Mar 2019 | BOLD-QIT (61 km, Dhubri, Assam) inaugurated | [PIB, 4 Mar 2019](https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1567263) and [PIB, 5 Mar 2019](https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1567516) |

The announced rollout plan, verbatim in structure from
[PIB, 5 Mar 2019](https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1567516):
Stage-I = the 71 km of pilots (10 km IPB + 61 km IBB); Stage-II = 153 km in
4 patches; Stage-III = 1,802 km in 67 patches. Stage-I was to be reviewed by an
independent third-party auditor, **IIT Delhi**.

**Then it stops.** `[VERIFIED — three official sources, three time points]`

- [Rajya Sabha Unstarred Q. No. 2293, answered 23 March 2022](https://www.mha.gov.in/MHA1/Par2017/pdfs/par2022-pdfs/RS23032022/2293.pdf):
  CIBMS is "installed as pilot project in two stretches on Jammu international
  border for approx. 5 Kms each and one project in Dhubri (Assam) for 61 Kms.
  is in final stage of completion." Three years *after* Dhubri was inaugurated,
  it is described as not yet complete. The answer adds that CIBMS "is
  functioning well as per the requirement of the Border Security Force."
- [MHA Annual Report 2023-24, para 3.21](https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf)
  (published December 2024): "Two pilot projects in stretches of 5 km each have
  been implemented in Jammu along the IPB and one project in 61 km at Dhubri,
  Assam, along the IBB." Identical scope. No Stage-II, no Stage-III.

**Seven years after the 2019 launch, CIBMS coverage is still the original ~71 km
of a planned ~1,955 km — under 4%.** No official document found states why.

The India-Myanmar border has its own, much smaller pilot: **hybrid surveillance
system, 1 km each in Arunachal Pradesh and Manipur, awarded to Assam Rifles,
work in progress** ([MHA Annual Report 2023-24, para 3.22](https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf)).
`[SINGLE SOURCE — official]`

### 2.3 Physical infrastructure, for scale

[MHA Annual Report 2023-24, paras 3.10–3.19](https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf)
`[VERIFIED]`:

| | India–Bangladesh | India–Pakistan |
| --- | --- | --- |
| BOPs | 1,113 (BSF) | 687 completed of 736 sanctioned |
| Fencing | 3,196.705 km of 4,096.7 km | 2,068.406 km of 2,097.646 km sanctioned |
| Floodlighting | 2,729.236 km of 3,077.549 km sanctioned | 2,078.80 km of 2,107.40 km sanctioned |

Roughly **900 km of the India–Bangladesh border is unfenced**, and the Annual
Report states explicitly that "the non-physical barrier will be in the form of
technological solutions." Fencing has been slowed by riverine terrain,
habitations close to the border, pending land acquisition and protests by the
border population (ibid., para 3.13).

Funding sits in the **Border Infrastructure and Management (BIM) Scheme**, a
Central Sector Scheme approved by the Cabinet Committee on Security on
19.01.2022 at **₹13,020 crore**, running to 31.03.2026
([MHA, Border Management-I Division](https://www.mha.gov.in/en/divisionofmha/border-management-i-division);
[MHA Annual Report 2023-24, para 3.7](https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf)).
`[VERIFIED]`

### 2.4 The domestic CCTV programmes, as an analogue

Nirbhaya-funded **Safe City** projects were approved for eight cities — Delhi,
Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Ahmedabad, Lucknow — at
**₹2,919.55 crore** total, cost-shared 60:40 with states except Delhi
([MHA, Safe City Projects](https://www.mha.gov.in/en/commoncontent/safe-city-projects)).
`[VERIFIED]`

Delhi's proposal is directly on-point: originally ₹1,250 crore, revised to
₹858 crore and approved February 2019, with key components including *"real time
video analytics and generation of actionable alerts"*
([CAG Report No. 15 of 2020, para 9.2.3](https://cag.gov.in/uploads/download_audit_report/2020/9.%20Digital%20Initiatives%20of%20Delhi%20Police-05f911198e45a25.81448827.pdf)).
`[VERIFIED — official audit]` The same audit criticised it as surveillance-centric
and noted that **no impact assessment had ever been done on the cameras already
installed**.

---

## 3. Scale and feed-to-operator ratios

This is the question the team most needs answered, and there is **no published
figure for any border force**. `[NOT FOUND]` What exists is a set of audited
Indian civil-policing figures that are directly analogous and unusually blunt.

### 3.1 The one hard, official ratio: Delhi Police C4i

From [CAG Report No. 15 of 2020 (Union Government), Chapter 6.3](https://cag.gov.in/uploads/download_audit_report/2020/Report%20No.%2015%20of%202020_English_Police-05f809de4527eb8.68338874.pdf).
`[VERIFIED — statutory audit]`

- Delhi Police had installed **4,100 CCTV cameras** over ten years; 3,870 through
  ECIL in four phases, 230 rented.
- Between April 2018 and March 2019, functional cameras ranged between **2,152
  and 2,631 of 3,870 — i.e. 55% to 68% functional**.
- The C4i unified command centre has a video wall on which **64 cameras can be
  viewed simultaneously**, fed from **1,054 cameras**.
- Over 2018-19 the share of those cameras that could actually be monitored at
  C4i ranged from **22% to 48%**, the rest lost to faulty cameras or network
  problems.
- And the sentence that matters most: **"there was only one official deployed to
  monitor the video feed at C4i. Audit observed that continuous monitoring of
  60 cameras along with documenting the observations would be a very difficult
  task for only one person."**

That is a **~60:1 feed-to-operator ratio, stated by the national auditor, with
the auditor's own judgement that it is unworkable.** It is the strongest single
piece of evidence the team has for the core premise. Cite it precisely: it is
Delhi Police, not a border force.

### 3.2 BPRD's five-city comparison

The Bureau of Police Research & Development (an MHA body) published
*Effectiveness of CCTV Surveillance Systems for Police — Comparative Study*
(Project No. 11/MM:03, Micro Mission-03, National Police Mission, 2023-24)
([full PDF](https://bprd.nic.in/uploads/pdf/EFFECTIVENESS%20OF%20CCTV%20SURVEILLANCE%20SYSTEMS%20FOR%20POLICE.pdf)).
`[SINGLE SOURCE — official]`

Cameras against control-room manpower, as reported by each city:

| City | Cameras reported | Control-room manpower | Screens |
| --- | --- | --- | --- |
| Bengaluru | 7,500 IP (6,700 static + 800 rotating) | 40-seater centre; headcount not stated | 8×3 video wall (55") |
| Indore (district) | 608 IP + 457 static + 125 rotating | 45 | 24 |
| Surat | 706 static + 28 PTZ | 24 | 9×2 cube video wall |
| Jaipur | 62 static + 16 rotating + 6 traffic | 16 | 30 |
| Hyderabad | multiple systems | 50 (Commissionerate) + 25 (SCMC) + 20 (ITMS) + 24 (CCTV) | 30 + video wall |

Do not over-read these: the manpower figures are almost certainly total roster,
not simultaneous shift, and BPRD does not say. But the direction is consistent
with CAG's Delhi finding — feeds outnumber watchers by one to two orders of
magnitude.

Other BPRD findings that matter for design:

- **"All the cities mostly use Cameras of 2 Mega Pixel."** 1080p is the working
  assumption, not 4K.
- **All five cities use cable connectivity** for transmission.
- **Data retention is ~30 days** on average.
- Video analytics is present but partial — Hyderabad uses it in ITMS with
  "manual analysis in all other cameras"; Bengaluru and Indore's traffic centre
  use it; the other cities do not report it.
- BPRD's own hardware sizing table gives: control room, up to 4 GPUs, supporting
  **up to 100 cameras**; field site/booth, 1 GPU, **up to 20 cameras**;
  junction box, no GPU, **up to 6 cameras**.
- BPRD recommends that cameras **"need not stream live data but process the
  video locally … and send only analytics data to the police control room,"**
  with 30 days of local storage.

### 3.3 The official diagnosis, in BPRD's own words

Three statements from the same report, which read as if written for this problem
statement:

1. "the underlying infrastructure and monitoring processes behind most CCTV
   systems in India have largely remained unchanged, focusing on manual
   monitoring and post-incident analysis."
2. "most public safety CCTV operations remain focused on reactive processes …
   only subjected to analysis if warranted by reports of an incident, after the
   event."
3. "manual intervention still tends to dominate CCTV operations. A lack of
   automation means that most real-time monitoring and supervision of CCTV
   content is still carried out by teams of humans sitting in control rooms."

This is an MHA research body stating the team's thesis as government finding.
`[SINGLE SOURCE — official]` It is the best citation available for the premise.

### 3.4 Human vigilance — what is actually sourceable

There is a widely-circulated industry claim that operators miss 45% of activity
after 12 minutes and 95% after 22 minutes. **I could not find a primary source
for it.** `[NOT FOUND]` It is repeated across vendor material without
attribution. **Do not put it in the deck.**

What *is* sourceable, from the Sandia National Laboratories / NIJ guide
*The Appropriate and Effective Use of Security Technologies in U.S. Schools*
([OSTI 974410](https://www.osti.gov/biblio/974410)):

> "Multiple experiments and studies have clearly demonstrated that humans are
> very poor at detecting suspicious events on monitors, after only 30 to 60
> minutes of constant watching, even when told what the event would be"

citing Tickner and Poulton (1973) and Ware, Baker and Sheldon (1964); and,
citing Garcia (2001), "Longstanding studies have shown that humans are not good
detectors, particularly over long time periods." The same section calls assigning
a guard to constantly watch live video "an unrealistic approach to security."
`[SINGLE SOURCE — but itself a literature review over primary studies]`

Peer-reviewed work exists and should be read before the technical phase: Hodgetts
et al., *Work exposure and vigilance decrements in closed circuit television
surveillance*, Applied Ergonomics
([PubMed 25479991](https://pubmed.ncbi.nlm.nih.gov/25479991/)) and Donald &
Donald, *Task disengagement and implications for vigilance performance in CCTV
surveillance*. I could not retrieve either abstract in full within this pass.

---

## 4. Documented failures and limitations

### 4.1 Indian: cameras that do not work, and approvals that do not come

All from [CAG Report No. 15 of 2020, Chapter 6.3](https://cag.gov.in/uploads/download_audit_report/2020/Report%20No.%2015%20of%202020_English_Police-05f809de4527eb8.68338874.pdf).
`[VERIFIED — statutory audit]`

- The 56-camera pilot phase (₹5.61 crore) was declared **non-functional from
  August 2015 for lack of connectivity** — the agreement had simply omitted a
  leased line — and was dismantled in November 2018. The audit calls the
  expenditure wasteful.
- ECIL was contractually required to maintain **99% monthly system availability**
  and to supply 1% spare cameras. It kept **no reserve cameras at any site**.
  Across Phase-I (29 sites), **zero** sites achieved >99% availability; 6 sites
  ran at 0–25% availability. In Phase-IIA (38 sites), 14 sites ran at 0–25%.
- Repair and relocation approvals took **15 to 20+ months**: 45 cameras at Saket
  inoperative from February 2016; 37 at Tilak Nagar from October 2016; 28 at
  India Gate from March 2018.
- Delhi Police's own reply concedes that "manual process of finding out network
  issues or defective cameras has limitations."

The last point is a product insight in disguise: **camera-health monitoring is an
acknowledged unmet need in the same estate.**

### 4.2 Indian: infrastructure at the outposts themselves

From the Standing Committee on Home Affairs, summarised by PRS
([Working Conditions in Border Guarding Forces, 12 December 2018](https://prsindia.org/policy/report-summaries/working-conditions-in-border-guarding-forces);
figures restated in [PRS DFG 2024-25 Home Affairs analysis](https://prsindia.org/budgets/parliament/demand-for-grants-2024-25-analysis-home-affairs)).
`[VERIFIED — two PRS pages on the same committee finding]`

- **328 SSB outposts had no electricity connection**, running on diesel
  generators or solar appliances.
- 134 of **643** SSB outposts had no water filtration system.
- **76% of ITBP outposts** depended on diesel generators for electricity.
- The Committee recommended MHA form a working group on **energy security for
  BOPs**.

An earlier Standing Committee report
([Border Security: Capacity Building and Institutions, 11 April 2016](https://prsindia.org/policy/report-summaries/border-security-capacity-building-and-institutions))
found that **"jawans across border guarding forces perform 16-18 hours of duty in
a day"** because of personnel shortages. `[SINGLE SOURCE — PRS summary of an
official committee report]`

On access: **308 of SSB's 734 BOPs lack road connectivity**; the proposal for
lateral and axial roads is pending for want of approval because of "large
financial implications"
([The Tribune, 17 August 2025](https://www.tribuneindia.com/news/india/308-ssb-outposts-on-nepal-tibet-borders-await-road-connectivity/amp)).
`[SINGLE SOURCE — attributed to unnamed sources; treat with care, but the BOP
total matches MHA's 539+195]`

Vacancies: CAPFs ran an **8% vacancy rate as of July 2024** against ~10.5 lakh
sanctioned posts, and have not been below 8% for six years; SSB stood at **10%**
as of 1 January 2023
([PRS DFG 2026-27 Home Affairs](https://prsindia.org/budgets/parliament/demand-for-grants-2026-27-analysis-home-affairs);
[PRS DFG 2024-25](https://prsindia.org/budgets/parliament/demand-for-grants-2024-25-analysis-home-affairs)).
`[VERIFIED]`

### 4.3 Indian: the CIBMS procurement critique

From the IDSA Issue Brief
([Pushpita Das, 5 October 2017](https://www.idsa.in/system/files/issuebrief/ib_comprehensive-integrated-border-management-system_pdas.pdf)).
`[SINGLE SOURCE — think tank, well-referenced]`

- The BSF's own review of the *pre*-CIBMS system found that (a) the high-tech
  equipment "did not provide all-round security and did not work in adverse
  climatic conditions"; (b) gaps remained at rivers and nullahs; (c) it was
  manpower-intensive; and (d) **it was not integrated and "failed to provide a
  common operating picture at all levels."**
- The 2016 RFP asked bidders to "arrive at their own conclusions about the
  solution needed" — the author reads this as BSF lacking the technical
  expertise to specify. It further alleges BSF waived 50% of the scores on
  critical requirements to accommodate low-price bidders.
- On operations: high-tech devices already deployed "are not optimally utilised
  because the required technical expertise is not uniformly available among the
  force's personnel," and cost plus spare-part scarcity deters use.
- On architecture, a warning worth taking seriously:
  **"centralised decision making could hamper timely and effective response on
  the ground given that detection and interception of infiltrators at the border
  require a quick response which is achieved only through a decentralised
  decision making process."**

An ORF occasional paper ([R K Arora, 25 November 2016](https://www.orfonline.org/research/comprehensive-integrated-border-management-system))
adds that observation posts lack permanent electricity and water connections and
recommends **technical battalions at frontier level** to cut equipment repair
turnaround. `[SINGLE SOURCE]`

### 4.4 International: the comparator that everyone cites

The US built the same thing three times and cancelled it three times. Numbers
from the IDSA brief above and from EFF
([Dave Maass, 21 October 2024](https://www.eff.org/deeplinks/2024/10/us-border-surveillance-towers-have-always-been-broken)):

- **ISIS / America's Shield Initiative**, 1997–2006, US$439 million, abandoned.
  Assessments found **90% of sensor alerts were false alarms**; only **2% of
  sensor alerts on the Mexican border resulted in apprehension**, and **under 1%
  on the Canadian border**. ISIS was "severely undermanned, especially in
  monitoring the output of the surveillance system." `[VERIFIED — two sources]`
- **SBInet**, shelved 14 January 2017 after cost escalation; IDSA gives
  US$1.4 billion, EFF gives US$3 billion for the programme. DHS found large
  numbers of false alarms, line-of-sight constraints, unreliable transmission
  and equipment malfunction, and concluded it "did not and could not provide a
  single technological solution."
- **Today**: an internal Border Patrol memo reported ~**30% of RVSS towers
  broken** (~150 towers). A DHS-funded **RAND** study found the Integrated Fixed
  Towers programme had a *negative* impact on apprehension levels and the RVSS
  evidence was "weak" and "inconclusive." A **2017 GAO** report found Border
  Patrol data quality so poor that mission benefits could not be determined —
  one station reported 500 IFT-assisted cases in six months when no IFTs existed
  in Texas. `[SINGLE SOURCE — EFF, but each figure is attributed to a named
  official document]`

Two lessons the team should absorb: **false-alarm rate is the historical killer**,
and **nobody in this domain has been able to prove effectiveness**, largely
because the outcome data was never collected. A platform that produces its own
audit trail of alert → operator action → outcome is doing something the entire
prior art has failed to do.

### 4.5 Legal and policy constraints on face recognition and ANPR

The problem statement asks explicitly for face detection and ANPR. India has no
dedicated law governing facial recognition. The DPDP Act 2023 (Rules notified
14 November 2025) is the framework, but **s.17(1)(c) disapplies data-fiduciary
obligations where processing is for the prevention, detection, investigation or
prosecution of an offence** — a broad state exemption
([SFLC.in analysis](https://sflc.in/analysis-of-the-facial-recognition-technology-enabled-surveillance-landscape-in-india/)).
A private member's *Facial Recognition Technology (Regulation of Police Powers)
Bill, 2023* is pending. `[SINGLE SOURCE]`

Deployment reality: IFF's Panoptic tracker recorded **170 FRT systems in India of
which only ~20 were operational**, with ₹15.13 billion (~US$181 million)
committed; over 85% were still in tender, procurement or implementation
([Biometric Update, 17 June 2024](https://www.biometricupdate.com/202406/india-has-170-facial-recognition-systems-but-only-a-handful-are-operational)).
`[SINGLE SOURCE]`

That 170:20 ratio is worth internalising. **The dominant failure mode of Indian
AI-surveillance projects is not being wrong; it is never going live.**

---

## 5. Is the problem getting more or less relevant?

**More, sharply, and very recently.** `[VERIFIED]`

**Money.** MHA's total allocation for 2026-27 is **₹2,55,234 crore**, up 9.4% on
2025-26 RE. Border infrastructure gets **₹5,577 crore**, up 2% on 2025-26 RE
(₹5,472 crore) — and up from ₹3,757 crore in 2024-25 and ₹3,172 crore in
2023-24 RE. CAPFs get ₹1,16,789 crore, of which **98% is revenue and only 2% is
capital**
([PRS DFG 2026-27](https://prsindia.org/budgets/parliament/demand-for-grants-2026-27-analysis-home-affairs);
[PRS DFG 2024-25](https://prsindia.org/budgets/parliament/demand-for-grants-2024-25-analysis-home-affairs)).
The 2% capital share is a strong argument for *software on existing hardware*.

**Policy.** On **22 May 2026**, the Home Minister announced a **"Smart Border"**
project at the BSF Rustamji Memorial Lecture: a single security grid over roughly
**6,000 km** of the Pakistan and Bangladesh borders, using drones, radars,
thermal and smart cameras, to be launched in BSF's 60th year
([Outlook India, 22 May 2026](https://www.outlookindia.com/national/amit-shah-unveils-smart-border-plan-high-tech-security-grid-crackdown-on-illegal-immigrants);
[The Daily Pioneer, 23 May 2026](https://dailypioneer.com/news/govt-announces-smart-border-push-for-frontier-security)).
By **5 June 2026** it was described as in its "final stage" with a pilot at
**seven to eight locations** simultaneously, plus approval to replace 119 km of
650 km of fencing over fifteen years old
([newkerala, 5 June 2026](https://www.newkerala.com/news/a/smart-border-concept-under-final-stage-pilot-project-831.htm)).
`[VERIFIED — multiple outlets, consistent]` The Pioneer account describes
"multi-sensor fusion," AI/ML that filters false alarms and predicts infiltration
patterns, and AI cameras distinguishing humans, animals, vehicles and drones.

**Other frontiers.** The Cabinet Committee on Security gave in-principle approval
on **18 September 2024** to fence the entire **1,643 km India–Myanmar border**
with a patrolling track, at an estimated **₹31,000 crore** over about ten years
([Business Standard, 18 Sep 2024](https://www.business-standard.com/external-affairs-defence-security/news/rs-31-000-crore-to-be-spent-to-fence-1-643-km-border-with-myanmar-124091800714_1.html);
[Assam Tribune](https://assamtribune.com/north-east/centre-allocated-rs-31000-cr-to-fence-1643-km-india-myanmar-border-1551889)).
`[VERIFIED]`

**Threat trend.** Contraband seizures on the India–Bangladesh border rose from
₹24,688.88 lakh in 2015 to **₹46,107.70 lakh in 2024** — up ~87%
([LS Unstarred Q. No. 1874, 11 March 2025](https://www.mha.gov.in/MHA1/Par2017/pdfs/par2025-pdfs/LS11032025/1874.pdf)).
`[VERIFIED]` Drone incursions in Punjab: **245 drones seized in 2024**, then
**272 drones and over 367 kg of heroin between January and 30 November 2025**
([Newsonair, 30 Nov 2025](https://www.newsonair.gov.in/bsf-seizes-272-drones-over-367-kg-heroin-along-punjab-border-in-2025);
[Newsonair, 30 Nov 2024](https://www.newsonair.gov.in/bsf-seizes-245-drones-smuggling-arms-and-narcotics-from-pakistan-in-punjab)).
`[VERIFIED]`

**On SSB's own borders.** In 2025-26 SSB rescued **661 human-trafficking
victims** and apprehended **6,324 persons** involved in illegal activities
([Deccan Chronicle, 17 August 2026](https://www.deccanchronicle.com/nation/ssb-safeguards-2450-km-open-borders-with-nepal-bhutan-bandi-sanjay-1979854)).
`[SINGLE SOURCE]` Over 01.01.2023–31.03.2024 SSB recorded 1,059 narcotics cases
(573 arrests), 471 Indian-currency cases, 197 foreign-currency cases, 11 FICN
cases and 5,993 prohibited/contraband cases
([MHA Annual Report 2023-24, para 7.53](https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf)).
`[VERIFIED]`

Note the shape of that caseload. It is **trafficking, narcotics, currency and
contraband** — carried by *people and vehicles moving through*, not by intruders
climbing a fence. That is why the problem statement asks for ANPR and face
detection.

---

## 6. What I could not find

Each of these was searched for and not located. Listing them is deliberate: they
are the questions the team must answer by *asking SSB*, not by reasoning.

1. **Any published count of CCTV cameras operated by SSB, BSF, ITBP or Assam
   Rifles.** `[NOT FOUND]` The closest is a vendor press item claiming 674
   surveillance cameras (PTZ and static bullet) installed for BSF at Berhampore,
   Malda and Jaisalmer with inverter, solar and wireless backhaul
   ([PTI/propnewstime](https://propnewstime.com/latestnewsstories/MzQ3Mzc=/brihaspathi-technologies-deploys-integrated-surveillance-systems-across-border-and-city-policing-projects)).
   `[SINGLE SOURCE — vendor material. Do not present as a national figure.]`
2. **Any feed-to-operator ratio for a border force.** `[NOT FOUND]` The 60:1
   figure in §3.1 is Delhi Police.
3. **The IIT Delhi third-party audit of CIBMS Stage-I.** Announced in the
   [March 2019 PIB release](https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1567516);
   no findings, summary or even confirmation that it was completed is public.
   `[NOT FOUND]`
4. **Any official explanation for why CIBMS Stage-II and Stage-III did not
   proceed.** `[NOT FOUND]`
5. **Any CAG performance audit of CIBMS, BOLD-QIT, smart fencing or border
   surveillance technology.** `[NOT FOUND]` — I found CAG audits of Indo-China
   and Indo-Nepal *border roads*, and of Delhi Police's digital initiatives, but
   nothing auditing border surveillance technology.
6. **Any false-alarm rate, detection rate or nuisance-alarm figure for an Indian
   border sensor or camera system.** `[NOT FOUND]` Every false-alarm figure in
   this document is American.
7. **Camera makes, models, codecs, resolutions or stream protocols in use at any
   BOP.** `[NOT FOUND]` The problem statement's own phrase "standard IP-based
   CCTV cameras" is the only guidance available.
8. **Bandwidth, backhaul type or link quality between BOPs and any control
   room.** `[NOT FOUND]` The only related datum is that 328 SSB BOPs had no
   electricity connection (§4.2).
9. **What SSB's control rooms look like — how many, at what level of the
   hierarchy, staffed by whom.** `[NOT FOUND]` BOLD-QIT's PIB release refers to
   "BSF Control Rooms on the Border" feeding "Quick Reaction Teams," which
   suggests control rooms sit forward, near the BOPs, rather than centrally — but
   that is BSF, not SSB, and it is one sentence.
10. **The command-and-control system the platform would have to integrate with.**
    The problem statement requires "integration with existing command and control
    systems" and does not name one. `[NOT FOUND]`
11. **A primary source for the "45% missed after 12 minutes / 95% after 22
    minutes" CCTV vigilance claim.** `[NOT FOUND]` — see §3.4.
12. **Whether the SIH problem statement's department attribution to SSB is
    correct on the official portal.** `[SINGLE SOURCE, unofficial]`

---

## 7. Implications for the problem framing

### 7.1 What the evidence confirms

| Assumption in `problem-analysis.md` | Verdict |
| --- | --- |
| **4. Operator attention, not coverage, is the binding constraint** | **Supported.** CAG found one official monitoring 60 cameras at Delhi Police C4i and called it unworkable (§3.1). BPRD states nationally that monitoring is manual, reactive and post-incident (§3.3). Standing Committee found 16–18 hour duty days in border guarding forces (§4.2). PIB's own justification for BOLD-QIT was to "provide respite to the troops from round the clock human surveillance." |
| **5. False positives are the primary failure mode** | **Supported by analogue, not domestically.** 90% of ISIS sensor alerts were false alarms; 2% of alerts led to apprehension (§4.4). No Indian figure exists (§6). The 2026 Smart Border announcement lists false-alarm filtering as an explicit AI requirement (§5). |
| Government context, not a SaaS market | **Confirmed.** MHA is the buyer; SSB the user; the money is a Central Sector Scheme; 98% of CAPF budget is revenue, 2% capital (§5). |
| Integration matters more than model accuracy | **Supported.** BSF's own pre-CIBMS review said the failure was that the system "failed to provide a common operating picture at all levels" (§4.3). BPRD's third named national issue is that cross-organisation data sharing "is very limited" (§3.3). |

### 7.2 What the evidence contradicts — read this section twice

**(a) The user is SSB, and SSB's borders are open, not fenced.**
The analysis is written for a fenced-perimeter, intrusion-detection world where
any human near the line is an anomaly. On the India–Nepal border people cross
lawfully and continuously (§0, §1). A "virtual fence" that alerts on every human
crossing would be useless there. The detectable signal is not *presence*, it is
*identity, vehicle and pattern* — which is exactly why the problem statement
asks for face detection, ANPR, vehicle classification and *suspicious-activity*
detection rather than only intrusion. **The `[ASSUMED]` stakeholder table and the
`[INFERRED]` "border outposts and control rooms aggregating their feeds" reading
should both be rewritten around SSB.**

**(b) The problem statement's own stated pain is cost, not attention.**
Its background does mention "requiring continuous human observation," but the
Expected Solution leads with *"Eliminate dependence on expensive dedicated
surveillance hardware"* (§0). The document's opening line — "the capacity to
watch them has not scaled" — is *our* framing, not the customer's. Both are
defensible; the customer's is the one being judged. The evidence supports the
cost framing hard: SSB has had **₹241 crore of equipment money in thirteen years**
across 734 BOPs (§2.1), and CAPFs spend 2% of budget on capital (§5).
**Recommendation: lead with cost-per-camera-brought-under-analytics, and use the
attention argument as the reason the capability is worth having at all.**

**(c) Assumption 3 (bandwidth to a central point is constrained) is probably
right, but the deeper constraint is power, not bandwidth.**
**328 SSB outposts had no electricity connection at all** (§4.2), and 308 of 734
lack road connectivity. An architecture that assumes a GPU at every BOP is
assuming mains power that a large minority of BOPs do not have. BPRD's own sizing
(1 GPU ≈ 20 cameras at a field site; 4 GPUs ≈ 100 cameras at a control room,
§3.2) plus its recommendation to process locally and ship only analytics
metadata is the closest thing to a government-endorsed reference architecture —
but it must be reconciled with diesel-generator power budgets. **This is the
single biggest unexamined constraint in the current analysis.**

**(d) Assumption 1 (heterogeneous, mixed-vendor, legacy estate) is probably
right but is not what the statement says.**
The statement says "standard IP-based CCTV cameras" (§0). That is a narrower and
easier input than the analysis assumes — RTSP/ONVIF, not analogue capture cards.
BPRD's finding that Indian police estates are mostly **2 MP** cameras on cable
backhaul with 30-day retention (§3.2) is the best available proxy for what
"existing" means. **Assumption 1 should be re-worded from "heterogeneous vendors
and ages" to "modest-resolution IP cameras of mixed vintage."**

**(e) The failure mode the analysis omits entirely: the cameras are not working
and the feed does not arrive.**
The analysis treats the feed as given and the operator as the bottleneck. CAG
found **32–45% of Delhi Police cameras non-functional**, and only **22–48% of
C4i-linked cameras actually monitorable**, the rest lost to faults or network
problems (§3.1). Zero Phase-I sites met the contractual 99% availability; six ran
at 0–25% (§4.1). Delhi Police itself said manual fault-finding "has limitations"
and proposed buying a camera-health monitoring system. **A platform that
silently analyses only the third of feeds that happen to be up is worse than
useless — it will report calm.** Stream-health monitoring, gap detection and
honest coverage reporting are not a nice-to-have; on this evidence they are a
core feature, and they are a differentiator no competitor is foregrounding.

**(f) Centralisation may be the wrong instinct.**
IDSA's warning is explicit: centralised decision-making "could hamper timely and
effective response … detection and interception at the border require a quick
response which is achieved only through a decentralised decision making process"
(§4.3). BOLD-QIT's design pushes feeds to control rooms *on the border* that
dispatch QRTs. **Design for the BOP and the battalion, and let the sector and
frontier see a roll-up — not the reverse.**

**(g) The realistic failure mode is not "our model is inaccurate." It is "it
never goes live."**
170 FRT systems procured in India, ~20 operational (§4.5). CIBMS: 71 km of
1,955 km in seven years (§2.2). SBInet, ISIS, ASI: all cancelled (§4.4). No
CIBMS effectiveness audit exists; the US could not even measure its own (§4.4,
§6). **The thing this domain has never had is a system that can prove it works.**
Instrumentation — alert → operator disposition → outcome, auditable — is a
better differentiator than another percentage point of mAP.

**(h) Face recognition and ANPR carry legal exposure the analysis has not
considered.** India has no FRT statute; the DPDP Act's s.17(1)(c) law-enforcement
exemption is broad but contested (§4.5). A submission that demonstrates
awareness — retention limits, purpose limitation, audit logging, human-in-the-
loop before any identification is acted on — will read as more deployable, not
less ambitious.

### 7.3 What this changes for Phase 3's remaining questions

Of the five questions [`problem-analysis.md`](problem-analysis.md) set for
Phase 3, this note answers 1 and part of 2 for the domain, and reframes them:

- **Q1 (what is deployed):** ~734 SSB BOPs, 539 on Nepal and 195 on Bhutan;
  modest IP CCTV with some FRS/ANPR already procured; ₹241 crore of equipment
  money in thirteen years; 328 outposts without a mains electricity connection.
- **Q2 (who operates it, at what ratio):** command chain is BOP → battalion →
  sector → frontier → FHQ. The ratio is unpublished; the best proxy is CAG's
  60:1 at Delhi Police C4i.
- **Q3 (which detection tasks carry value):** the statement names eight, and
  SSB's caseload — trafficking, narcotics, currency, contraband — points at
  people-and-vehicle identification at check posts and roads over fence-line
  intrusion.
- **Q4 (accuracy/latency thresholds):** still `[EVIDENCE NEEDED]`. No Indian
  false-alarm baseline exists to beat.
- **Q6 (can assumptions 1–5 be substantiated):** 4 and 5 yes, 3 partially, 1
  needs re-wording, 2 not yet tested.

Competitor and prior-art work belongs in
[`../market-research/`](../market-research/); the technical consequences of §7.2(c)
— edge power budgets and where inference runs — belong in
[`../technical-research/`](../technical-research/). The reframings in §7.2(a),
(b) and (e) change what we build and should become ADRs in
[`../../docs/decisions/`](../../docs/decisions/) once the team agrees them.
