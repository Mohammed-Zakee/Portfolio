# Mohammed Zakee (Zakee Nowfal) — Portfolio

A responsive static portfolio focused on AI, software projects, fintech experience, and community leadership.

## Preview
Open `index.html` in a browser, or run `python -m http.server 8080` in this folder and visit `http://localhost:8080`.

## Content
- Six selected projects with category filters and public source/live links where available.
- Actual public-interface screenshots for Verity and Boarding Solution, stored as compressed WebP images.
- Dedicated Verity and Smart Greenhouse case studies covering the problem, implementation, trade-offs, evidence, limitations, and next steps.
- Skill-to-project evidence links and a visible CV-backed team achievement.
- Education, work history, courses, and volunteer details updated from the supplied official 2026 CV.
- The only current resume is `CV Official 2026.pdf`; all download links point to it.
- Additional public projects are linked in the expandable projects section.
- Project descriptions use the CV and reviewed source files; QDomains is explicitly a prototype with simulated availability.
- Follow-up evidence and testimonial-request wording are recorded in `docs/portfolio-evidence.md`.
- Testimonials and individual team ownership are not invented.

## Design and accessibility
Warm neutral/forest theme, alternate dark theme, animated hero details, scroll reveals, and progress indicator. Motion can be paused and respects reduced-motion settings. Content remains readable without JavaScript. Navigation, project filters, labeled form fields, focus indicators, and a skip link support keyboard use.

## Editing
- `index.html`: content, project links, CV links, and existing Formspree form destination.
- `style.css`: base styles plus editorial, animation, and recruiter gallery styles.
- `script.js`: theme preference, motion control, filters, reveal effects, local clock, and active navigation.
- `case-studies/`: standalone case studies and their shared document styling.
- `assets/projects/`: real project screenshots.

Google Fonts and Font Awesome require an internet connection; fallback system fonts remain available. Contact delivery uses the existing Formspree configuration and has not been tested by sending a message. Deploy through GitHub Pages from the repository's `main` branch.
