/* ============================================================
   ZAKEE NOWFAL — PORTFOLIO CORE SCRIPT (SWISS MINIMALIST DARK)
   ============================================================ */

'use strict';

/* ── Custom Smooth Magnetic Cursor ── */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursorDot && cursorRing) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursorDot.style.left = mx + 'px';
        cursorDot.style.top = my + 'px';
    });

    const animCursor = () => {
        // Linear interpolation for smooth trailing follower
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top = ry + 'px';
        requestAnimationFrame(animCursor);
    };
    animCursor();

    // Hover effect class attachments
    const hoverSelectors = 'a, button, .bento-card, .exp-row, .comm-card, .skill-box, .project-item, .social-icon, #backTop';
    document.querySelectorAll(hoverSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('cursor-hover');
        });
    });
}

/* ── Sri Lanka Local Clock Widget (UTC+5:30) ── */
const updateSriLankaTime = () => {
    const timeEl = document.getElementById('localTime');
    if (!timeEl) return;
    
    const now = new Date();
    // Convert current time to UTC and add Sri Lanka offset (UTC + 5:30)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const lkTime = new Date(utc + (3600000 * 5.5));
    
    let hours = lkTime.getHours();
    let minutes = lkTime.getMinutes();
    let seconds = lkTime.getSeconds();
    
    // Pad double digits
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    timeEl.textContent = `${hours}:${minutes}:${seconds} (UTC+5:30)`;
};
setInterval(updateSriLankaTime, 1000);
updateSriLankaTime();

/* ── Navbar Scroll Interactions & Dynamic Active Indicator ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    if (navbar) {
        // Toggle scrolled aesthetic on window scroll
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }

    // Identify active section and highlight corresponding link
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    // Handle scroll cue visibility
    const cue = document.getElementById('scrollCue');
    if (cue) {
        cue.style.opacity = window.scrollY > 80 ? '0' : '1';
        cue.style.pointerEvents = window.scrollY > 80 ? 'none' : 'auto';
    }
});

/* ── Hamburger Menu Toggle ── */
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('navLinks');

if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
        navLinksList.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    // Close menu on navigation click
    navLinksList.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinksList.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
}

/* ── Scroll Cue Smooth Descent ── */
const scrollCue = document.getElementById('scrollCue');
if (scrollCue) {
    scrollCue.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

/* ── Typographic Terminal Typewriter Effect ── */
const roles = [
    'AI Undergraduate',
    'Strategic Partnership Executive',
    'Project Lead @ FASL',
    'Fintech Innovator',
    'IEEE Volunteer Leader',
    'UN Online Volunteer',
    'British Council Invigilator',
    'Multilingual Communicator'
];
const roleEl = document.getElementById('roleText');
let ri = 0, ci = 0, deleting = false, speed = 100;

function type() {
    if (!roleEl) return;

    const word = roles[ri];
    if (deleting) {
        roleEl.textContent = word.slice(0, --ci);
        speed = 50;
    } else {
        roleEl.textContent = word.slice(0, ++ci);
        speed = 100;
    }

    if (!deleting && ci === word.length) {
        speed = 2200; // Time to display completed word
        deleting = true;
    } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        speed = 400; // Pause before next word starts typing
    }
    setTimeout(type, speed);
}
if (roleEl) {
    setTimeout(type, 800);
}

/* ── Scroll Reveal Intersection Observer ── */
const revealObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.classList.add('visible');
            }, i * 50); // Staggering transitions
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Skills Bar Visual Activation ── */
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.style.width = bar.style.getPropertyValue('--target') || '0%';
            });
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.2 });

const skillsWrap = document.querySelector('.skills-wrapper');
if (skillsWrap) {
    skillObs.observe(skillsWrap);
}

/* ── Numerical Counter Animation ── */
const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const target = parseInt(e.target.getAttribute('data-count'), 10);
            let start = 0;
            const step = Math.ceil(target / 30);
            const timer = setInterval(() => {
                start = Math.min(start + step, target);
                e.target.textContent = start;
                if (start >= target) {
                    clearInterval(timer);
                }
            }, 50);
            counterObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObs.observe(el));

/* ── Profile Image Fallback ── */
const profileImg = document.getElementById('profileImg');
if (profileImg) {
    profileImg.addEventListener('error', function () {
        this.src = '';
        this.style.display = 'none';
        
        // Dynamic placeholder if image fails to load
        const ph = document.createElement('div');
        ph.className = 'profile-fallback';
        ph.textContent = 'ZN';
        this.parentElement.appendChild(ph);
    });
}

/* ── Universal Anchor Link Smooth Scrolling ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ── Contact Form Submission Polish ── */
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function () {
        const btn = form.querySelector('.form-submit');
        btn.innerHTML = '<span>Sending... <i class="fas fa-spinner fa-spin"></i></span>';
        btn.style.pointerEvents = 'none';
        
        // Restore button after timeout
        setTimeout(() => {
            btn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
            btn.style.pointerEvents = 'auto';
        }, 3000);
    });
}

/* ── Architectural Console Branding ── */
console.log('%c◆ ZAKEE NOWFAL — PORTFOLIO 2026 ◆', 'color:#e2e8f0;background:#09090b;font-size:14px;font-weight:bold;padding:4px 8px;border:1px solid #27272a;');
console.log('%cDesigned with Swiss architectural principles and high-contrast precision.', 'color:#a1a1aa;font-size:11px;');
