# EXP-004 reference handbook

- [Read the complete PDF](EXP-004-Reference-Handbook.pdf)
- [Read the searchable Markdown edition](EXP-004-Reference-Handbook.md)
- [Download/open the HTML edition](EXP-004-Reference-Handbook.html)
- [Open the vector architecture diagram](PR7-architecture.svg)

Prepared November 8, 2026 for Gowtham. The 70-page handbook maps the complete reviewed PR #7 architecture to code, observations and the questions raised during preparation. It includes 30 Q&A entries, all eight exact fixture objects, the complete 61-test inventory and the mapping for all 42 presentation slides. Appendix A preserves the full original architecture text and Mermaid source. Source links use reviewed commit `d1495b9` in gowtham432/orienta; evidence links use this repository's original evidence snapshot `b8a16f6`.

Start with chapters 1–7 for the mental model. Chapters 8–16 trace execution, scoring and results. Chapters 17–21 explain provenance, commands, review boundaries and prerequisites. Chapter 22 is the question index. The appendices preserve source material and provide direct verification links.

The distinctions are intentional: scripted and Groq modes are alternative request drivers; Advisory review is advice while Enforced has a mandatory execution veto; task success and prohibited-call counts have different units. The comparison-only PROCEED failure is retained, and the complete live runs did not demonstrate an incremental prevention benefit.

142 pinned target paths were checked against actual GitHub commit trees. The PDF contains 251 external-link annotations (143 unique URLs including the upstream PR discussion). PDF outline, content sections, page bounds, empty pages and configured credential values were checked. See [PDF validation](PDF-VALIDATION.json), [remote link validation](REMOTE-LINK-VALIDATION.json), and [build identity](BUILD-RECEIPT.json).

Documentation generation and evidence publication did not execute a new Groq pilot, new Core pre-check or proposed P0-1 refund study. The source architecture is historical; its local-only evidence statement and earlier audit totals are explicitly distinguished from this later public evidence publication. The original private Stage 1 attachment is not included.
