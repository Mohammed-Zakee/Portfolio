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


## Recruiter refinement — 14 November 2026
- Prioritizes AI/ML and fintech roles, as confirmed by the owner.
- Features Verity prominently and identifies it as a solo project; Smart Greenhouse is identified as team work.
- Offers a 35-second captioned overview with a transcript. It combines a real interface capture with architecture/evidence slides, not an end-to-end scraping demonstration.
- Provides a one-page downloadable project brief and branded 1200 × 630 sharing image.
- Uses a conventional labeled contact form with optional company field and a direct email alternative.
- Keeps supplementary projects, earlier experience, and extended course/community lists in native expandable sections.
- Removes the external icon font and reduces the requested font families. Video uses preload=none and never autoplays.
- Form validation was checked without submitting a message; actual delivery remains untested.


## Sapphire palette and certificate proof
- Navy/blue light and dark palette, straight scrolling focus ribbon, motion-aware pointer depth and certificate interactions.
- QDomains uses the current live URL and a real screenshot of its public interface.
- Fourteen distinct certificates are cataloged in `assets/certificates/catalog.json`; duplicate copies are not counted.
- Only baked-in watermarked image previews are published. The user-selected `/Certificates/` original folder is ignored by Git and remains local.
- No original certificate PDFs or direct original-document URLs are published. Issuer verification pages are external and may have their own display/download options.
- Native accessible dialog supports previous/next browsing, Escape, and focus return. Direct preview-image links work without JavaScript.
- Certificates are described as course completion, job simulation, or appreciation according to the document, not as professional licensure.


## Continuous certificate strip
All 14 certificates travel in a seamless, linear loop. Filtered sets repeat enough times to fill the viewport. Visual duplicates are hidden from assistive technology and carry no duplicate keyboard controls. Pause and grid controls remain available; keyboard navigation switches to a stable grid, and reduced-motion settings use the grid automatically. Certificate originals remain private.
