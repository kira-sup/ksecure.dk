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
})();
