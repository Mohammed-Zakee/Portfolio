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

/* ============================================================
   PREMIUM PORTFOLIO MODULES: PRELOADER, NEURAL MESH & AI TERMINAL
   ============================================================ */

/* ── Cinematic Preloader Progress ── */
const preloader = document.getElementById('preloader');
const loaderNumber = document.getElementById('loaderNumber');
const loaderBar = document.getElementById('loaderBar');
const loaderStatus = document.getElementById('loaderStatus');

if (preloader && loaderNumber && loaderBar) {
    let count = 0;
    const preloaderInterval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2; // Retro organic variable speed
        if (count >= 100) {
            count = 100;
            clearInterval(preloaderInterval);
            
            loaderNumber.textContent = '100';
            loaderBar.style.width = '100%';
            if (loaderStatus) loaderStatus.textContent = '◆ SYSTEM INITIALIZATION: COMPLETE';
            
            setTimeout(() => {
                preloader.classList.add('loaded');
                
                // Trigger scroll reveals for hero elements with smooth staggers
                document.querySelectorAll('.hero .reveal').forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, index * 80);
                });
            }, 600);
        } else {
            let formattedCount = count < 10 ? '0' + count : count;
            loaderNumber.textContent = formattedCount;
            loaderBar.style.width = count + '%';
            
            // Dynamic logs during terminal boot
            if (count > 30 && count < 65) {
                if (loaderStatus) loaderStatus.textContent = '◆ SYSTEM STATUS: ACTIVE (UTC+5:30)';
            } else if (count >= 65 && count < 90) {
                if (loaderStatus) loaderStatus.textContent = '◆ GRAPHICS CORE: GRID MESH SYNCED';
            } else if (count >= 90) {
                if (loaderStatus) loaderStatus.textContent = '◆ COMPILED INTERACTION NODE...';
            }
        }
    }, 40);
}

/* ── Interactive Particle Neural Network Canvas Backdrop ── */
const canvas = document.getElementById('neuralCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    let particles = [];
    const maxParticles = 55;
    const connectionDist = 110;
    
    let mouse = { x: null, y: null, active: false };
    
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.active = false;
    });
    
    window.addEventListener('resize', () => {
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.r = Math.random() * 1.5 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
            
            // Magnetic attraction loop to custom cursor follower
            if (mouse.active && mouse.x !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    this.x += dx * 0.006;
                    this.y += dy * 0.006;
                }
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Draw mesh links
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let p1 = particles[i];
                let p2 = particles[j];
                let dx = p1.x - p2.x;
                let dy = p1.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < connectionDist) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    let alpha = (1 - dist / connectionDist) * 0.12;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
            
            // Connect nodes magnetically to active mouse pointer
            if (mouse.active && mouse.x !== null) {
                let p = particles[i];
                let dx = p.x - mouse.x;
                let dy = p.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    let alpha = (1 - dist / 140) * 0.2;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`; // Indigo magnetic connections
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* ── Zakee-Bot Terminal AI Dialogue Router ── */
const botToggle = document.getElementById('botToggle');
const botConsole = document.getElementById('botConsole');
const consoleClose = document.getElementById('consoleClose');
const consoleBody = document.getElementById('consoleBody');
const consoleForm = document.getElementById('consoleForm');
const consoleInput = document.getElementById('consoleInput');

if (botToggle && botConsole && consoleClose && consoleBody && consoleForm && consoleInput) {
    
    // Toggle state handlers
    botToggle.addEventListener('click', () => {
        botConsole.classList.toggle('open');
        if (botConsole.classList.contains('open')) {
            consoleInput.focus();
        }
    });
    
    consoleClose.addEventListener('click', () => {
        botConsole.classList.remove('open');
    });
    
    const qaPairs = {
        help: "◆ COMMAND MATRIX:<br>- <strong>about</strong>: General information about Zakee.<br>- <strong>skills</strong>: AI, web, and data skillset.<br>- <strong>education</strong>: SLIIT details & secondary studies.<br>- <strong>experience</strong>: Positions in fintech, invigilation, etc.<br>- <strong>volunteer</strong>: IEEE, UN, FCSC leadership history.<br>- <strong>certifications</strong>: Summary of 15+ industry credentials.<br>- <strong>contact</strong>: Instant contact references.",
        
        about: "Mohammed Zakee Nowfal is an Artificial Intelligence undergraduate student at SLIIT, Malabe, Sri Lanka. He works as a Strategic Partnership Executive in fintech and holds active leadership posts across major student boards (IEEE, FCSC, Majlis). He focuses on merging AI development with executive fintech strategy.",
        
        skills: "Zakee's technical competencies include:<br>• <strong>Languages:</strong> HTML5, CSS3, Javascript (ES6), Python, C++<br>• <strong>AI & Deep Learning:</strong> TensorFlow, Pandas, NumPy, Scikit-learn, Matplotlib<br>• <strong>Platforms:</strong> Git, AWS Academy, IntelliJ IDEA, Figma",
        
        education: "Zakee is pursuing a BSc (Hons) in Information Technology specializing in <strong>Artificial Intelligence</strong> at SLIIT, Malabe. He completed his high school education at Jeddah International School in Jeddah, Saudi Arabia.",
        
        experience: "Zakee's professional ledger details:<br>1. <strong>Strategic Partnership Executive</strong> – Fintech Zone (Mar 2025 – Present)<br>2. <strong>Project Lead</strong> – Fintech Association of Sri Lanka (FASL) (Jun 2024 – Present)<br>3. <strong>Exam Invigilator</strong> – British Council Sri Lanka (May 2025 – Present)<br>4. <strong>Teaching Assistant</strong> – SLIIT Malabe (Jan 2025 – Present)",
        
        volunteer: "Zakee has a significant history of volunteer leadership:<br>• <strong>Assistant Treasurer</strong> – IEEE Student Branch (SB) of SLIIT (2026/27)<br>• <strong>Committee Member</strong> – Faculty of Computing Student Community (FCSC)<br>• <strong>Assistant Treasurer</strong> – Majlis of SLIIT (Muslim Students' Association) (2026/27)<br>• <strong>UN Online Volunteer</strong> – United Nations<br>• <strong>Major Contributions:</strong> EUPHORIA (SIS), RoboMesh, CellSpell, LeadSpring.",
        
        certifications: "Zakee holds over <strong>15 industry-recognized credentials</strong>:<br>• AWS Academy Graduate (Cloud Foundations)<br>• UPenn Wharton (Introduction to Fintech)<br>• Google & Coursera (Foundations of Project Management)<br>• University of Moratuwa (Python for Beginners)<br>• Alison (AI, ML, Neural Networks, Deep Learning)<br>• HP Life (Strategic Planning, Presentations).",
        
        contact: "Get in touch with Zakee immediately:<br>• Email: <a href='mailto:mohammedzakee2006@gmail.com' style='color:#6366f1;text-decoration:underline;'>mohammedzakee2006@gmail.com</a><br>• Phone: <a href='tel:+94762512967' style='color:#6366f1;text-decoration:underline;'>+94 76 251 2967</a><br>• LinkedIn: <a href='https://www.linkedin.com/in/mohammed-zakee/' target='_blank' style='color:#6366f1;text-decoration:underline;'>linkedin.com/in/mohammed-zakee</a>"
    };
    
    // Typist streamer helper
    function appendMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `console-msg ${sender}`;
        
        if (sender === 'bot') {
            msg.innerHTML = '';
            consoleBody.appendChild(msg);
            
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            let nodes = Array.from(tempDiv.childNodes);
            let charIndex = 0;
            let currentNodeIndex = 0;
            
            function typeChar() {
                if (currentNodeIndex < nodes.length) {
                    let node = nodes[currentNodeIndex];
                    if (node.nodeType === Node.TEXT_NODE) {
                        if (charIndex < node.textContent.length) {
                            msg.innerHTML += node.textContent.charAt(charIndex++);
                            setTimeout(typeChar, 3); // fast rendering typing stream
                        } else {
                            charIndex = 0;
                            currentNodeIndex++;
                            setTimeout(typeChar, 6);
                        }
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        msg.appendChild(node.cloneNode(true));
                        currentNodeIndex++;
                        setTimeout(typeChar, 6);
                    }
                } else {
                    consoleBody.scrollTop = consoleBody.scrollHeight;
                }
            }
            typeChar();
        } else {
            msg.textContent = text;
            consoleBody.appendChild(msg);
            consoleBody.scrollTop = consoleBody.scrollHeight;
        }
    }
    
    function processInput(query) {
        const q = query.trim().toLowerCase();
        let reply = "";
        
        if (qaPairs[q]) {
            reply = qaPairs[q];
        } else if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
            reply = "Hello! I am Zakee-Bot. Ask me about Zakee's <strong>about</strong>, <strong>skills</strong>, <strong>education</strong>, <strong>experience</strong>, <strong>volunteer</strong> roles, <strong>certifications</strong>, or <strong>contact</strong>. Type 'help' for commands.";
        } else if (q.includes('work') || q.includes('job') || q.includes('fintech') || q.includes('association') || q.includes('role')) {
            reply = qaPairs.experience;
        } else if (q.includes('study') || q.includes('college') || q.includes('university') || q.includes('sliit') || q.includes('school')) {
            reply = qaPairs.education;
        } else if (q.includes('code') || q.includes('python') || q.includes('programming') || q.includes('tech') || q.includes('ai')) {
            reply = qaPairs.skills;
        } else if (q.includes('cert') || q.includes('course') || q.includes('aws') || q.includes('google')) {
            reply = qaPairs.certifications;
        } else if (q.includes('volunteer') || q.includes('ieee') || q.includes('fcsc') || q.includes('majlis') || q.includes('volunteer')) {
            reply = qaPairs.volunteer;
        } else if (q.includes('mail') || q.includes('phone') || q.includes('linkedin') || q.includes('contact')) {
            reply = qaPairs.contact;
        } else {
            reply = "I parsed your input but don't have a direct answer mapped. Type <strong>about</strong>, <strong>skills</strong>, <strong>experience</strong>, <strong>volunteer</strong>, or <strong>help</strong> to query my knowledge matrix.";
        }
        
        setTimeout(() => {
            appendMessage(reply, 'bot');
        }, 200);
    }
    
    consoleForm.addEventListener('submit', e => {
        e.preventDefault();
        const text = consoleInput.value;
        if (!text) return;
        
        appendMessage(text, 'user');
        consoleInput.value = '';
        processInput(text);
    });
}

/* ── Architectural Console Branding ── */
console.log('%c◆ ZAKEE NOWFAL — PORTFOLIO 2026 ◆', 'color:#e2e8f0;background:#09090b;font-size:14px;font-weight:bold;padding:4px 8px;border:1px solid #27272a;');
console.log('%cDesigned with Swiss architectural principles and high-contrast precision.', 'color:#a1a1aa;font-size:11px;');
