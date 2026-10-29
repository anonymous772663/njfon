/* =========================================================
   NJFON — SHARED THEME SCRIPT
   Injects the theme picker once and stores the choice locally.
========================================================= */
(() => {
    const themes = ['blend','emerald','royal','golden','neon','violet'];
    const panelMarkup = `
        <div class="theme-panel" id="themePanel" aria-label="Website themes">
            <div class="theme-title">NJFON Color Themes<span>Choose the visual identity of NJFON.</span></div>
            <button class="theme-option" data-theme="blend" type="button"><span class="theme-dot theme-blend"></span><span><strong>NJFON Blend</strong><small>Green · Yellow · Blue</small></span></button>
            <button class="theme-option" data-theme="emerald" type="button"><span class="theme-dot theme-emerald"></span><span><strong>Emerald</strong><small>Fresh community energy</small></span></button>
            <button class="theme-option" data-theme="royal" type="button"><span class="theme-dot theme-royal"></span><span><strong>Royal Blue</strong><small>Modern football atmosphere</small></span></button>
            <button class="theme-option" data-theme="golden" type="button"><span class="theme-dot theme-golden"></span><span><strong>Golden</strong><small>Premium matchday feeling</small></span></button>
            <button class="theme-option" data-theme="neon" type="button"><span class="theme-dot theme-neon"></span><span><strong>Neon</strong><small>Electric stadium energy</small></span></button>
            <button class="theme-option" data-theme="violet" type="button"><span class="theme-dot theme-violet"></span><span><strong>Violet</strong><small>Creative futuristic mood</small></span></button>
        </div>`;

    // nav.js runs before this script, so put the panel AFTER the nav.
    if (!document.getElementById('themePanel')) {
        const nav = document.querySelector('.nav');
        if (nav) nav.insertAdjacentHTML('afterend', panelMarkup);
        else document.body.insertAdjacentHTML('beforeend', panelMarkup);
    }

    const panel = document.getElementById('themePanel');
    const themeButton = document.getElementById('themeButton');
    const modeButton = document.getElementById('modeButton');

    function applyTheme(value) {
        const theme = themes.includes(value) ? value : 'blend';
        themes.forEach(name => document.body.classList.remove(`theme-${name}`));
        document.body.classList.add(`theme-${theme}`);
        localStorage.setItem('njfn-theme', theme);
    }
    function updateModeIcon() {
        if (!modeButton) return;
        const light = document.body.classList.contains('light');
        modeButton.innerHTML = light
            ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>'
            : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z"/></svg>';
    }

    applyTheme(localStorage.getItem('njfn-theme') || 'blend');
    if (localStorage.getItem('njfn-mode') === 'light') document.body.classList.add('light');
    updateModeIcon();

    themeButton?.addEventListener('click', e => { e.stopPropagation(); panel?.classList.toggle('open'); });
    panel?.querySelectorAll('.theme-option').forEach(option => option.addEventListener('click', () => {
        applyTheme(option.dataset.theme); panel.classList.remove('open');
    }));
    modeButton?.addEventListener('click', () => {
        document.body.classList.toggle('light');
        localStorage.setItem('njfn-mode', document.body.classList.contains('light') ? 'light' : 'dark');
        updateModeIcon();
    });
    document.addEventListener('click', e => {
        if (!e.target.closest('#themePanel') && !e.target.closest('#themeButton')) panel?.classList.remove('open');
    });
})();
