/* Portfolio interactions: progressive enhancement, no external dependencies. */
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.checked = root.dataset.theme === 'light';
    themeToggle.addEventListener('change', () => {
        root.dataset.theme = themeToggle.checked ? 'light' : 'dark';
        try { localStorage.setItem('portfolio_theme', root.dataset.theme); } catch {}
    });

    const motionToggle = document.querySelector('.motion-toggle');
    let motionPaused = false;
    function syncMotion() {
        const paused = motionPaused || reducedMotion.matches;
        root.dataset.motion = paused ? 'paused' : 'running';
        motionToggle.setAttribute('aria-pressed', String(paused));
        motionToggle.setAttribute('aria-label', paused ? 'Play decorative animations' : 'Pause decorative animations');
        motionToggle.innerHTML = paused ? 'Play motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    }
    motionToggle.addEventListener('click', () => { motionPaused = !motionPaused; syncMotion(); });
    reducedMotion.addEventListener('change', syncMotion);
    syncMotion();

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.remove('reveal-pending');
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.06 });
        document.querySelectorAll('.reveal').forEach((element, index) => {
            element.style.setProperty('--reveal-delay', `${index % 3 * 65}ms`);
            if (!reducedMotion.matches && element.getBoundingClientRect().top > innerHeight) element.classList.add('reveal-pending');
            observer.observe(element);
        });
    }

    const filters = document.querySelectorAll('[data-filter]');
    const projects = document.querySelectorAll('.work-card');
    const archive = document.querySelector('.archive-projects');
    filters.forEach(button => button.addEventListener('click', () => {
        filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
        projects.forEach(card => {
            card.hidden = button.dataset.filter !== 'All' && card.dataset.category !== button.dataset.filter;
            card.classList.remove('reveal-pending');
        });
        if (archive) {
            archive.hidden = ![...archive.querySelectorAll('.work-card')].some(card => !card.hidden);
            archive.open = button.dataset.filter !== 'All';
        }
    }));

    const clock = document.getElementById('localTime');
    const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    function updateClock() { if (clock) clock.textContent = `${formatter.format(new Date())} (UTC+5:30)`; }
    updateClock();
    setInterval(updateClock, 1000);

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main > section[id]');
    const progress = document.querySelector('.reading-progress');
    let pendingScroll = false;
    function updateScroll() {
        pendingScroll = false;
        const maximum = root.scrollHeight - innerHeight;
        progress.style.transform = `scaleX(${maximum > 0 ? Math.max(0, Math.min(scrollY / maximum, 1)) : 0})`;
        let current = '';
        sections.forEach(section => { if (section.getBoundingClientRect().top <= 180) current = section.id; });
        navLinks.forEach(link => {
            const active = link.getAttribute('href') === `#${current}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    addEventListener('scroll', () => {
        if (!pendingScroll) { pendingScroll = true; requestAnimationFrame(updateScroll); }
    }, { passive: true });
    addEventListener('resize', updateScroll);
    updateScroll();
});
