/* site.js – menu mobile + apparition douce des blocs au défilement */
(function () {
    // Menu mobile (bouton « Menu »)
    var nav = document.querySelector('.nav-container');
    var menu = document.querySelector('.nav-menu');
    if (nav && menu) {
        menu.id = menu.id || 'menu-principal';
        var btn = document.createElement('button');
        btn.className = 'nav-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', menu.id);
        btn.innerHTML = '<span class="nav-toggle-bars" aria-hidden="true"></span><span class="nav-toggle-label">Menu</span>';
        nav.insertBefore(btn, menu);
        btn.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) { nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
        });
    }

    // Apparition douce (seulement pour les blocs sous la ligne de flottaison)
    var reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduit || !('IntersectionObserver' in window)) return;
    var cibles = document.querySelectorAll('.card, .price-card, .step, .timeline li, .cta-final, .why-quote, .check-list li, .section-title');
    var obs = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.12 });
    cibles.forEach(function (el) {
        if (el.getBoundingClientRect().top > window.innerHeight) {
            el.classList.add('reveal');
            obs.observe(el);
        }
    });
})();
