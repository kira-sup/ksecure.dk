(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (menu && navigation) {
    const closeMenu = () => {
      navigation.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation');
    };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      navigation.classList.toggle('open', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navigation.classList.contains('open')) {
        closeMenu();
        menu.focus();
      }
    });
    const desktop = window.matchMedia('(min-width: 801px)');
    desktop.addEventListener('change', event => { if (event.matches) closeMenu(); });
  }
  if (location.pathname === '/' || location.pathname.endsWith('/index.html')) {
    const oldRoutes = {
      '#projects': 'solutions.html', '#solutions': 'solutions.html',
      '#skills': 'solutions.html', '#contact': 'info.html#contact'
    };
    if (oldRoutes[location.hash]) location.replace(oldRoutes[location.hash]);
  }


  document.querySelectorAll('[data-feature-carousel]').forEach(root => {
    const viewport = root.querySelector('.feature-viewport');
    const track = root.querySelector('.feature-track');
    const slides = Array.from(track.children);
    const dots = Array.from(root.querySelectorAll('[data-feature-dot]'));
    const controls = root.querySelector('.feature-controls');
    const play = root.querySelector('[data-feature-play]');
    const counter = root.querySelector('.feature-count');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const total = slides.length;
    if (total < 2) return;
    let current = 1, timer, paused = reduced.matches, hovered = false, focused = false, inView = false, moving = false;
    const clone = slide => {
      const copy = slide.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.inert = true;
      copy.setAttribute('data-clone', '');
      return copy;
    };
    track.prepend(clone(slides[total - 1]));
    track.append(clone(slides[0]));
    const allSlides = Array.from(track.children);
    root.classList.add('carousel-ready');
    controls.hidden = false;
    const logical = () => ((current - 1 + total) % total);
    const position = instant => {
      const slide = allSlides[current];
      track.classList.toggle('no-transition', instant || reduced.matches);
      track.style.transform = 'translateX(' + (viewport.clientWidth / 2 - slide.offsetLeft - slide.offsetWidth / 2) + 'px)';
    };
    const schedule = () => {
      clearTimeout(timer);
      if (!paused && !hovered && !focused && inView && !document.hidden) timer = setTimeout(() => go(current + 1, false), 5500);
    };
    const update = manual => {
      const index = logical();
      allSlides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === current);
        if (!slide.hasAttribute('data-clone')) {
          slide.inert = i !== current;
          slide.setAttribute('aria-hidden', String(i !== current));
        }
      });
      dots.forEach((dot, i) => {
        if (i === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      counter.setAttribute('aria-live', manual ? 'polite' : 'off');
      counter.textContent = (index + 1) + ' / ' + total;
      root.dataset.activeSlide = String(index + 1);
      play.setAttribute('aria-label', paused ? 'Play automatic slides' : 'Pause automatic slides');
      play.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
    };
    const settle = () => {
      if (current === 0 || current === total + 1) {
        current = current === 0 ? total : 1;
        position(true);
        update(false);
      }
      moving = false;
    };
    function go(index, manual) {
      if (moving || index === current) return;
      moving = true;
      current = index;
      position(false);
      update(manual);
      if (reduced.matches) settle();
      schedule();
    }
    track.addEventListener('transitionend', event => { if (event.target === track && event.propertyName === 'transform') settle(); });
    root.querySelector('[data-feature-prev]').addEventListener('click', () => go(current - 1, true));
    root.querySelector('[data-feature-next]').addEventListener('click', () => go(current + 1, true));
    dots.forEach((dot, i) => dot.addEventListener('click', () => go(i + 1, true)));
    play.addEventListener('click', () => { paused = !paused; update(false); schedule(); });
    root.addEventListener('mouseenter', () => { hovered = true; schedule(); });
    root.addEventListener('mouseleave', () => { hovered = false; schedule(); });
    root.addEventListener('focusin', () => { focused = true; schedule(); });
    root.addEventListener('focusout', () => { requestAnimationFrame(() => { focused = root.contains(document.activeElement); schedule(); }); });
    viewport.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      go(event.key === 'Home' ? 1 : event.key === 'End' ? total : current + (event.key === 'ArrowRight' ? 1 : -1), true);
    });
    let pointerStart = null, swiped = false;
    viewport.addEventListener('pointerdown', event => { pointerStart = event.clientX; swiped = false; });
    viewport.addEventListener('pointerup', event => {
      if (pointerStart === null) return;
      const delta = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(delta) > 45) { swiped = true; go(current + (delta < 0 ? 1 : -1), true); }
    });
    viewport.addEventListener('pointercancel', () => { pointerStart = null; });
    viewport.addEventListener('click', event => { if (swiped) { event.preventDefault(); swiped = false; } }, true);
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', () => { if (reduced.matches) { paused = true; settle(); } update(false); schedule(); });
    new ResizeObserver(() => { position(true); moving = false; }).observe(viewport);
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, {threshold: .25}).observe(root);
    position(true);
    update(false);
  });
})();
