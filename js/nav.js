/* =========================================================
   NJFON — SHARED NAVIGATION SCRIPT
   One navigation for every page.
========================================================= */
(() => {
    const markup = `
        <header class="nav" aria-label="Primary navigation">
            <a href="index.html" class="logo" aria-label="NJFON home">
                <div class="logo-circle"><img src="assets/img/njfn-logo.jpeg" alt="NJFON logo"></div>
                <div class="logo-text">NJFON<small>Neymar Jr Fans of Nepal</small></div>
            </a>

            <nav class="nav-links" id="navLinks">
                <a href="index.html" data-page="index">Home</a>
                <a href="about.html" data-page="about">About Us</a>
                <a href="updates.html" data-page="updates">Updates</a>
                <a href="events.html" data-page="events">Events</a>
                <a href="committee.html" data-page="committee">Committee</a>
                <a href="gallery.html" data-page="gallery">Gallery</a>
            </nav>

            <div class="nav-actions">
                <button class="icon-btn" id="themeButton" type="button" aria-label="Choose color theme">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="7" r="3.5"/><circle cx="17" cy="12" r="3.5"/>
                        <circle cx="12" cy="17" r="3.5"/><circle cx="7" cy="12" r="3.5"/>
                        <circle cx="12" cy="12" r="2.2" fill="currentColor"/>
                    </svg>
                </button>
                <button class="icon-btn" id="modeButton" type="button" aria-label="Toggle light dark mode">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z"/></svg>
                </button>
                <a href="contact.html" class="contact-btn">Contact</a>
                <button class="icon-btn menu-button" id="menuButton" type="button" aria-label="Open navigation menu" aria-expanded="false">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
                </button>
            </div>
        </header>
        <div class="nav-backdrop" id="navBackdrop" aria-hidden="true"></div>
    `;

    if (!document.querySelector('.nav')) document.body.insertAdjacentHTML('afterbegin', markup);

    const links = document.querySelectorAll('#navLinks a[data-page]');
    const menu = document.getElementById('menuButton');
    const navLinks = document.getElementById('navLinks');
    const backdrop = document.getElementById('navBackdrop');

    const file = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/i, '').toLowerCase();
    const active = file === 'event-details' ? 'events' : file;
    links.forEach(link => {
        const on = link.dataset.page === active;
        link.classList.toggle('active', on);
        if (on) link.setAttribute('aria-current', 'page');
    });

    function closeMenu() {
        navLinks?.classList.remove('open');
        backdrop?.classList.remove('open');
        document.body.classList.remove('menu-open');
        menu?.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        const open = !navLinks?.classList.contains('open');
        navLinks?.classList.toggle('open', open);
        backdrop?.classList.toggle('open', open);
        document.body.classList.toggle('menu-open', open);
        menu?.setAttribute('aria-expanded', String(open));
    }

    menu?.addEventListener('click', event => { event.stopPropagation(); toggleMenu(); });
    backdrop?.addEventListener('click', closeMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (innerWidth > 900) closeMenu(); });
})();
