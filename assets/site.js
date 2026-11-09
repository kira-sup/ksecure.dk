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

  document.querySelectorAll('[data-service-slider]').forEach(slider => {
    const track = slider.querySelector('.services-grid');
    const cards = Array.from(track.querySelectorAll('.service-preview'));
    const controls = slider.querySelector('.slider-controls');
    const previous = slider.querySelector('[data-slide-prev]');
    const next = slider.querySelector('[data-slide-next]');
    const status = slider.querySelector('.slider-status');
    if (!cards.length) return;
    controls.hidden = false;
    const update = () => {
      const left = track.scrollLeft;
      const width = track.clientWidth;
      const visible = cards.map((card, index) => {
        const start = card.offsetLeft - track.offsetLeft;
        const shown = Math.min(start + card.offsetWidth, left + width) - Math.max(start, left);
        return shown >= card.offsetWidth / 2 ? index + 1 : null;
      }).filter(Boolean);
      previous.disabled = left <= 2;
      next.disabled = left >= track.scrollWidth - width - 2;
      if (visible.length) {
        const first = visible[0], last = visible[visible.length - 1];
        const text = (first === last ? first : first + '–' + last) + ' / ' + cards.length;
        if (status.textContent !== text) status.textContent = text;
      }
    };
    const move = direction => {
      const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
      track.scrollBy({left: direction * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    };
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('keydown', event => {
      if (event.target !== track) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    track.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    update();
  });
})();
