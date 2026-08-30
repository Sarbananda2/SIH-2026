# Architecture

System design for the platform: what the components are, how data moves between
them, and where each piece runs.

Suitable material:

- Component and data-flow descriptions, with diagrams in
  [`../../assets/diagrams/`](../../assets/diagrams/)
- Ingest, processing, storage, and alerting design
- Deployment topology — what runs at the edge, at a control room, centrally
- Interface and data-format definitions between components
- Non-functional requirements: latency, throughput, retention, availability

Describe the system **as designed or as built**, and say which. A document that
silently mixes aspiration with reality is worse than either alone.

Choices that were contested or expensive to reverse belong in
[`../decisions/`](../decisions/) as ADRs; this directory describes the result.
