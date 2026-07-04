/* ============================================================
   LACROIX AVOCAT · animations GSAP
   Sobres, au service du contenu : révélations douces,
   compteurs de statistiques, portrait du hero.
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

  /* ---------- Hero : entrée en cascade ---------- */
  var heroElements = gsap.utils.toArray('.hero [data-reveal]');
  gsap.fromTo(heroElements,
    { opacity: 0, y: 26 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
  );

  /* ---------- Révélations au scroll ---------- */
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    if (el.closest('.hero')) { return; }
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  /* ---------- Compteurs des statistiques ---------- */
  gsap.utils.toArray('[data-compte]').forEach(function (el) {
    var cible = parseInt(el.getAttribute('data-compte'), 10);
    var valeur = { n: 0 };
    gsap.to(valeur, {
      n: cible,
      duration: 1.6,
      ease: 'power2.out',
      delay: 0.5,
      onUpdate: function () { el.textContent = Math.round(valeur.n); },
      scrollTrigger: { trigger: el, start: 'top 95%', once: true }
    });
  });

  /* ---------- Portrait sous arche : montée douce à l'arrivée ---------- */
  var portrait = document.querySelector('.hero-arche img');
  if (portrait) {
    gsap.fromTo(portrait,
      { y: 46 },
      { y: 2, duration: 1.2, ease: 'power3.out', delay: 0.35 }
    );
  }
})();
