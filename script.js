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

    // Native dialog previews use watermarked derivatives only; original PDFs stay local.
    const catalogElement = document.getElementById('certificate-catalog');
    const certificateDialog = document.getElementById('certificate-dialog');
    const certificates = catalogElement ? JSON.parse(catalogElement.textContent) : [];
    const previewButtons = document.querySelectorAll('[data-certificate-preview]');
    let activeCertificate = 0;
    let certificateTrigger = null;
    function renderCertificate(index) {
        activeCertificate = (index + certificates.length) % certificates.length;
        const item = certificates[activeCertificate];
        document.getElementById('certificate-dialog-title').textContent = item.title;
        document.getElementById('certificate-dialog-issuer').textContent = item.issuer;
        const image = document.getElementById('certificate-dialog-image');
        image.src = item.image;
        image.alt = `Watermarked ${item.title} certificate awarded to Mohammed Zakee`;
        document.getElementById('certificate-position').textContent = `${activeCertificate + 1} / ${certificates.length}`;
        const issuer = document.getElementById('certificate-verify');
        issuer.hidden = !item.verify;
        if (item.verify) issuer.href = item.verify;
        else issuer.removeAttribute('href');
    }
    if (certificateDialog && typeof certificateDialog.showModal === 'function') {
        previewButtons.forEach(button => {
            button.hidden = false;
            button.addEventListener('click', () => {
                const index = certificates.findIndex(item => item.id === button.dataset.certificatePreview);
                if (index < 0) return;
                certificateTrigger = button;
                renderCertificate(index);
                certificateDialog.showModal();
                root.classList.add('certificate-open');
            });
        });
        certificateDialog.querySelector('.certificate-close').addEventListener('click', () => certificateDialog.close());
        certificateDialog.addEventListener('close', () => {
            root.classList.remove('certificate-open');
            certificateTrigger?.focus();
        });
        certificateDialog.addEventListener('click', event => {
            if (event.target === certificateDialog) {
                const r = certificateDialog.getBoundingClientRect();
                if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) certificateDialog.close();
            }
        });
        document.getElementById('certificate-previous').addEventListener('click', () => renderCertificate(activeCertificate - 1));
        document.getElementById('certificate-next').addEventListener('click', () => renderCertificate(activeCertificate + 1));
        certificateDialog.addEventListener('keydown', event => {
            if (event.key === 'ArrowRight') { event.preventDefault(); renderCertificate(activeCertificate + 1); }
            if (event.key === 'ArrowLeft') { event.preventDefault(); renderCertificate(activeCertificate - 1); }
        });
    }
    const certificateFilters = document.querySelectorAll('[data-certificate-filter]');
    const certificateCards = document.querySelectorAll('.certificate-card');
    const certificateViewport = document.querySelector('.certificate-viewport');
    const certificateTrack = document.querySelector('.certificate-track');
    const certificateGroup = document.querySelector('.certificate-group');
    const stripPause = document.getElementById('certificate-strip-pause');
    const viewToggle = document.getElementById('certificate-view-toggle');
    let stripPaused = false;
    let gridView = false;
    function updateCertificateView() {
        certificateViewport.dataset.view = gridView ? 'grid' : 'strip';
        certificateViewport.dataset.paused = String(stripPaused);
        stripPause.setAttribute('aria-pressed', String(stripPaused));
        stripPause.textContent = stripPaused ? 'Resume strip ▷' : 'Pause strip Ⅱ';
        stripPause.hidden = gridView || reducedMotion.matches;
        viewToggle.setAttribute('aria-pressed', String(gridView));
        viewToggle.textContent = gridView ? 'Show moving strip' : 'Browse as grid';
        viewToggle.hidden = reducedMotion.matches;
    }
    function visualCertificateCopy(source) {
        const copy = source.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        copy.querySelectorAll('a,button').forEach(control => {
            const span = document.createElement('span');
            span.className = control.className;
            if (control.dataset.certificatePreview) span.dataset.certificatePreview = control.dataset.certificatePreview;
            while (control.firstChild) span.append(control.firstChild);
            control.replaceWith(span);
        });
        return copy;
    }
    function refreshCertificateLoop() {
        certificateTrack.querySelector('.certificate-group-copy')?.remove();
        certificateGroup.querySelectorAll('.certificate-card-filler').forEach(card => card.remove());
        certificateCards.forEach(card => {
            card.classList.remove('reveal-pending');
            const image = card.querySelector('img');
            if (image) image.loading = 'eager';
        });
        const visible = [...certificateCards].filter(card => !card.hidden);
        if (!visible.length) return;
        const cardWidth = Math.max(285, visible[0].getBoundingClientRect().width);
        const minimum = Math.ceil(certificateViewport.clientWidth / (cardWidth + 22)) + 1;
        const units = Math.max(visible.length, minimum);
        for (let i = visible.length; i < units; i++) {
            const filler = visualCertificateCopy(visible[i % visible.length]);
            filler.classList.add('certificate-card-filler');
            certificateGroup.append(filler);
        }
        const copy = visualCertificateCopy(certificateGroup);
        copy.classList.add('certificate-group-copy');
        certificateTrack.append(copy);
        certificateTrack.style.setProperty('--strip-duration', `${Math.max(18, units * 9)}s`);
    }
    if (certificateViewport && certificateTrack && certificateGroup) {
        certificateViewport.classList.add('strip-enabled');
        document.querySelector('.certificate-strip-controls').hidden = false;
        refreshCertificateLoop();
        updateCertificateView();
        stripPause.addEventListener('click', () => { stripPaused = !stripPaused; updateCertificateView(); });
        viewToggle.addEventListener('click', () => { gridView = !gridView; updateCertificateView(); });
        reducedMotion.addEventListener('change', updateCertificateView);
        certificateTrack.addEventListener('click', event => {
            if (!event.target.closest('.certificate-group-copy,.certificate-card-filler')) return;
            const card = event.target.closest('.certificate-card');
            const id = card?.querySelector('[data-certificate-preview]')?.dataset.certificatePreview;
            if (id) {
                const source = [...previewButtons].find(button => button.dataset.certificatePreview === id);
                source?.click();
                if (source) certificateTrigger = stripPause;
            }
        });
        let loopResize;
        addEventListener('resize', () => {
            clearTimeout(loopResize);
            loopResize = setTimeout(refreshCertificateLoop, 180);
        });
        let keyboardNavigation = false;
        document.addEventListener('keydown', event => { if (event.key === 'Tab') keyboardNavigation = true; });
        document.addEventListener('pointerdown', () => { keyboardNavigation = false; }, { capture: true });
        certificateGroup.addEventListener('focusin', () => {
            if (keyboardNavigation && !gridView) { gridView = true; updateCertificateView(); }
        });
    }
    certificateFilters.forEach(button => button.addEventListener('click', () => {
        certificateFilters.forEach(filter => filter.setAttribute('aria-pressed', String(button === filter)));
        certificateCards.forEach(card => {
            card.hidden = button.dataset.certificateFilter !== 'All' && card.dataset.certificateCategory !== button.dataset.certificateFilter;
            card.classList.remove('reveal-pending');
        });
        refreshCertificateLoop();
    }));

    // Pointer depth follows interaction; there is no permanent rendering loop.
    const portrait = document.querySelector('.hero-portrait');
    const precisePointer = matchMedia('(hover: hover) and (pointer: fine)');
    let pointerFrame = false;
    let pointerX = 0, pointerY = 0;
    portrait?.addEventListener('pointermove', event => {
        if (!precisePointer.matches || reducedMotion.matches || root.dataset.motion === 'paused') return;
        const rect = portrait.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width - .5) * 12;
        pointerY = ((event.clientY - rect.top) / rect.height - .5) * 10;
        if (!pointerFrame) {
            pointerFrame = true;
            requestAnimationFrame(() => {
                portrait.style.setProperty('--portrait-x', `${pointerX}px`);
                portrait.style.setProperty('--portrait-y', `${pointerY}px`);
                pointerFrame = false;
            });
        }
    }, { passive: true });
    portrait?.addEventListener('pointerleave', () => {
        portrait.style.setProperty('--portrait-x', '0px');
        portrait.style.setProperty('--portrait-y', '0px');
    });

    // Byte is a lightweight SVG companion: one entrance, then interaction on demand.
    const mascot = document.getElementById('portfolio-mascot');
    const mascotRestore = document.getElementById('mascot-restore');
    const mascotToggle = document.getElementById('mascot-toggle');
    const mascotPanel = document.getElementById('mascot-panel');
    const smallScreen = matchMedia('(max-width: 1024px)');
    let mascotHidden = false;
    let contactVisible = false;
    let waveTimer;
    try { mascotHidden = localStorage.getItem('portfolio_mascot_hidden') === 'true'; } catch {}
    function closeMascotPanel() {
        mascotPanel.hidden = true;
        mascotToggle.setAttribute('aria-expanded', 'false');
    }
    function calmMascot() {
        mascot.classList.remove('mascot-running', 'mascot-waving');
    }
    function syncMascot() {
        mascot.hidden = mascotHidden || contactVisible;
        mascotRestore.hidden = !mascotHidden || contactVisible;
        if (mascotHidden || contactVisible || smallScreen.matches || reducedMotion.matches || root.dataset.motion === 'paused' || document.hidden) {
            calmMascot();
        }
        if (mascotHidden || contactVisible) closeMascotPanel();
    }
    function waveMascot() {
        if (reducedMotion.matches || root.dataset.motion === 'paused') return;
        clearTimeout(waveTimer);
        mascot.classList.remove('mascot-running', 'mascot-waving');
        requestAnimationFrame(() => {
            if (!mascot.hidden && !reducedMotion.matches && root.dataset.motion !== 'paused' && !document.hidden) mascot.classList.add('mascot-waving');
        });
        waveTimer = setTimeout(() => mascot.classList.remove('mascot-waving'), 1600);
    }
    if (mascot) {
        syncMascot();
        mascotToggle.addEventListener('focus', calmMascot);
        mascotToggle.addEventListener('click', () => {
            const open = mascotPanel.hidden;
            mascotPanel.hidden = !open;
            mascotToggle.setAttribute('aria-expanded', String(open));
            if (open) waveMascot();
        });
        document.getElementById('mascot-wave').addEventListener('click', waveMascot);
        document.getElementById('mascot-hide').addEventListener('click', () => {
            mascotHidden = true;
            try { localStorage.setItem('portfolio_mascot_hidden', 'true'); } catch {}
            syncMascot();
            if (!mascotRestore.hidden) mascotRestore.focus();
        });
        mascotRestore.addEventListener('click', () => {
            mascotHidden = false;
            try { localStorage.removeItem('portfolio_mascot_hidden'); } catch {}
            syncMascot();
            mascotToggle.focus();
            waveMascot();
        });
        mascotPanel.querySelector('a').addEventListener('click', closeMascotPanel);
        mascot.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !mascotPanel.hidden) {
                closeMascotPanel();
                mascotToggle.focus();
            }
        });
        document.addEventListener('pointerdown', event => {
            if (!mascot.contains(event.target)) closeMascotPanel();
        });
        mascot.querySelector('.mascot-character').addEventListener('animationend', event => {
            if (event.animationName === 'byteCross') mascot.classList.remove('mascot-running');
        });
        reducedMotion.addEventListener('change', syncMascot);
        smallScreen.addEventListener('change', syncMascot);
        document.addEventListener('visibilitychange', syncMascot);
        new MutationObserver(syncMascot).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(entries => {
                contactVisible = entries[0].isIntersecting;
                syncMascot();
            }, { threshold: 0 }).observe(document.getElementById('contact'));
        }
        setTimeout(() => {
            let seen = false;
            try { seen = sessionStorage.getItem('portfolio_mascot_intro_seen') === 'true'; } catch {}
            if (!seen && !mascot.hidden && !smallScreen.matches && !reducedMotion.matches && root.dataset.motion === 'running' && !document.hidden) {
                mascot.classList.add('mascot-running');
                try { sessionStorage.setItem('portfolio_mascot_intro_seen', 'true'); } catch {}
            }
        }, 700);
    }
});
