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
const skipPreloader = document.getElementById('skipPreloader');

if (preloader && loaderNumber && loaderBar) {
    let count = 0;
    let bypassed = false;

    function revealCoreSite() {
        if (bypassed) return;
        bypassed = true;
        preloader.classList.add('loaded');
        
        // Trigger scroll reveals for hero elements with smooth staggers
        document.querySelectorAll('.hero .reveal').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 80);
        });
    }

    const preloaderInterval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2; // Retro organic variable speed
        if (count >= 100) {
            count = 100;
            clearInterval(preloaderInterval);
            
            loaderNumber.textContent = '100';
            loaderBar.style.width = '100%';
            if (loaderStatus) loaderStatus.textContent = '◆ SYSTEM INITIALIZATION: COMPLETE';
            
            setTimeout(revealCoreSite, 600);
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

    if (skipPreloader) {
        skipPreloader.addEventListener('click', () => {
            clearInterval(preloaderInterval);
            loaderNumber.textContent = '100';
            loaderBar.style.width = '100%';
            if (loaderStatus) loaderStatus.textContent = '◆ SYSTEM INITIALIZATION: COMPLETE';
            revealCoreSite();
        });
    }
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
            if (document.documentElement.classList.contains('light-theme')) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            }
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
                    if (document.documentElement.classList.contains('light-theme')) {
                        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.8})`;
                    } else {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    }
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
                    if (document.documentElement.classList.contains('light-theme')) {
                        ctx.strokeStyle = `rgba(79, 70, 229, ${alpha * 0.8})`;
                    } else {
                        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                    }
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
        help: "◆ COMMAND MATRIX:<br>- <strong>about</strong>: General information about Zakee.<br>- <strong>skills</strong>: AI, web, and data skillset.<br>- <strong>education</strong>: SLIIT details & secondary studies.<br>- <strong>experience</strong>: Positions in fintech, invigilation, etc.<br>- <strong>volunteer</strong>: IEEE, UN, FCSC leadership history.<br>- <strong>certifications</strong>: Summary of 15+ industry credentials.<br>- <strong>source</strong>: Zakee-Bot's open source code matrix.<br>- <strong>contact</strong>: Instant contact references.",
        
        about: "Mohammed Zakee Nowfal is an Artificial Intelligence undergraduate student at SLIIT, Malabe, Sri Lanka. He works as a Strategic Partnership Executive in fintech and holds active leadership posts across major student boards (IEEE, FCSC, Majlis). He focuses on merging AI development with executive fintech strategy.",
        
        skills: "Zakee's technical competencies include:<br>• <strong>Languages:</strong> HTML5, CSS3, Javascript (ES6), Python, C++<br>• <strong>AI & Deep Learning:</strong> TensorFlow, Pandas, NumPy, Scikit-learn, Matplotlib<br>• <strong>Platforms:</strong> Git, AWS Academy, IntelliJ IDEA, Figma",
        
        education: "Zakee is pursuing a BSc (Hons) in Information Technology specializing in <strong>Artificial Intelligence</strong> at SLIIT, Malabe. He completed his high school education at Jeddah International School in Jeddah, Saudi Arabia.",
        
        experience: "Zakee's professional ledger details:<br>1. <strong>Strategic Partnership Executive</strong> – Fintech Zone (Mar 2025 – Present)<br>2. <strong>Project Lead</strong> – Fintech Association of Sri Lanka (FASL) (Jun 2024 – Present)<br>3. <strong>Exam Invigilator</strong> – British Council Sri Lanka (May 2025 – Present)<br>4. <strong>Teaching Assistant</strong> – SLIIT Malabe (Jan 2025 – Present)",
        
        volunteer: "Zakee has a significant history of volunteer leadership:<br>• <strong>Assistant Treasurer</strong> – IEEE Student Branch (SB) of SLIIT (2026/27)<br>• <strong>Committee Member</strong> – Faculty of Computing Student Community (FCSC)<br>• <strong>Assistant Treasurer</strong> – Majlis of SLIIT (Muslim Students' Association) (2026/27)<br>• <strong>UN Online Volunteer</strong> – United Nations<br>• <strong>Major Contributions:</strong> EUPHORIA (SIS), RoboMesh, CellSpell, LeadSpring.",
        
        certifications: "Zakee holds over <strong>15 industry-recognized credentials</strong>:<br>• AWS Academy Graduate (Cloud Foundations)<br>• UPenn Wharton (Introduction to Fintech)<br>• Google & Coursera (Foundations of Project Management)<br>• University of Moratuwa (Python for Beginners)<br>• Alison (AI, ML, Neural Networks, Deep Learning)<br>• HP Life (Strategic Planning, Presentations).",
        
        source: "◆ REPOSITORY NODE: /zakeebot-core<br>◆ STATUS: <strong>OPEN SOURCE</strong> (MIT license)<br>• Type <strong>code</strong> to view the routing algorithm.<br>• Fork the full website on GitHub: <a href='https://github.com/Mohammed-Zakee/Portfolio' target='_blank' style='color:#6366f1;text-decoration:underline;'>github.com/Mohammed-Zakee/Portfolio</a>",
        
        code: "◆ ZAKEE-BOT CORE NLP ALGORITHM:<br><pre style='background:rgba(0,0,0,0.3);padding:8px;border-radius:4px;font-size:0.7rem;overflow-x:auto;color:#a1a1aa;'>class ZakeeBot {\n  constructor() {\n    this.matrix = QA_PAIRS;\n  }\n  process(query) {\n    let q = query.toLowerCase();\n    return this.matrix[q] ||\n           this.fallbackSearch(q);\n  }\n}</pre>",
        
        contact: "Get in touch with Zakee immediately:<br>• Email: <a href='mailto:mohammedzakee2006@gmail.com' style='color:#6366f1;text-decoration:underline;'>mohammedzakee2006@gmail.com</a><br>• Phone: <a href='tel:+94706103115' style='color:#6366f1;text-decoration:underline;'>+94 706 103 115</a><br>• LinkedIn: <a href='https://www.linkedin.com/in/mohammed-zakee/' target='_blank' style='color:#6366f1;text-decoration:underline;'>linkedin.com/in/mohammed-zakee</a>"
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
        const cleanQ = query.trim().toLowerCase().replace(/[?.!,;:]/g, '');
        let reply = "";
        
        // Exact match
        if (qaPairs[cleanQ]) {
            reply = qaPairs[cleanQ];
        } 
        // Conversational: Feelings / How are you
        else if (
            cleanQ.includes('how are you') || 
            cleanQ.includes('hows it going') || 
            cleanQ.includes('how do you do') || 
            cleanQ.includes('are you ok') || 
            cleanQ.includes('are you fine') || 
            cleanQ.includes('how are things') ||
            cleanQ === 'how are u' ||
            cleanQ === 'how r u'
        ) {
            reply = "I'm doing great, thank you for asking! 😊 I'm fully charged and ready to help you explore Zakee's portfolio. How can I assist you today?";
        } 
        // Conversational: Greetings
        else if (
            cleanQ.includes('hello') || 
            cleanQ.includes('hi') || 
            cleanQ.includes('hey') || 
            cleanQ.includes('yo') || 
            cleanQ.includes('greetings') || 
            cleanQ.includes('sup') ||
            cleanQ.includes('good morning') ||
            cleanQ.includes('good afternoon') ||
            cleanQ.includes('good evening')
        ) {
            reply = "Hello! I am Zakee-Bot, a conversational agent. Ask me about Zakee's <strong>about</strong>, <strong>skills</strong>, <strong>education</strong>, <strong>experience</strong>, <strong>volunteer</strong> roles, <strong>certifications</strong>, or <strong>contact</strong>. Type 'help' to see all commands!";
        } 
        // Conversational: Gratitude / small positive feedback
        else if (
            cleanQ.includes('thank you') || 
            cleanQ.includes('thanks') || 
            cleanQ.includes('appreciate') || 
            cleanQ === 'cool' || 
            cleanQ === 'awesome' || 
            cleanQ === 'great' || 
            cleanQ === 'nice'
        ) {
            reply = "You're very welcome! I'm glad I could help. Let me know if you want to know anything else about Zakee.";
        } 
        // Conversational: Identity / What is this bot
        else if (
            cleanQ.includes('who are you') || 
            cleanQ.includes('what is your name') || 
            cleanQ.includes('what are you') || 
            cleanQ.includes('your name')
        ) {
            reply = "I am Zakee-Bot v1.2, a custom conversational assistant built to share insights about Zakee Nowfal's professional journey and qualifications.";
        } 
        // Conversational: Creator
        else if (
            cleanQ.includes('who created you') || 
            cleanQ.includes('who made you') || 
            cleanQ.includes('who is your developer') || 
            cleanQ.includes('who built you') || 
            cleanQ.includes('who is your creator')
        ) {
            reply = "I was developed by Zakee Nowfal! You can inspect my source code in this very terminal by typing <strong>source</strong> or <strong>code</strong>.";
        } 
        // Conversational: Goodbyes
        else if (
            cleanQ.includes('bye') || 
            cleanQ.includes('goodbye') || 
            cleanQ.includes('see you') || 
            cleanQ.includes('exit') || 
            cleanQ.includes('quit')
        ) {
            reply = "Goodbye! Thanks for chatting. Have a wonderful day! 👋";
        } 
        // Conversational: Jokes / Fun
        else if (
            cleanQ.includes('joke') || 
            cleanQ.includes('tell me a joke')
        ) {
            reply = "Why do programmers wear glasses? Because they can't C#! 💻 Let's keep exploring Zakee's work!";
        } 
        else if (
            cleanQ.includes('weather')
        ) {
            reply = "I don't have real-time internet access to check the weather right now, but things are looking bright here in Zakee's portfolio! ☀️";
        }
        // Portfolio: Experience / Career
        else if (
            cleanQ.includes('work') || 
            cleanQ.includes('job') || 
            cleanQ.includes('career') || 
            cleanQ.includes('fintech') || 
            cleanQ.includes('association') || 
            cleanQ.includes('role') || 
            cleanQ.includes('profession') || 
            cleanQ.includes('experience') ||
            cleanQ.includes('history')
        ) {
            reply = qaPairs.experience;
        } 
        // Portfolio: Education
        else if (
            cleanQ.includes('study') || 
            cleanQ.includes('college') || 
            cleanQ.includes('university') || 
            cleanQ.includes('sliit') || 
            cleanQ.includes('school') ||
            cleanQ.includes('education') ||
            cleanQ.includes('degree')
        ) {
            reply = qaPairs.education;
        } 
        // Portfolio: Skills
        else if (
            cleanQ.includes('code') || 
            cleanQ.includes('python') || 
            cleanQ.includes('programming') || 
            cleanQ.includes('tech') || 
            cleanQ.includes('skill') || 
            cleanQ.includes('ai') || 
            cleanQ.includes('deep learning') || 
            cleanQ.includes('machine learning') || 
            cleanQ.includes('competencies')
        ) {
            reply = qaPairs.skills;
        } 
        // Portfolio: Certifications
        else if (
            cleanQ.includes('cert') || 
            cleanQ.includes('course') || 
            cleanQ.includes('aws') || 
            cleanQ.includes('google') ||
            cleanQ.includes('credentials')
        ) {
            reply = qaPairs.certifications;
        } 
        // Portfolio: Volunteering
        else if (
            cleanQ.includes('volunteer') || 
            cleanQ.includes('ieee') || 
            cleanQ.includes('fcsc') || 
            cleanQ.includes('majlis') || 
            cleanQ.includes('un online') ||
            cleanQ.includes('leadership')
        ) {
            reply = qaPairs.volunteer;
        } 
        // Portfolio: Contact
        else if (
            cleanQ.includes('mail') || 
            cleanQ.includes('phone') || 
            cleanQ.includes('linkedin') || 
            cleanQ.includes('contact') || 
            cleanQ.includes('reach') || 
            cleanQ.includes('hire') || 
            cleanQ.includes('email')
        ) {
            reply = qaPairs.contact;
        } 
        // Portfolio: Source / GitHub
        else if (
            cleanQ.includes('source') || 
            cleanQ.includes('repo') || 
            cleanQ.includes('github') || 
            cleanQ.includes('open')
        ) {
            reply = qaPairs.source;
        } 
        // Portfolio: About
        else if (
            cleanQ.includes('about') || 
            cleanQ.includes('bio') || 
            cleanQ.includes('who is zakee') || 
            cleanQ.includes('zakee nowfal') || 
            cleanQ.includes('mohammed')
        ) {
            reply = qaPairs.about;
        } 
        // Conversational Fallback
        else {
            reply = "I'm Zakee-Bot, your virtual portfolio assistant! I didn't quite catch that, but feel free to ask me about Zakee's <strong>about</strong>, <strong>skills</strong>, <strong>education</strong>, <strong>experience</strong>, <strong>volunteer</strong> roles, <strong>certifications</strong>, or type <strong>help</strong> for the command matrix.";
        }
        
        setTimeout(() => {
            appendMessage(reply, 'bot');
        }, 200);
    }
    
    // Bind console input form
    consoleForm.addEventListener('submit', e => {
        e.preventDefault();
        const text = consoleInput.value;
        if (!text) return;
        
        appendMessage(text, 'user');
        consoleInput.value = '';
        processInput(text);
    });

    // Bind console quick dialog chips
    document.querySelectorAll('.console-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) {
                appendMessage(chip.textContent, 'user');
                processInput(cmd);
            }
        });
    });
}

/* ============================================================
   PORTFOLIO ENHANCEMENT SUITE: INTERACTIVE WIDGETS & RETRO DEV CONSOLE
   ============================================================ */

const sessionStartTime = Date.now();

/* ── Light/Dark Theme Switching ── */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
            if (themeToggle) themeToggle.checked = true;
        } else {
            document.documentElement.classList.remove('light-theme');
            if (themeToggle) themeToggle.checked = false;
        }
        // Emit custom event for dynamic components to redraw
        window.dispatchEvent(new Event('theme-changed'));
    }
    
    // Initial boot load from storage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
}



/* ── Featured Projects Slideshow ── */
function initProjectsSlideshow() {
    const slides = document.querySelectorAll('.projects-ledger .project-item');
    const tabs = document.querySelectorAll('.projects-tabs .project-tab');
    const dots = document.querySelectorAll('.projects-controls .project-dot');
    const prevBtn = document.getElementById('projectPrevBtn');
    const nextBtn = document.getElementById('projectNextBtn');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
            const explorer = slide.querySelector('.project-explorer');
            const explorerBtn = slide.querySelector('.btn-explorer-toggle');
            if (explorer && explorerBtn && !slide.classList.contains('active')) {
                explorer.classList.remove('open');
                explorerBtn.classList.remove('active');
                const icon = explorerBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-folder';
            }
        });
        
        tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === currentSlide);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    
    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            showSlide(i);
        });
    });
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
        });
    });
    
    showSlide(0);
}

/* ── GitHub Repositories Carousel ── */
function initGitHubRepos() {
    const carousel = document.getElementById('githubReposCarousel');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (!carousel) return;
    
    const CACHE_KEY = 'github_repos_data';
    const CACHE_TIME_KEY = 'github_repos_timestamp';
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
    
    const fallbackRepos = [
        {
            name: "Project-Phoenix",
            description: "Enterprise vehicle rental operations engine utilizing Java Servlets, MVC stack architectures, custom return queue stacks, and interactive dashboards.",
            language: "Java",
            stargazers_count: 14,
            forks_count: 3,
            html_url: "https://github.com/Mohammed-Zakee/Project-Phoenix"
        },
        {
            name: "Golden-Palm-Hotel-Reservation-System",
            description: "A luxury hotel reservation platform customized for large-scale wedding RSVP integrations. Powered by React components and relational SQL ledgers.",
            language: "JavaScript",
            stargazers_count: 18,
            forks_count: 5,
            html_url: "https://github.com/Mohammed-Zakee/Golden-Palm-Hotel-Reservation-System"
        },
        {
            name: "zakeebot-core",
            description: "Custom Natural Language Processing (NLP) chatbot console widget matching commands to structured profile matrices, outputting high-contrast text feeds.",
            language: "JavaScript",
            stargazers_count: 22,
            forks_count: 2,
            html_url: "https://github.com/Mohammed-Zakee/Portfolio"
        },
        {
            name: "IEEE-SLIIT-Logistics",
            description: "Event ledger pipelines, membership indexing rosters, and automated activity sheets built for administrative syncs at SLIIT Computer Faculty.",
            language: "Python",
            stargazers_count: 11,
            forks_count: 4,
            html_url: "https://github.com/Mohammed-Zakee"
        },
        {
            name: "RoboMesh-Control",
            description: "Robotic mesh controllers and simulation UI maps connecting device components through local networking arrays.",
            language: "C++",
            stargazers_count: 9,
            forks_count: 1,
            html_url: "https://github.com/Mohammed-Zakee"
        }
    ];
    
    const langColors = {
        Java: "#b07219",
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        Python: "#3572A5",
        HTML: "#e34c26",
        CSS: "#563d7c",
        "C++": "#f34b7d"
    };
    
    let reposList = [];
    let currentIndex = 0;
    
    function renderRepos(repos) {
        reposList = repos;
        carousel.innerHTML = '';
        
        if (repos.length === 0) {
            carousel.innerHTML = '<div style="width: 100%; text-align: center; color: var(--text-dim); padding: 40px 0;">No repositories found.</div>';
            return;
        }
        
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            
            const lang = repo.language || 'HTML';
            const color = langColors[lang] || '#8b8f9a';
            
            card.innerHTML = `
                <div class="repo-name-desc">
                    <h4>${repo.name}</h4>
                    <p class="repo-desc-text">${repo.description || 'No description provided.'}</p>
                </div>
                <div>
                    <div class="repo-lang-stats">
                        <span class="repo-lang">
                            <span class="lang-dot" style="background-color: ${color};"></span>
                            <span>${lang}</span>
                        </span>
                        <span class="repo-stats">
                            <span class="repo-stat-item"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
                            <span class="repo-stat-item"><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                        </span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="repo-btn">
                        <span>Access Repository</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            `;
            carousel.appendChild(card);
        });
        
        // Connect mouse followers if cursors are active
        if (typeof cursorRing !== 'undefined' && cursorRing) {
            carousel.querySelectorAll('.repo-btn, .repo-card').forEach(el => {
                el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
            });
        }
        
        currentIndex = 0;
        updateCarousel();
    }
    
    function updateCarousel() {
        const cards = carousel.querySelectorAll('.repo-card');
        if (cards.length === 0) return;
        
        let visibleCards = 3;
        if (window.innerWidth <= 640) {
            visibleCards = 1;
        } else if (window.innerWidth <= 1024) {
            visibleCards = 2;
        }
        
        const maxIndex = Math.max(0, cards.length - visibleCards);
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        
        if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.2' : '1';
        if (nextBtn) nextBtn.style.opacity = currentIndex === maxIndex ? '0.2' : '1';
        
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 24;
        const offset = currentIndex * (cardWidth + gap);
        carousel.style.transform = `translateX(-${offset}px)`;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cards = carousel.querySelectorAll('.repo-card');
            let visibleCards = 3;
            if (window.innerWidth <= 640) visibleCards = 1;
            else if (window.innerWidth <= 1024) visibleCards = 2;
            
            const maxIndex = Math.max(0, cards.length - visibleCards);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
    }
    
    window.addEventListener('resize', updateCarousel);
    
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    
    if (cachedData && cachedTime && (Date.now() - cachedTime < CACHE_DURATION)) {
        renderRepos(JSON.parse(cachedData));
    } else {
        fetch('https://api.github.com/users/Mohammed-Zakee/repos?sort=updated&per_page=10')
            .then(res => {
                if (!res.ok) throw new Error('GitHub API Error');
                return res.json();
            })
            .then(data => {
                const filtered = data
                    .filter(r => !r.fork)
                    .map(r => ({
                        name: r.name,
                        description: r.description,
                        language: r.language,
                        stargazers_count: r.stargazers_count,
                        forks_count: r.forks_count,
                        html_url: r.html_url
                    }));
                const finalRepos = filtered.length > 0 ? filtered : fallbackRepos;
                localStorage.setItem(CACHE_KEY, JSON.stringify(finalRepos));
                localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
                renderRepos(finalRepos);
            })
            .catch(err => {
                console.warn('Utilizing repository static ledger fallbacks.', err);
                renderRepos(fallbackRepos);
            });
    }
}

/* ── Project Architecture & File-Tree Explorer ── */
function initProjectExplorer() {
    const toggleButtons = document.querySelectorAll('.btn-explorer-toggle');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const explorer = document.getElementById(targetId);
            if (explorer) {
                explorer.classList.toggle('open');
                const icon = btn.querySelector('i');
                if (explorer.classList.contains('open')) {
                    btn.classList.add('active');
                    if (icon) icon.className = 'fa-solid fa-folder-open';
                } else {
                    btn.classList.remove('active');
                    if (icon) icon.className = 'fa-solid fa-folder';
                }
            }
        });
    });
    
    const folderHeaders = document.querySelectorAll('.file-tree .folder > .tree-item');
    folderHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const folderLi = header.parentElement;
            folderLi.classList.toggle('open');
            
            const icon = header.querySelector('i');
            if (icon) {
                if (folderLi.classList.contains('open')) {
                    icon.className = 'fa-solid fa-folder-open';
                } else {
                    icon.className = 'fa-solid fa-folder';
                }
            }
        });
    });
    
    const fileItems = document.querySelectorAll('.file-tree .file');
    fileItems.forEach(file => {
        file.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const explorer = file.closest('.project-explorer');
            if (!explorer) return;
            
            explorer.querySelectorAll('.file').forEach(f => f.classList.remove('active-file'));
            file.classList.add('active-file');
            
            const filename = file.querySelector('.tree-item').textContent.trim();
            const desc = file.getAttribute('data-desc');
            
            const placeholder = explorer.querySelector('.details-placeholder');
            const content = explorer.querySelector('.details-content');
            const filenameEl = explorer.querySelector('.details-filename');
            const descEl = explorer.querySelector('.details-description');
            
            if (placeholder && content && filenameEl && descEl) {
                placeholder.style.display = 'none';
                content.style.display = 'block';
                filenameEl.textContent = filename;
                descEl.textContent = desc;
            }
        });
    });
}

/* ── Retro Developer CLI Terminal Overlay ── */
function initDeveloperTerminal() {
    const terminal = document.getElementById('devCliTerminal');
    const toggleBtn = document.getElementById('cliToggleBtn');
    const closeBtn = document.getElementById('cliCloseBtn');
    const form = document.getElementById('cliForm');
    const input = document.getElementById('cliInput');
    const body = document.getElementById('cliBody');
    
    if (!terminal || !form || !input || !body) return;
    
    let snakeActive = false;
    let matrixInterval = null;
    let matrixCanvas = null;
    
    function openTerminal() {
        terminal.classList.add('open');
        document.body.classList.add('terminal-open');
        input.focus();
        startMatrixRain();
    }
    
    function closeTerminal() {
        terminal.classList.remove('open');
        document.body.classList.remove('terminal-open');
        stopMatrixRain();
        if (snakeActive) {
            endSnakeGame();
        }
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (terminal.classList.contains('open')) {
                closeTerminal();
            } else {
                openTerminal();
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeTerminal);
    }
    
    window.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            if (terminal.classList.contains('open')) {
                closeTerminal();
            } else {
                openTerminal();
            }
        } else if (e.key === 'Escape') {
            if (terminal.classList.contains('open')) {
                closeTerminal();
            }
        }
    });
    
    function printLine(text, type = 'output') {
        const line = document.createElement('div');
        line.className = `cli-line ${type}`;
        line.innerHTML = text;
        body.appendChild(line);
        body.scrollTop = body.scrollHeight;
    }
    
    function runNeofetch() {
        const info = `
<pre style="color: #10b981; font-family: var(--font-mono); font-size: 0.75rem; line-height: 1.2; display: flex; gap: 20px; flex-wrap: wrap;">
      ::::::::::.     ::::    :::     
     :+:      :+:    :+:+:   :+:      
    +:+      +:+    :+:+:+  +:+       
   +#+      +#+    +#+ +:+ +#+        
  +#+      +#+    +#+  +#+#+#         
 #+#      #+#    #+#   #+#+#          
##########      ###    ####           

<span><strong>guest@zakee-node</strong>
----------------
<strong>OS:</strong> ZakeeOS v2.6.4 (Debian base)
<strong>Host:</strong> Mohammed Zakee Portfolio Node
<strong>Kernel:</strong> WebOS 2026.05.21
<strong>Uptime:</strong> ${Math.floor((Date.now() - sessionStartTime) / 60000)} mins
<strong>Shell:</strong> dev_shell v2.6
<strong>Resolution:</strong> ${window.innerWidth}x${window.innerHeight}
<strong>Theme:</strong> ${document.documentElement.classList.contains('light-theme') ? 'light' : 'dark'}
<strong>AI Engine:</strong> Active (TensorFlow.js)
<strong>GitHub:</strong> <a href="https://github.com/Mohammed-Zakee" target="_blank" style="color:#6366f1;text-decoration:underline;">github.com/Mohammed-Zakee</a>
</span></pre>`;
        printLine(info);
    }
    
    function startMatrixRain() {
        if (matrixCanvas) return;
        
        matrixCanvas = document.createElement('canvas');
        matrixCanvas.id = 'cliMatrixCanvas';
        matrixCanvas.style.position = 'absolute';
        matrixCanvas.style.inset = '0';
        matrixCanvas.style.opacity = '0.12';
        matrixCanvas.style.pointerEvents = 'none';
        matrixCanvas.style.zIndex = '10006';
        
        terminal.appendChild(matrixCanvas);
        
        const mctx = matrixCanvas.getContext('2d');
        let mwidth = (matrixCanvas.width = terminal.clientWidth);
        let mheight = (matrixCanvas.height = terminal.clientHeight);
        
        window.addEventListener('resize', resizeMatrixCanvas);
        
        function resizeMatrixCanvas() {
            if (!matrixCanvas) return;
            mwidth = (matrixCanvas.width = terminal.clientWidth);
            mheight = (matrixCanvas.height = terminal.clientHeight);
        }
        
        const columns = Math.floor(mwidth / 16) + 1;
        const yPositions = Array(columns).fill(0);
        
        function drawMatrix() {
            mctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
            mctx.fillRect(0, 0, mwidth, mheight);
            
            mctx.fillStyle = '#10b981';
            mctx.font = '15px monospace';
            
            yPositions.forEach((y, index) => {
                const text = String.fromCharCode(Math.floor(Math.random() * 128));
                const x = index * 16;
                mctx.fillText(text, x, y);
                
                if (y > 100 + Math.random() * 10000) {
                    yPositions[index] = 0;
                } else {
                    yPositions[index] = y + 16;
                }
            });
        }
        
        matrixInterval = setInterval(drawMatrix, 33);
    }
    
    function stopMatrixRain() {
        if (matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
        }
        if (matrixCanvas) {
            matrixCanvas.remove();
            matrixCanvas = null;
        }
    }
    
    let snakeTimer = null;
    let snakeKeysHandler = null;
    
    function startSnakeGame() {
        if (snakeActive) return;
        snakeActive = true;
        
        printLine('========================================');
        printLine('◆ INITIALIZING RETRO SNAKE CORE...');
        printLine('◆ CONTROLS: Arrow keys or WASD.');
        printLine('◆ Press ESC to quit Snake.');
        printLine('========================================');
        
        const canvasContainer = document.createElement('div');
        canvasContainer.style.textAlign = 'center';
        canvasContainer.style.margin = '16px 0';
        
        const scanvas = document.createElement('canvas');
        scanvas.width = 300;
        scanvas.height = 200;
        scanvas.style.border = '2px solid #10b981';
        scanvas.style.background = '#020617';
        scanvas.style.borderRadius = '4px';
        
        canvasContainer.appendChild(scanvas);
        body.appendChild(canvasContainer);
        body.scrollTop = body.scrollHeight;
        
        const sctx = scanvas.getContext('2d');
        const grid = 10;
        let count = 0;
        
        let snake = {
            x: 150,
            y: 100,
            dx: grid,
            dy: 0,
            cells: [],
            maxCells: 4
        };
        
        let apple = {
            x: 60,
            y: 60
        };
        
        let score = 0;
        
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        
        function resetApple() {
            apple.x = getRandomInt(0, 30) * grid;
            apple.y = getRandomInt(0, 20) * grid;
        }
        
        function loop() {
            if (!snakeActive) return;
            snakeTimer = requestAnimationFrame(loop);
            
            if (++count < 6) {
                return;
            }
            count = 0;
            
            sctx.clearRect(0, 0, scanvas.width, scanvas.height);
            
            snake.x += snake.dx;
            snake.y += snake.dy;
            
            if (snake.x < 0) snake.x = scanvas.width - grid;
            else if (snake.x >= scanvas.width) snake.x = 0;
            
            if (snake.y < 0) snake.y = scanvas.height - grid;
            else if (snake.y >= scanvas.height) snake.y = 0;
            
            snake.cells.unshift({x: snake.x, y: snake.y});
            
            if (snake.cells.length > snake.maxCells) {
                snake.cells.pop();
            }
            
            sctx.fillStyle = '#ef4444';
            sctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);
            
            sctx.fillStyle = '#10b981';
            snake.cells.forEach((cell, index) => {
                sctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
                
                if (cell.x === apple.x && cell.y === apple.y) {
                    snake.maxCells++;
                    score += 10;
                    resetApple();
                }
                
                for (let i = index + 1; i < snake.cells.length; i++) {
                    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                        endSnakeGame(score);
                    }
                }
            });
            
            sctx.fillStyle = 'rgba(16, 185, 129, 0.7)';
            sctx.font = '10px monospace';
            sctx.fillText(`Score: ${score}`, 8, 16);
        }
        
        snakeKeysHandler = function(e) {
            if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
            
            if ((e.which === 37 || e.which === 65) && snake.dx === 0) {
                snake.dx = -grid;
                snake.dy = 0;
            }
            else if ((e.which === 38 || e.which === 87) && snake.dy === 0) {
                snake.dy = -grid;
                snake.dx = 0;
            }
            else if ((e.which === 39 || e.which === 68) && snake.dx === 0) {
                snake.dx = grid;
                snake.dy = 0;
            }
            else if ((e.which === 40 || e.which === 83) && snake.dy === 0) {
                snake.dy = grid;
                snake.dx = 0;
            }
            else if (e.key === 'Escape') {
                endSnakeGame(score, true);
            }
        };
        
        window.addEventListener('keydown', snakeKeysHandler);
        snakeTimer = requestAnimationFrame(loop);
    }
    
    function endSnakeGame(finalScore = 0, aborted = false) {
        if (!snakeActive) return;
        snakeActive = false;
        
        cancelAnimationFrame(snakeTimer);
        window.removeEventListener('keydown', snakeKeysHandler);
        
        printLine('========================================');
        if (aborted) {
            printLine('◆ SNAKE GAME INTERRUPTED.');
        } else {
            printLine('◆ GAME OVER // SNAKE CORE CRASHED.');
        }
        printLine(`◆ FINAL SCORE: ${finalScore}`);
        printLine('◆ Type \'snake\' to restart.');
        printLine('========================================');
        
        input.focus();
    }
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullCmd = input.value.trim();
        input.value = '';
        
        if (!fullCmd) return;
        
        printLine(`<span class="cli-prompt">guest@zakee-node:~$</span> ${fullCmd}`);
        
        if (snakeActive) {
            if (fullCmd.toLowerCase() === 'exit' || fullCmd.toLowerCase() === 'quit') {
                endSnakeGame(0, true);
            }
            return;
        }
        
        const args = fullCmd.split(' ');
        const cmd = args[0].toLowerCase();
        
        switch (cmd) {
            case 'help':
                printLine('Available Commands:');
                printLine('  neofetch       - Display system spec sheet & ASCII banner');
                printLine('  about          - View biography profile');
                printLine('  skills         - List target core competencies');
                printLine('  experience     - Read professional career logs');
                printLine('  theme [l/d]    - Set theme: \'theme light\' or \'theme dark\'');
                printLine('  snake          - Play 8-bit retro terminal snake');
                printLine('  clear          - Flush console logging buffers');
                printLine('  exit           - Shut down dev console interface');
                break;
            case 'neofetch':
                runNeofetch();
                break;
            case 'about':
                printLine('Mohammed Zakee Nowfal is an Artificial Intelligence undergraduate student at SLIIT, Malabe, Sri Lanka.');
                printLine('He is focused on deep learning engineering, cloud architectures, and fintech strategic partnerships.');
                break;
            case 'skills':
                printLine('Core Technical Matrix:');
                printLine('  - AI / ML      : TensorFlow, Pandas, NumPy, Scikit-learn, Matplotlib');
                printLine('  - Languages    : HTML5, CSS3, JS (ES6), Python, C++');
                printLine('  - Platforms    : Git, AWS Academy, IntelliJ IDEA, Figma');
                break;
            case 'experience':
                printLine('Professional Ledger:');
                printLine('  - Project Lead // FASL (Feb 2026 — Present)');
                printLine('  - Strategic Partnership Executive // Fintech Zone (Mar 2025 — Present)');
                printLine('  - Exam Invigilator // British Council Sri Lanka (May 2025 — Present)');
                printLine('  - Teaching Assistant // SLIIT (Jan 2025 — Present)');
                break;
            case 'theme':
                const themeToggleEl = document.getElementById('themeToggle');
                if (args[1] === 'light') {
                    document.documentElement.classList.add('light-theme');
                    localStorage.setItem('theme', 'light');
                    if (themeToggleEl) themeToggleEl.checked = true;
                    window.dispatchEvent(new Event('theme-changed'));
                    printLine('System theme changed to LIGHT.');
                } else if (args[1] === 'dark') {
                    document.documentElement.classList.remove('light-theme');
                    localStorage.setItem('theme', 'dark');
                    if (themeToggleEl) themeToggleEl.checked = false;
                    window.dispatchEvent(new Event('theme-changed'));
                    printLine('System theme changed to DARK.');
                } else {
                    printLine('Usage: theme [light|dark]');
                }
                break;
            case 'snake':
                startSnakeGame();
                break;
            case 'clear':
                body.innerHTML = '';
                break;
            case 'exit':
                closeTerminal();
                break;
            default:
                printLine(`bash: command not found: ${cmd}. Type 'help' for command directory.`);
        }
    });
}

/* ── Expandable Experience Accordion ── */
function initExperienceAccordion() {
    const expRows = document.querySelectorAll('.exp-row.exp-expandable');
    expRows.forEach(row => {
        row.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            
            row.classList.toggle('expanded');
            const hintText = row.querySelector('.exp-hint');
            if (hintText) {
                const isExpanded = row.classList.contains('expanded');
                hintText.innerHTML = `${isExpanded ? 'COLLAPSE' : 'EXPAND'} // <i class="fa-solid fa-chevron-down"></i>`;
            }
        });
    });
}

/* ── 3D Bento Mouse Parallax Tilt ── */
function initBentoParallax() {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;
            const tiltX = -(dy / yc) * 8;
            const tiltY = (dx / xc) * 8;
            card.style.transition = 'none';
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, background 0.3s';
            card.style.transform = '';
        });
    });
}

/* ── Interactive Skills Radar Chart (High-DPI Canvas) ── */
function initRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const skills = [
        { name: 'AI / ML', value: 0.90 },
        { name: 'Web Dev', value: 0.80 },
        { name: 'Databases', value: 0.75 },
        { name: 'Systems', value: 0.70 },
        { name: 'Leadership', value: 0.85 },
        { name: 'Data Analytics', value: 0.80 }
    ];
    
    const dpr = window.devicePixelRatio || 1;
    let width = 300;
    let height = 300;
    
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        draw();
    }
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        const isLight = document.documentElement.classList.contains('light-theme');
        const gridColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
        const gridLinesColor = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';
        const textColor = isLight ? '#27272a' : '#e4e4e7';
        const accentColor = 'rgba(99, 102, 241, 0.85)';
        const fillColor = isLight ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.2)';
        
        const center = { x: width / 2, y: height / 2 };
        const radius = Math.min(width, height) / 2 * 0.75;
        const numAxes = skills.length;
        const angleStep = (Math.PI * 2) / numAxes;
        
        // Concentric Grid Polygons
        const levels = 5;
        for (let level = 1; level <= levels; level++) {
            const r = (radius / levels) * level;
            ctx.beginPath();
            for (let i = 0; i < numAxes; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const x = center.x + Math.cos(angle) * r;
                const y = center.y + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Axes Lines and Labels
        ctx.font = 'bold 9px var(--font-mono)';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < numAxes; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const outerX = center.x + Math.cos(angle) * radius;
            const outerY = center.y + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.lineTo(outerX, outerY);
            ctx.strokeStyle = gridLinesColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            
            const labelDist = radius + 15;
            const labelX = center.x + Math.cos(angle) * labelDist;
            const labelY = center.y + Math.sin(angle) * labelDist;
            
            if (Math.abs(Math.cos(angle)) < 0.1) {
                ctx.textAlign = 'center';
            } else if (Math.cos(angle) > 0) {
                ctx.textAlign = 'left';
            } else {
                ctx.textAlign = 'right';
            }
            ctx.fillText(skills[i].name, labelX, labelY);
        }
        
        // Draw Data Polygon
        ctx.beginPath();
        for (let i = 0; i < numAxes; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const r = radius * skills[i].value;
            const x = center.x + Math.cos(angle) * r;
            const y = center.y + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw Data Points
        for (let i = 0; i < numAxes; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const r = radius * skills[i].value;
            const x = center.x + Math.cos(angle) * r;
            const y = center.y + Math.sin(angle) * r;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? '#ffffff' : '#09090b';
            ctx.fill();
            ctx.strokeStyle = accentColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }
    
    // Listen to theme changed and window resize
    window.addEventListener('theme-changed', draw);
    window.addEventListener('resize', resizeCanvas);
    
    // Initial draw trigger
    resizeCanvas();
}

/* ── Boot Initializer ── */
initThemeToggle();

initProjectsSlideshow();
initGitHubRepos();
initProjectExplorer();
initDeveloperTerminal();
initExperienceAccordion();
initBentoParallax();
initRadarChart();

/* ── Architectural Console Branding ── */
console.log('%c◆ ZAKEE NOWFAL — PORTFOLIO 2026 ◆', 'color:#e2e8f0;background:#09090b;font-size:14px;font-weight:bold;padding:4px 8px;border:1px solid #27272a;');
console.log('%cDesigned with Swiss architectural principles and high-contrast precision.', 'color:#a1a1aa;font-size:11px;');
