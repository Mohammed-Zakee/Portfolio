# Portfolio demonstrations — 14 November 2026

## Review lab

`assets/verity-lexicon.json` and its browser equivalent mirror the three word sets in https://github.com/Mohammed-Zakee/Verity/blob/main/backend/app.py as fetched on 14 November 2026. The JavaScript port follows the same ASCII/apostrophe tokenization, immediate-previous-word negation and 0.65 / 0.35 thresholds. The score is a positive-signal ratio, not model confidence. No live collection runs and visitor text is neither transmitted nor persisted. DOM output uses textContent rather than interpreting visitor text as HTML.

## Transaction Signals

A new portfolio demonstration, not a historical employer project. `assets/portfolio-lab.js` contains the seeded generator, training-only statistics, scoring and evaluation. Separate training/evaluation seeds and IDs prevent record overlap. The default evaluation yields TP=17, FP=0, FN=5, TN=178 at threshold 2.0, precision 100%, recall 77.3%. These are measurements on artificial data generated from overlapping ranges. They do not establish real-world fraud detection performance. There is no trained machine-learning model, live payment data, or automated financial decision.

Run `node tests/portfolio-lab.test.cjs` for behavior, metric, train/evaluation isolation and monotonic-threshold checks. Synthetic samples are generated locally, can be reproduced without a network, and can be exported from the case study.

## Publication boundaries

Do not publish invented testimonials, project ownership, personal accomplishments, or employer results. Testimonials remain unpublished until actual quotations and permission are supplied. Solo/team labels are used where confirmed by the owner. The owner confirmed QDomains, Boarding Solution, Voice-to-Task and DentAI are solo projects, and Smart Greenhouse involved team leadership, hardware coordination and sensor monitoring. The introduction is a captioned visual overview, not a recorded personal speech.

The current-work section is dated and describes shipped portfolio experiments and stated role interests. Review it when the work changes.
