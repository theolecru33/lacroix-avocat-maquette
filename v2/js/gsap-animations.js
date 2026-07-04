/* ============================================================
   LACROIX AVOCAT · V2 « La note » · animations
   Une seule idée : l'encre qui se pose. Révélations douces,
   pas de compteur, pas de parallaxe, pas de spectacle.
   ============================================================ */
(function () {
  'use strict';

  /* gsap-pret AVANT tout garde : sans elle les [data-reveal] resteraient invisibles */
  document.documentElement.classList.add('gsap-pret');

  if (!window.gsap) { return; }
  gsap.registerPlugin(ScrollTrigger);

  var mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (mouvementReduit) {
    gsap.set('[data-reveal]', { clearProps: 'all' });
    return;
  }

  /* ---------- Hero : une cascade orchestrée au chargement ---------- */
  var heroElements = gsap.utils.toArray('.hero [data-reveal]');
  gsap.fromTo(heroElements,
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.08 }
  );

  /* ---------- Révélations au scroll : fondu discret, une fois ---------- */
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    if (el.closest('.hero')) { return; }
    gsap.fromTo(el,
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      }
    );
  });
})();
