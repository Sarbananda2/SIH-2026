# Video Analytics Feasibility

Last updated: 2026-08-31

What is technically possible for problem statement 26187, and what is realistically
buildable inside a 36-hour hackathon. Written to test the assumptions in
[`../problem-space/problem-analysis.md`](../problem-space/problem-analysis.md) —
particularly assumptions 1, 2, 3 and 5.

Scope: ingestion from existing CCTV, detection on degraded feeds, edge inference,
the false-positive problem, VLM triage, datasets, and bandwidth. It does not cover
product scope, UI, or procurement.

## Confidence markers

| Tag | Meaning |
| --- | --- |
| `[VERIFIED]` | Read directly from the primary source (paper, standard, vendor datasheet, official docs) and the figure is stated there |
| `[VENDOR CLAIM]` | Stated by a party selling the thing; plausible but not independently measured |
| `[DERIVED]` | Arithmetic performed here from `[VERIFIED]` inputs; the inputs are cited, the result is ours |
| `[UNCERTAIN]` | Found in secondary sources only, or the source is a forum/blog, or the figure is contested |
| `[NOT FOUND]` | Looked for it; could not source it. Do not invent a number to fill the gap |

**This field moves fast.** Every model, price and product figure below carries a
date. Anything older than about six months should be re-checked before it goes in
a submission.

---

## 1. Integrating with existing CCTV

This is the crux of the problem statement and the part most likely to be
under-estimated. The finding is that **ingestion is a systems-integration problem,
not an ML problem**, and it is where a demo most plausibly differentiates itself.

### 1.1 What the standards actually give you

| Standard | What it is | What it gives you | Status |
| --- | --- | --- | --- |
| RTSP | A media *session control* protocol. Carries no analytics metadata | A video stream, if you know the exact URL | Universal, but URL form is vendor-specific `[VERIFIED]` |
| ONVIF Profile S | Basic IP video streaming/config | Discovery, stream URI retrieval, PTZ | **Being retired.** No new conformance submissions after 2027-03-31 `[VERIFIED]` |
| ONVIF Profile T | Successor to S | H.264/H.265, digest auth, HTTPS media, basic motion/tamper analytics | The profile to target `[VERIFIED]` |
| ONVIF Profile G | Edge recording/retrieval | Pulling recorded footage off a device | Relevant for forensic search |
| ONVIF Profile M | Metadata and events for analytics | Consuming *and publishing* analytics metadata | The right interface for our output |
| IEC 62676-6:2026 | Performance testing and grading of real-time video content analysis | A standardised way to *state* how good our analytics is | Published 2026-02-18 `[VERIFIED]` |

ONVIF announced on 2025-10-09 that support for Profile S ends; after 2027-03-31
manufacturers can no longer submit products (or existing products with new
firmware) for Profile S conformance. The stated reason is that Profile S mandates
username-token authentication, which no longer matches current cybersecurity
recommendations. Existing conformant devices keep working until the manufacturer
withdraws the declaration. `[VERIFIED]`
Sources: <https://www.onvif.org/profiles/profile-s/profile-s-deprecation-qna/>,
<https://www.onvif.org/profiles/>

**Consequence for us:** a legacy border estate is overwhelmingly likely to be
Profile S or pre-ONVIF entirely. We must support username-token auth to talk to
what is actually deployed, while a modern security review will flag exactly that.
That tension is a genuine, citable design constraint — and worth an ADR.

IEC 62676-6:2026 is the most useful discovery in this section. It defines grading
for real-time intelligent video content analysis across a "core capability" level
(object detection/classification, stop/start, direction), a "complex capability"
level (which explicitly names *perimeter intrusion detection*, loitering,
person-down, tailgating, abandoned object), and a "degree of difficulty" axis
covering weather extremes, occlusion, and image degradation from mechanical
vibration. 224 pages, from CHF 475. `[VERIFIED]`
Source: <https://webstore.iec.ch/en/publication/59704>

We almost certainly cannot buy it for a hackathon, but **citing it as the
performance framework we would be graded against is free and is the kind of
detail judges notice.**

### 1.2 What an old analogue + DVR estate actually exposes

Analogue cameras cannot speak ONVIF or RTSP at all. The bridge is either the DVR
itself exposing RTSP per channel, or a separate analogue-to-IP video encoder. If
that encoder is ONVIF-conformant, the analogue feeds appear to a VMS as IP
cameras. `[UNCERTAIN]` — this is the consistent account across integrator
documentation rather than a single authoritative source.
Source: <https://www.cctvcameraworld.com/kb/combine-dvr-nvr-into-one-nvr-rtsp-onvif/>

Practical characteristics to design for `[UNCERTAIN]`, drawn from integrator and
vendor documentation:

- **Per-channel RTSP may simply not exist.** Some consumer/prosumer recorders
  offer remote viewing through a proprietary app but expose no per-channel RTSP.
  Source: <https://www.cctvcameraworld.com/kb/combine-dvr-nvr-into-one-nvr-rtsp-onvif/>
- **ONVIF is often off by default,** or enabled globally but not for the account
  you were given.
- **Clock skew breaks ONVIF pairing.** Unsynchronised device time causes ONVIF
  authentication to fail. On a border site with no NTP reachability this is a
  first-order failure mode.
  Source: <https://help.angelcam.com/en/articles/372646-how-to-find-an-rtsp-address-for-an-onvif-compatible-camera-nvr-dvr>
- **URL paths are vendor-specific and undiscoverable without ONVIF.** Hikvision
  uses channel-encoded paths (`/Streaming/Channels/101` main, `/102` sub);
  Dahua uses `/cam/realmonitor?channel=N&subtype=M`. Sub-streams are the
  low-resolution ones.
  Sources: <https://www.visioforge.com/help/docs/dotnet/camera-brands/hikvision/>,
  <https://help.angelcam.com/en/articles/372646-how-to-find-an-rtsp-address-for-an-onvif-compatible-camera-nvr-dvr>
- **RTSP carries video only.** It does not transmit motion, VCA or any other
  analytics metadata to the recorder. Anything the camera already "knows" is not
  available over RTSP. `[UNCERTAIN]`
  Source: <https://supportusa.hikvision.com/support/solutions/articles/17000129064-how-do-i-get-my-rtsp-stream->
- **Connection budget is finite.** Devices cap concurrent remote connections
  (Hikvision NVRs are documented around 128 remote connections at the device
  level). Every extra client — VMS, our analytics, an operator's phone — consumes
  one. `[UNCERTAIN]` for per-camera limits specifically; I could not find a
  manufacturer statement on per-camera concurrent RTSP session limits.
  Source: <https://supportusa.hikvision.com/support/solutions/articles/17000135582-how-to-see-the-number-of-streams-from-an-nvr-error-maximum-number-of-streams>

**The architectural answer to the connection budget is a restreamer.** `go2rtc`
(MIT licence) connects to a source once and re-broadcasts to unlimited clients,
accepting RTSP/RTMP/ONVIF/MJPEG in and emitting RTSP/WebRTC/HLS/MP4/MJPEG out,
with FFmpeg transcoding only when a client needs a format the source cannot
provide. `[VERIFIED]` for the capability and licence.
Source: <https://github.com/AlexxIT/go2rtc>

Frigate NVR uses go2rtc for exactly this, and copies the video feed without
re-encoding when restreaming. Its pipeline — cheap motion detection first, then
object detection only on candidate frames, then event clipping — is a directly
reusable reference architecture and is open source. `[VERIFIED]`
Sources: <https://docs.frigate.video/configuration/restream/>,
<https://docs.frigate.video/guides/configuring_go2rtc/>

### 1.3 Transcoding cost

`[NOT FOUND]` — I could not source a defensible CPU-cost-per-stream figure for
software transcoding of surveillance video. Do not put a number in the deck.

What *is* verified and load-bearing:

- Decode is unavoidable — you cannot run a detector on compressed bytes. Re-encode
  is avoidable and is where the cost sits, so **pass through, never transcode**,
  unless a client demands a format the source cannot produce.
- **Jetson Orin Nano has no hardware video encoder.** The datasheet lists
  "Video Encode: 1080p30 Supported via CPU Cores with Software". Decode is
  hardware: up to 1×4K60, 2×4K30, 5×1080p60 or 11×1080p30 (H.265). `[VERIFIED]`
  Source: <https://connecttech.com/ftp/pdf/nvidia_jetson_orin_datasheet.pdf>

That single line has real design consequences: if the platform is expected to
produce evidence clips at the edge on an Orin Nano, clip production competes with
inference for CPU. Cutting clips by **stream copy** (remux, no re-encode) sidesteps
it entirely and should be the default.

### 1.4 Real-world integration failure modes to design against

| Failure | Why it happens | Mitigation |
| --- | --- | --- |
| ONVIF discovery finds nothing | Legacy/analogue device, ONVIF disabled, or WS-Discovery blocked across subnets | Manual URL entry as a first-class path, plus a per-vendor URL template library |
| ONVIF auth fails | Device clock skew; username-token vs digest mismatch | NTP check in onboarding; support both auth modes |
| Stream drops and never recovers | Flaky link, camera reboot, DVR session cap | Supervised reconnect with backoff; treat "stream down" as an alertable event, not a silent gap |
| Only a low-resolution sub-stream is available | Main stream reserved by the VMS, or bandwidth-limited | Accept it; sub-stream resolution is often below the detection floor (see §2.3) — surface the limitation rather than hide it |
| Analytics competes with the VMS for the camera | Finite connection budget | Restream once, fan out locally |
| Frames arrive but timestamps are wrong | No NTP; DVR clock drift | Stamp on ingest, not from the source; record both |

---

## 2. Detection models on degraded feeds

### 2.1 Current generation

All COCO figures below are `[VERIFIED]` from the cited source. **COCO mAP is a
clean-data number and is not what you will get on a border feed** — see §2.2/§2.3.

| Family | Best figures found | Latency | Licence | Hackathon feasibility |
| --- | --- | --- | --- | --- |
| **YOLO26** (Ultralytics, Jan 2026) | n 40.9 / s 48.6 / m 53.1 / l 55.0 / x 57.5 mAP50-95 @640 | T4 TensorRT 1.7 / 2.5 / 4.7 / 6.2 / 11.8 ms | **AGPL-3.0** or commercial | **High** — best tooling, NMS-free and DFL-free simplifies deployment. Licence is the catch |
| **RT-DETR** (Baidu, CVPR 2024) | R18 46.5 AP / R50 53.1 / R101 54.3 | 217 / 108 / 74 FPS, T4 TensorRT FP16 @640 | **Apache-2.0** | **Medium** — permissive licence, less turnkey tooling |
| **RT-DETRv2** (Jul 2024) | S 48.1 / M 51.9 / L 53.4 / X 54.3 AP | 217 / 145 / 108 / 74 FPS, same conditions | Apache-2.0 | Medium |
| **RF-DETR** (Roboflow, ICLR 2026) | N 48.4 / S 53.0 / M 54.7 / L 56.5 AP | 2.3 / 3.5 / 4.4 / 6.8 ms, T4 TensorRT FP16 bs=1 | Apache-2.0 (open tiers); XL/2XL under PML 1.0 | **Medium-high** — best accuracy-per-latency at a permissive licence |

Sources: <https://docs.ultralytics.com/models/yolo26/>,
<https://github.com/lyuwenyu/RT-DETR>,
<https://github.com/roboflow/rf-detr>,
<https://docs.ultralytics.com/models/rtdetr/>

**Licence warning, and it is not academic.** Ultralytics YOLO models are AGPL-3.0
or commercial. `[VERIFIED]` from the Ultralytics docs. For a hackathon demo AGPL
is fine. For anything that is described to judges as deployable by a government
force, AGPL-3.0 is a live procurement question. **The Apache-2.0 alternatives
(RT-DETR, RT-DETRv2, RF-DETR open tiers) reach comparable accuracy and cost
nothing to prefer.** If the team wants one defensible technical decision to write
an ADR about, this is a good candidate.

### 2.2 What compression does to accuracy — real numbers

This is the best-evidenced part of the degradation story.

| Finding | Number | Source |
| --- | --- | --- |
| CNN performance across pose estimation, segmentation, detection, action recognition and depth degrades significantly below JPEG quality 15%, and at H.264 CRF 40 | thresholds, not a single mAP | Zanjani et al. / ICPR 2020, arXiv:2007.14314 `[VERIFIED]` |
| Retraining on pre-compressed imagery recovers performance by up to **78.4%** in some cases | 78.4% recovery | same, `[VERIFIED]` |
| Detection is robust to *moderate* compression: CRF 37 instead of CRF 22 gives large bitrate savings without adversely affecting detection | qualitative | Impact of Video Compression on Object Detection for Surveillance, 2022-11-10, arXiv:2211.05805 `[VERIFIED]` |
| Retraining YOLOv5 on compressed imagery: up to **1%** F1 improvement on highly compressed footage | 1% F1 | same, `[VERIFIED]` |
| Degradation concentrates in complex scenes with poor lighting and fast-moving targets | qualitative | same, `[VERIFIED]` |

Sources: <https://arxiv.org/abs/2007.14314>, <https://arxiv.org/abs/2211.05805>

**Read this carefully, because it cuts against the intuitive story.** Moderate
compression is *not* the problem — CRF 37 is fine. The cliff is steep and late
(JPEG q<15, CRF≈40). If our differentiator is "we handle compressed video", the
evidence only partially supports us. The stronger, better-evidenced claims are
**low light** and **pixels-on-target** (below).

The actionable finding is the 78.4% recovery figure: **fine-tuning on degraded
imagery is the highest-leverage cheap intervention available**, and it is
achievable in a hackathon by augmenting a public dataset with a compression and
low-light augmentation pipeline.

### 2.3 The pixels-on-target floor — a hard physical limit

IEC 62676-4 defines DORI pixel densities `[VERIFIED]`:

| Operational requirement | px across a face | px/m | What it means |
| --- | --- | --- | --- |
| Detection | 4 | **25** | Determine whether any individual is present |
| Observation | 10 | 63 | Count people, see distinctive clothing |
| Recognition | 20 | 125 | Is this the same person seen before |
| Identification | 40 | 250 | Identify an individual |

Source: <https://www.axis.com/dam/public/b2/d9/29/pixel-density-en-US-403691.pdf>
(Axis, May 2023, citing IEC 62676-4)

Two caveats, both from the same document and both `[VERIFIED]`:

1. These figures are **defined for human operators viewing video**. Axis states
   explicitly that for video analytics or other software-based image analysis,
   other definitions apply, and that thermal imaging defines requirements
   differently. **Do not present DORI as an AI detection threshold.** Present it
   as the site-survey language the customer already uses.
2. It is a simplified model; light direction, optics quality and compression all
   move the real answer.

`[DERIVED]` from the 25 px/m detection level: a 1.8 m adult at the detection
threshold occupies roughly 45 px of image height. A person below roughly that
height in frame is outside what the standard treats as reliably detectable by a
human, and a detector trained at 640×640 will be working with a very small number
of pixels. This is the number that decides whether a given camera is usable for a
given zone — and it is a **camera geometry** answer, not a model answer.

**This is the single most useful framing in this document.** The problem statement
forbids us from specifying hardware. It does not forbid us from *telling the
operator which of their existing cameras can and cannot support which analytic*.
A per-camera capability assessment at onboarding is buildable, defensible, cites
an international standard, and directly answers "using existing CCTV
infrastructure".

### 2.4 Low light and night

`[UNCERTAIN]` — I could not find a clean, well-sourced "same model, day vs night,
X% mAP drop" figure. The commonly repeated comparison (YOLOv3 at 21.35 mAP on
ExDark vs 57.9 on COCO) appears only in secondary sources and compares different
datasets with different class sets, which makes it close to meaningless as a
degradation measure. **Do not use it.**

What is `[VERIFIED]`: in the YOLA paper's ablation on ExDark, a fine-tuned
detector baseline reaches 72.5 mAP50 and their illumination-invariant module
raises it to 75.2; on DarkFace, 62.1 → 67.4. Those are fine-tuned-on-dark numbers,
so they measure the value of the technique, not the size of the night penalty.
Source: <https://arxiv.org/abs/2410.18398> (submitted 2024-10-24)

Also `[VERIFIED]` and directly relevant: research on low-light enhancement finds
that enhancement optimised for *human* visual appeal does not reliably help
machine detection — LLIE methods underperform end-to-end approaches that account
for machine perception. Source: same paper.

**Implication:** "we run a night-vision enhancement filter before the detector" is
a weak claim and the literature partly contradicts it. Training or fine-tuning on
dark/IR data, or fusing a thermal channel, is the better-supported route.

---

## 3. Edge inference

| Platform | Compute | Power | Price | Streams | Status | Hackathon feasibility |
| --- | --- | --- | --- | --- | --- | --- |
| **Jetson Orin Nano 8GB (Super)** | 67 sparse / 33 dense INT8 TOPS after the Super boost (was 40/20); 1024 CUDA + 32 Tensor cores; 102 GB/s | 7W / 15W / 25W modes | **$249** (was $499) as of 2024-12-17 | Decode 11×1080p30 H.265; **DeepStream guidance: 4 streams total** with PeopleNet 2.6 | Current | **High** if the team already owns one. Do not plan to buy hardware for a hackathon |
| **Jetson Orin NX 8 / 16** | — | — | — | DeepStream: NX8 4 streams total; NX16 4 per DLA (8 total) | Current | Medium |
| **Jetson AGX Orin** | — | — | — | DeepStream: up to 8 streams per DLA (16 total) | Current | Low — cost |
| **Hailo-8 M.2** | 26 TOPS; PCIe Gen3 ×4 (Key M) or ×2 | ~2.5W typical `[VENDOR CLAIM]` | ~$200 `[UNCERTAIN]` | Model-zoo FPS below | Current | Medium — needs the host, the driver stack and the Dataflow Compiler |
| **Hailo-10H** | 40 TOPS INT4 / 20 INT8, 8 GB on-module `[UNCERTAIN]` | ~2.5W `[UNCERTAIN]` | `[NOT FOUND]` | ~8 streams `[VENDOR CLAIM]`, via a reseller blog | Newer | Low — least verifiable |
| **Intel Neural Compute Stick 2** | — | — | — | — | **EOL.** Last shipment 2022-06-30; OpenVINO support capped at 2022.3.1 LTS | **Rule out** |
| **Google Coral Edge TPU** | — | — | — | — | Official support wound down; drivers open-sourced; PCIe GASKET driver problematic on modern kernels | **Rule out for new work** `[UNCERTAIN]` |

Sources: <https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/> (2024-12-17),
<https://connecttech.com/ftp/pdf/nvidia_jetson_orin_datasheet.pdf>,
<https://docs.nvidia.com/moj/deepstream/deepstream.html>,
<https://hailo.ai/products/ai-accelerators/hailo-8-m2-ai-acceleration-module/>,
<https://www.intel.com/content/www/us/en/support/articles/000091265/software.html>,
<https://github.com/blakeblackshear/frigate/discussions/18564>

**Hailo-8 model zoo, official figures** `[VERIFIED]` (640×640×3, FPS at batch 1 /
batch 8, mAP as compiled for Hailo-8):

| Model | mAP | FPS bs=1 | FPS bs=8 |
| --- | --- | --- | --- |
| yolov8n | 37.0 | 1036 | 1036 |
| yolov8s | 44.6 | 491 | 491 |
| yolov8m | 49.9 | 66.9 | 149 |
| yolov11n | 39.0 | 185 | 541 |
| yolov11s | 46.3 | 111 | 303 |
| yolov11m | 51.1 | 50.2 | 102 |
| yolov5s | 35.3 | 543 | 543 |
| yolov5m | 42.6 | 156 | 156 |

Source: <https://github.com/hailo-ai/hailo_model_zoo/blob/master/docs/public_models/HAILO8/HAILO8_object_detection.rst>

Caveat that matters: these are measured over four-lane PCIe. A host with only a
one-lane slot (e.g. Raspberry Pi 5) will not reach them. `[UNCERTAIN]`, from the
Hailo community forum and the Raspberry Pi forums.

### 3.1 The number that actually decides the architecture

**Decode is not the bottleneck; inference is.** Orin Nano decodes 11×1080p30 in
hardware `[VERIFIED]` but NVIDIA's own DeepStream guidance for the Jetson platform
services is **4 streams total** on Orin Nano with PeopleNet 2.6, and **one stream
by default** with YOLOv8s. `[VERIFIED]`
Source: <https://docs.nvidia.com/moj/deepstream/deepstream.html>

NVIDIA notes these are maxima derived from accelerator capacity and batch
configuration, not validated throughput at a specific resolution and frame rate.

`[DERIVED]`: at roughly 4 streams per $249 device, an edge-only architecture costs
on the order of **$60 per camera in compute alone**, before the host, enclosure,
power and mounting. For an estate of any size that is a real number, and it is the
honest answer to "why not just put a Jetson at every camera".

**The architecture this argues for** is not "edge everywhere" but *motion-gated,
frame-sampled inference*: cheap motion/background subtraction on every stream
continuously, detector only on candidate frames, so one device covers far more
than 4 cameras because most cameras are static most of the time. This is exactly
what Frigate does `[VERIFIED]` and it is the design we should copy.

---

## 4. The false-positive problem

This is the section that most directly tests **assumption 5** in the problem
analysis. The evidence substantiates it strongly.

### 4.1 Published evidence from real border deployments

| Finding | Number | Source |
| --- | --- | --- |
| US ISIS / America's Shield Initiative assessment: share of sensor alerts that were false alarms | **90%** | US Government report, cited in IDSA Issue Brief, 2017-10-05 `[VERIFIED]` |
| Share of sensor alerts along the Mexican border resulting in an apprehension | **2%** | same `[VERIFIED]` |
| Same figure, Canadian border | **<1%** | same `[VERIFIED]` |
| SBInet DHS assessment findings | "a large number of false alarms", line-of-sight constraints, unreliable information transmission, equipment malfunction | same `[VERIFIED]` |
| SBInet cost escalation before cancellation | **US$1.4 billion** | same `[VERIFIED]` |
| Spend on ISIS + America's Shield Initiative before abandonment (1997–2006) | **US$439 million** | same `[VERIFIED]` |
| GAO on SBInet P-28: sensors and radars accidentally triggered by environmental factors such as heavy rains | qualitative | `[UNCERTAIN]`, secondary reporting of GAO findings |

Sources: Pushpita Das, *Comprehensive Integrated Border Management System: Issues
and Challenges*, IDSA Issue Brief, 2017-10-05 —
<https://www.idsa.in/system/files/issuebrief/ib_comprehensive-integrated-border-management-system_pdas.pdf>;
<https://www.gao.gov/products/gao-18-119>

The same IDSA brief identifies the Indian-context risks directly `[VERIFIED]`:
high-tech surveillance devices already deployed by the BSF are not optimally used
because technical expertise is not uniformly available; spare parts are not easily
available; erratic power supply and adverse climate and terrain could undermine
the system; and centralised decision-making could hamper the quick, decentralised
response that interception actually requires. Its conclusion is that a mix of
trained manpower and *affordable, tested* technology beats high-cost novel
technology.

**That conclusion is not hostile to our project — it is a specification for it.**
A cheap, software-only layer over cameras that already exist, which reduces
operator load rather than replacing the operator, is precisely the thing the brief
argues for. Framing the pitch this way is both more honest and more persuasive
than "AI replaces the sentry".

### 4.2 Published evidence that benchmark numbers do not transfer

| Finding | Number | Source |
| --- | --- | --- |
| Same-dataset average AUC across CLIP, DINOv2, ResNet-50, EfficientNet-B0 on UCSD Ped1/Ped2, CUHK Avenue, ShanghaiTech | **0.704** | arXiv:2606.29506, 2026-06-28 `[VERIFIED]` |
| Cross-dataset average AUC (same models, different scene) | **0.499** — chance | same `[VERIFIED]` |
| DINOv2 best same-dataset AUC (Ped2) | up to 0.901, with the largest cross-dataset drop | same `[VERIFIED]` |
| False alarms per hour at a favourable operating point | **≈31,931/hour** | same `[VERIFIED]` |
| Cross-dataset gap reproduced with a PaDiM-style Mahalanobis detector | 0.202 vs 0.208 (nearest-neighbour) | same `[VERIFIED]` |

Source: *Benchmark AUC Is Not Deployable Reliability: A Cross-Dataset Audit of
Off-the-Shelf Features for Surveillance Video Anomaly Detection*,
<https://arxiv.org/abs/2606.29506>

**This is the most important paper in this document.** It says that a
scene-calibrated anomaly detector transferred to a new camera performs no better
than random. For a platform that must work across a heterogeneous camera estate,
that is close to an existential finding — and it argues hard for **per-camera
calibration as a first-class product feature**, not a deployment afterthought.

### 4.3 Acceptable-alarm-rate targets

`[UNCERTAIN]`. Secondary sources cite NPSA guidance of **five alarms per day per
kilometre in good weather**, rising in extreme weather, as an acceptable PIDS
false alarm rate. The NPSA PDF and page both returned HTTP 403 to automated
fetching, so **this is unverified and must be confirmed from the NPSA guide before
it is quoted anywhere.**
Source (secondary): <https://www.npsa.gov.uk/building-protection/video-surveillance-access-control-detection-control-rooms/perimeter-intrusion-detection-pids>

### 4.4 Techniques that reduce false alarms

| Technique | Mechanism | Evidence | Hackathon feasibility |
| --- | --- | --- | --- |
| **Motion gating** | Run the detector only on frames where cheap pixel-change detection fires | Frigate's production design: OpenCV motion detection → detector → event clipping `[VERIFIED]` | **High** — biggest single win, hours of work |
| **Track-before-alert / multi-frame confirmation** | Promote a track to "confirmed" only after N consecutive matched frames, killing single-frame false positives | Both ByteTrack and BoT-SORT implement a `minimum_consecutive_frames` confirmation policy `[VERIFIED]` | **High** — library-provided |
| **Two-pass low-confidence association** | ByteTrack matches high- then low-confidence boxes, recovering objects the detector scored low due to blur/occlusion without admitting noise | `[VERIFIED]` | High |
| **Zone / line logic** | Alert only on crossing an operator-drawn boundary, not on mere presence | Standard practice; IEC 62676-6 grades "perimeter intrusion detection" as a named complex capability `[VERIFIED]` | **High** — and it is what makes the demo *look* like a border product |
| **Temporal smoothing over N frames** | Require k anomalous frames in a window before alerting | Reported as part of a combination reaching 0.9–1.5% FAR with 4–5% missed-incident rate `[UNCERTAIN]` — secondary source, no primary paper found | High to implement, evidence weak |
| **Model ensembling / consensus voting** | Agreement across model families | `[UNCERTAIN]` — asserted in vendor/blog sources only | Low — cost per stream multiplies |
| **VLM re-verification** | Second-stage semantic check on the alert frame | See §5 | Medium-high |
| **Per-camera calibration** | Learn each scene's normal before alerting | Implied by the cross-dataset collapse in §4.2 | Medium — needs a normal-behaviour capture period |

Sources: <https://trackers.roboflow.com/latest/trackers/bytetrack/>,
<https://trackers.roboflow.com/develop/trackers/botsort/>,
<https://docs.frigate.video/configuration/restream/>

---

## 5. Vision-language models for triage

### 5.1 Can a VLM verify a detection?

Yes, and there is a directly relevant published system. **Cerberus** (arXiv
2510.16290, 2025-10-18) is a two-stage cascade: it learns normal behavioural rules
offline, then at inference combines lightweight filtering with fine-grained VLM
reasoning, using motion-mask prompting and rule-based deviation detection. It
reports **57.68 fps on an NVIDIA L40S**, a **151.79× speedup** over baseline VLM
approaches, at **97.2% accuracy** comparable to state-of-the-art VLM-based video
anomaly detection across four datasets. `[VERIFIED]`
Source: <https://arxiv.org/abs/2510.16290>

Note what that architecture is: the VLM is *not* watching video. It is invoked on
a filtered subset. **That is the design to copy.** A VLM on every frame of every
camera is not affordable at any scale; a VLM on every *candidate alert* is.

### 5.2 Cost of API-based VLM verification

All inputs `[VERIFIED]` from Anthropic documentation; the totals are `[DERIVED]`.

Claude prices images at `⌈width/28⌉ × ⌈height/28⌉` visual tokens. Standard-tier
models cap at 1568 visual tokens and a 1568 px long edge; high-resolution-tier
models (Claude 4.7 and later) cap at 4784 tokens and 2576 px. A 1920×1080 frame
costs **1560 tokens** on the standard tier (downsized to 1456×819) and **2691
tokens** on the high-resolution tier (not resized).
Source: <https://platform.claude.com/docs/en/build-with-claude/vision>

| Model | Input $/MTok | Output $/MTok | 1080p frame | Est. cost per verification (1 frame + ~200 prompt + ~150 output tokens) |
| --- | --- | --- | --- | --- |
| Claude Haiku 4.5 | $1.00 | $5.00 | 1560 tok | **≈ $0.0025** `[DERIVED]` |
| Claude Sonnet 5 | $3.00 | $15.00 | 2691 tok | **≈ $0.011** `[DERIVED]` |
| Claude Opus 5 | $5.00 | $25.00 | 2691 tok | **≈ $0.017** `[DERIVED]` |

`[DERIVED]` at 1,000 alerts/day estate-wide: roughly **$2.50/day on Haiku 4.5**,
**$17/day on Opus 5**. The Batch API runs asynchronously at 50% cost — useful for
overnight review queues, useless for live triage.
Model IDs and pricing source: Anthropic model/pricing reference, cached 2026-06-24;
Batch discount stated in the same reference.

**Cost is not the blocker. Connectivity is.** A border outpost with constrained or
intermittent uplink cannot depend on a cloud API for a real-time alert path. The
defensible design is: local detection always; VLM verification as an *enrichment*
that degrades gracefully to "unverified" when offline.

### 5.3 Latency

`[NOT FOUND]` for API round-trip latency on a single-image verification call. Do
not put a latency number in the deck without measuring it yourselves — it is a
ten-minute experiment and the measured number will be worth more than a citation.

`[VERIFIED]` local datapoint: Cerberus at 57.68 fps on an L40S. An L40S is a
data-centre GPU, not an edge device, so this does not transfer to a Jetson.

### 5.4 Local VLMs

`[UNCERTAIN]` throughout. SmolVLM (2B) reports prefill throughput 3.3–4.5× and
generation throughput 7.5–16× faster than Qwen2-VL. Moondream is ~1.8B and is
claimed to run in ~2 GB of memory; Moondream 3 is a 9B MoE with ~2B active
parameters aimed at detection and visual grounding.
Sources: <https://arxiv.org/html/2504.05299v1>, <https://moondream.ai/>

I found **no reliable tokens-per-second figures for these models on Jetson Orin
hardware.** `[NOT FOUND]` — treat local-VLM-at-the-edge as unproven for this
project until measured.

---

## 6. Datasets

| Dataset | Content | Size | Licence | Hackathon feasibility |
| --- | --- | --- | --- | --- |
| **MEVA** | Person and vehicle activities, indoor/outdoor, multi-view, **EO + paired thermal IR**, plus UAV; collected at a military urban training centre with 100+ actors | 328 h ground (516 GB) + 4.6 h UAV; 64 h evaluation and 120.2 h training annotations | **CC BY-4.0** | **Highest relevance.** Free on AWS Public Datasets. Size is the problem — pull a subset `[VERIFIED]` |
| **HIT-UAV** | High-altitude UAV thermal infrared; Person, Car, Bicycle, OtherVehicle, DontCare; oriented + standard boxes; flight metadata (60–130 m altitude) | 2,898 images from 43,470 frames, 640×512 | **CC BY 4.0** | **High** — small, thermal, aerial, permissive. Best single choice for a thermal demo `[VERIFIED]` |
| **LLVIP** | Paired visible + infrared, night-time street scenes, pedestrians, strictly aligned | 30,976 images / 15,488 pairs | Free for **academic and non-commercial** use only | **High** for demo, **blocks commercialisation** `[VERIFIED]` |
| **VisDrone** | Aerial/drone detection and tracking | — | **CC BY-NC-SA 3.0**, academic only | Medium — non-commercial `[UNCERTAIN]` on exact version terms |
| **DOTA** | Aerial imagery object detection | — | Academic/non-commercial only | Medium `[UNCERTAIN]` |
| **VIRAT** | Ground and aerial surveillance for activity detection; 2–30 Hz, **10–200 px person height** | — | `[NOT FOUND]` — terms not verified | Medium — the person-height range makes it unusually realistic for our problem `[VERIFIED]` for the spec, licence unverified |
| **ExDark** | Low-light, 12 classes | 7,363 images (3,000 train / 1,800 val / 2,563 test) | `[NOT FOUND]` | Medium `[VERIFIED]` for the split |
| **KAIST Multispectral Pedestrian** | Colour-thermal pairs from a vehicle | ~95k pairs, 640×480, 20 Hz; 103,128 annotations | `[NOT FOUND]` | Medium — automotive viewpoint, not CCTV `[UNCERTAIN]` |
| **Teledyne FLIR Free ADAS Thermal** | RGB + thermal pairs, 640×512 | aligned subset: 4,129 train / 1,013 test | Requires a request form | Medium — automotive viewpoint `[UNCERTAIN]` |
| **UCF-Crime / ShanghaiTech / Avenue / UCSD Ped** | Anomaly-detection benchmarks | — | varies | **Use with care** — §4.2 shows cross-scene transfer collapses to chance |

Sources: <https://mevadata.org/>,
<https://www.nature.com/articles/s41597-023-02066-6>,
<https://github.com/bupt-ai-cz/LLVIP>,
<http://aiskyeye.com/data-protection/>,
<https://docs.ultralytics.com/datasets/detect/visdrone>,
<https://viratdata.org/>

**Recommendation:** MEVA (CC BY-4.0, EO+thermal, outdoor, perimeter-like) is the
best licence/relevance combination available and is the one to build the demo on.
HIT-UAV as the thermal complement. Avoid building anything the team intends to
commercialise on VisDrone, DOTA or LLVIP.

**`[NOT FOUND]`: no public dataset of Indian border CCTV footage.** There is no
substitute for this and we should not pretend otherwise. Railway trespass and
foreign-object-intrusion research exists and is conceptually close, but the
datasets in those papers are private.

---

## 7. Bandwidth

### 7.1 What a stream costs

| Configuration | Bitrate | Source / status |
| --- | --- | --- |
| 1080p uncompressed, 30 fps | ~1 Gbit/s | Axis `[VENDOR CLAIM]` |
| 1080p H.264, 30 fps | 2–5 Mbit/s | `[UNCERTAIN]` — consistent across vendor calculators, no single authoritative source |
| 1080p H.265, 15–30 fps | 1–2 Mbit/s | `[UNCERTAIN]`, same |
| H.265 vs H.264 at equal quality | ~40–50% saving | `[UNCERTAIN]`, vendor consensus |
| Axis Zipstream saving | "average of 50% or more" | `[VENDOR CLAIM]` |
| H.264 level 4.1 maximum | 50 Mbit/s | `[VERIFIED]`, Axis bitrate-control white paper |

Sources: <https://whitepapers.axis.com/en-us/bitrate-control-for-ip-video>,
<https://www.axis.com/dam/public/ae/ea/49/axis-zipstream-technology-en-US-396891.pdf>

`[NOT FOUND]` — I could not source a standards-body or independently measured
"typical surveillance bitrate" table. Axis explicitly declines to publish one,
saying bitrate depends on scene complexity, resolution, frame rate, compression
settings and image parameters, and directs users to per-site calculators instead.
**That refusal is itself the honest answer** and should be quoted rather than
papered over with a made-up number.

### 7.2 What event-only architecture saves

`[DERIVED]` from the ranges above. Per camera, continuous 1080p H.264 at 4 Mbit/s:

- 0.5 MB/s → **43.2 GB/day** → **≈1.30 TB/month**
- At 2 Mbit/s H.265: **21.6 GB/day** → **≈648 GB/month**

The 648 GB/month figure independently matches a vendor statement for a 4 MP camera
at ~2 Mbit/s H.265, which is a useful cross-check.
Source: <https://www.sighthound.com/blog/what-edge-ai-means-in-video-surveillance>

`[DERIVED]`, assuming 100 events/camera/day:

| Architecture | Per camera per day | vs continuous 4 Mbit/s | Reduction |
| --- | --- | --- | --- |
| Continuous stream to centre | 43,200 MB | baseline | — |
| Event clips: 10 s of 1080p @ 4 Mbit/s, stream-copied | ~500 MB | 1.2% | **≈98.8%** |
| Event metadata + one JPEG thumbnail (~50 KB) | ~5 MB | 0.012% | **≈99.99%** |

Vendor sources claim "well over 99%" for metadata-only, and 6.3×–13× for edge
filtering approaches. `[VENDOR CLAIM]` / `[UNCERTAIN]`.
Source: <https://www.sighthound.com/blog/what-edge-ai-means-in-video-surveillance>

### 7.3 The number that decides edge vs centre

`[DERIVED]`: **10 cameras at 4 Mbit/s each requires 40 Mbit/s of sustained
upstream**, 24 hours a day, with no headroom. Fifty cameras requires 200 Mbit/s.

This is what tests **assumption 3** in the problem analysis. If a border outpost's
uplink cannot sustain that — and the IDSA brief's account of erratic power and
adverse terrain suggests it often cannot — then centralised cloud inference is
architecturally ruled out and edge inference is not a preference but a
requirement. **Confirming the actual uplink at a representative site is the single
most valuable unknown left in the project**, because it decides the architecture.

---

## 8. What is NOT feasible in 36 hours

Stated explicitly, because scoping errors are the usual cause of hackathon
failure. Each of these is a genuine capability we might want; none of them is
buildable well in the time.

| Not feasible | Why | What to do instead |
| --- | --- | --- |
| **Training a detector from scratch** | Days of GPU time; needs data we do not have | Fine-tune a pretrained model, or run pretrained COCO weights (person/vehicle are already COCO classes) |
| **Beating benchmark numbers on any model** | Research-scale work | Use published weights; compete on the system, not the model |
| **Multi-camera / cross-camera re-identification tracking** | Hard problem, needs calibration and a re-ID model, fails visibly in demos | Single-camera tracking with ByteTrack; mention cross-camera as roadmap |
| **Testing against real legacy DVR hardware** | We will not have any | Simulate an estate with go2rtc/MediaMTX republishing recorded files as RTSP at realistic bitrates and resolutions; be explicit in the demo that it is simulated |
| **Genuine thermal/IR fusion** | Needs paired, registered data and a fusion model | Show thermal as a *separate* stream type handled by the same pipeline (HIT-UAV) |
| **Meaningful false-alarm-rate measurement** | Requires hours of continuous real footage and ground truth | Report precision/recall on a held-out public set, and be honest that it is not a deployment FAR |
| **A local VLM on edge hardware** | No verified performance data on Jetson (§5.4); high risk of burning hours on quantisation | API VLM as an optional enrichment, with an offline fallback path |
| **Buying and provisioning edge hardware** | Lead time, and the demo must run on what you have | Benchmark on a laptop GPU or Colab; cite the Jetson/Hailo figures in this document for the deployment story |
| **Anything requiring IEC 62676-6** | CHF 475, 224 pages | Cite it as the framework we would be graded against |
| **Per-camera scene calibration learned from normal behaviour** | Needs a capture period per camera | Design the interface for it; demo with a hand-drawn zone |

**What *is* feasible in 36 hours**, and where the differentiation actually lives:

1. Ingest arbitrary RTSP with a restreamer, manual-URL fallback, and supervised
   reconnect. Treat "stream down" as an alert.
2. Motion-gated detection with a pretrained model, plus ByteTrack with
   multi-frame confirmation.
3. Operator-drawn zones and line-crossing logic.
4. A **per-camera capability assessment at onboarding** using DORI pixel density —
   tell the operator which of their existing cameras can support which analytic.
   This is the answer to "using existing CCTV infrastructure" and nobody else will
   build it.
5. Optional VLM verification on the alert frame, degrading gracefully offline.
6. Event-only output with the bandwidth arithmetic from §7 shown.

---

## Hardest technical risks

Ordered by how much damage they do if we get them wrong.

1. **Cross-scene generalisation collapse.** An anomaly/behaviour model calibrated
   on one camera performs at chance on another (AUC 0.704 → 0.499, arXiv:2606.29506
   `[VERIFIED]`). A platform for a heterogeneous estate is exactly the case this
   breaks. It forces per-camera calibration into the product, and it means any
   demo number we quote from one scene is not evidence about another.

2. **The false-alarm ceiling is the product.** 90% of alerts false and 2%
   producing an apprehension is the historical record for exactly this application
   (`[VERIFIED]`, IDSA/US government). Two multi-hundred-million-dollar programmes
   died of it. If our alerts are not trusted, everything else is irrelevant.
   Precision must be the headline metric, not mAP.

3. **Ingestion from genuinely legacy estates.** No ONVIF discovery, no per-channel
   RTSP, clock skew breaking auth, finite connection budgets, sub-streams below the
   detection floor. Each is individually solvable and collectively they are most of
   the engineering. We also cannot test against the real thing.

4. **Pixels on target.** 25 px/m is a physical floor and no model fixes it
   (`[VERIFIED]`, IEC 62676-4 via Axis). Cameras sited for human review of a wide
   area may simply not support automated detection at the ranges that matter. This
   is the most likely source of a demo that works and a deployment that does not.

5. **Compute economics at the edge.** ~4 streams per $249 Orin Nano
   (`[VERIFIED]`), ≈$60/camera in compute alone (`[DERIVED]`), and no hardware
   encoder on that part. Motion gating is not an optimisation here, it is what
   makes the architecture viable.

6. **Bandwidth to any central point.** 40 Mbit/s sustained for ten cameras
   (`[DERIVED]`). If the uplink cannot carry it, centralised inference is dead and
   the whole design must be edge-first. We do not yet know the real figure.

7. **Licence contamination.** Ultralytics YOLO is AGPL-3.0 (`[VERIFIED]`); LLVIP,
   VisDrone and DOTA are non-commercial. A demo built on these cannot become a
   deployable product without rework. Apache-2.0 alternatives exist at comparable
   accuracy and cost nothing to choose now.

8. **Night and weather.** Assumption 2 says quality is poor; the evidence supports
   the low-light half strongly and the compression half only weakly (§2.2). We may
   be differentiating on the wrong axis.

---

## What I could not verify

- **NPSA acceptable false alarm rate** (reported as five alarms/day/km in good
  weather). Both the NPSA page and its PDF returned HTTP 403. **Must be confirmed
  before quoting.**
- **A clean day-vs-night mAP degradation figure** for a single model. The widely
  repeated ExDark-vs-COCO comparison is between different datasets and class sets
  and should not be used.
- **CPU cost of software transcoding** per stream. No defensible figure found.
- **A standards-body or independently measured typical surveillance bitrate
  table.** Axis explicitly declines to publish one and directs users to per-site
  calculators.
- **Per-camera concurrent RTSP session limits** from any manufacturer. Only
  device-level remote-connection limits were found.
- **Hailo-8 street price and Hailo-10H specifications and price.** Only reseller
  and blog sources; the ~$200 Hailo-8 figure and all Hailo-10H figures are
  unverified.
- **Hailo-8 typical power consumption.** The M.2 module product page does not
  state it; the 2.5W figure comes from secondary sources.
- **API VLM round-trip latency** for single-image verification. Measure it.
- **Local VLM throughput on Jetson Orin** for any of SmolVLM, Moondream or
  Qwen3-VL. No reliable figures found.
- **Licence terms for VIRAT, ExDark, KAIST Multispectral and FLIR ADAS.** Only
  MEVA (CC BY-4.0), HIT-UAV (CC BY 4.0), LLVIP (non-commercial), VisDrone
  (CC BY-NC-SA 3.0) and DOTA (non-commercial) were confirmed.
- **Current Jetson Orin Nano Super street price.** $249 is from NVIDIA's
  2024-12-17 announcement; it is 20 months old and unconfirmed for 2026.
- **Whether the SBInet/ISIS false-alarm figures have Indian equivalents.** No
  published Indian operational false-alarm data was found. The IDSA brief is
  from 2017 and predates current CIBMS deployment.
- **The official SIH problem description**, which is still missing from
  [`../problem-space/problem-statement.md`](../problem-space/problem-statement.md).
  Several conclusions here — particularly which events must be detected and where
  compute may live — are provisional until it arrives.
