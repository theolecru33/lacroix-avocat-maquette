/* ============================================================
   LACROIX AVOCAT · V2 « La note » · interactions
   Menu mobile, questions dépliables, formulaire simulé.
   ============================================================ */
(function () {
  'use strict';

  /* Filet de sécurité : si gsap-animations.js ne se charge pas,
     les [data-reveal] doivent quand même redevenir visibles */
  if (!window.gsap) {
    document.documentElement.classList.add('gsap-pret');
  }

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu-mobile');

  var fermerMenu = function () {
    burger.classList.remove('est-ouvert');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    menu.hidden = true;
  };

  burger.addEventListener('click', function () {
    var ouvert = burger.classList.toggle('est-ouvert');
    burger.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
    menu.hidden = !ouvert;
  });

  menu.querySelectorAll('a').forEach(function (lien) {
    lien.addEventListener('click', fermerMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) { fermerMenu(); burger.focus(); }
  });

  /* ---------- Questions dépliables ---------- */
  var questions = document.querySelectorAll('.question');

  var ouvrir = function (item) {
    var panneau = item.querySelector('.question-panneau');
    var bouton = item.querySelector('.question-entete');
    item.classList.add('est-ouvert');
    bouton.setAttribute('aria-expanded', 'true');
    panneau.hidden = false;
    if (window.gsap) {
      gsap.killTweensOf(panneau);
      gsap.fromTo(panneau, { height: 0, opacity: 0 }, {
        height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out',
        onComplete: function () { panneau.style.height = ''; }
      });
    }
  };

  var fermer = function (item) {
    var panneau = item.querySelector('.question-panneau');
    var bouton = item.querySelector('.question-entete');
    item.classList.remove('est-ouvert');
    bouton.setAttribute('aria-expanded', 'false');
    if (window.gsap) {
      gsap.killTweensOf(panneau);
      gsap.to(panneau, {
        height: 0, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: function () { panneau.hidden = true; panneau.style.height = ''; }
      });
    } else {
      panneau.hidden = true;
    }
  };

  questions.forEach(function (item) {
    var bouton = item.querySelector('.question-entete');
    bouton.addEventListener('click', function () {
      var estOuvert = item.classList.contains('est-ouvert');
      questions.forEach(function (autre) {
        if (autre !== item && autre.classList.contains('est-ouvert')) { fermer(autre); }
      });
      if (estOuvert) { fermer(item); } else { ouvrir(item); }
    });
  });

  /* ---------- Formulaire (maquette : envoi simulé) ---------- */
  var formulaire = document.querySelector('.contact-formulaire');
  if (formulaire) {
    formulaire.addEventListener('submit', function (e) {
      e.preventDefault();
      var succes = formulaire.querySelector('.formulaire-succes');
      var bouton = formulaire.querySelector('[type="submit"]');
      succes.hidden = false;
      bouton.disabled = true;
      bouton.textContent = 'Demande envoyée';
      if (window.gsap) {
        gsap.from(succes, { opacity: 0, y: 8, duration: 0.4, ease: 'power2.out' });
      }
    });
  }
})();
