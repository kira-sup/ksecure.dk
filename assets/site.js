(() => {
  'use strict';

  const translations = {"en":{"skip":"Skip to content","home":"Home","services":"Services","eyebrow":"INDEPENDENT DIGITAL SERVICES","heroWeb":"Websites.","heroTools":"Custom tools.","heroIt":"IT support.","heroDescription":"KSecure builds websites and tools, automates routine tasks and helps with IT setup.","explore":"Explore services","capabilities":"WHAT KSECURE CAN DO","websites":"Websites","webDescription":"Business websites, landing pages and portfolios.","tools":"Custom tools","toolDescription":"Browser tools, scripts and small dashboards.","automation":"Automation & integrations","automationDescription":"File processing, recurring reports and data handovers.","data":"Data & spreadsheets","dataDescription":"Data cleanup, validation and reporting.","it":"Practical IT support","itDescription":"Windows, Linux, virtual machines and networking.","documentation":"Documentation & handover","docDescription":"Setup instructions, usage guides and system notes.","processEyebrow":"PROJECT PROCESS","processTitle":"How it works","step1":"01 / UNDERSTAND","step2":"02 / DEFINE & BUILD","step3":"03 / REVIEW & HAND OVER","step1Title":"Describe the task.","step1Description":"Explain what you need and share any relevant files or requirements.","step2Title":"Agree before starting.","step2Description":"Confirm the deliverables, price and timeline before work starts.","step3Title":"Review and handover.","step3Description":"Review the result and receive the files and setup notes.","contactEyebrow":"CONTACT","contactTitle":"Contact KSecure","contactDescription":"Email a short description of the task, your deadline and any requirements.","include":"WHAT TO INCLUDE","question1":"What would you like to build or improve?","question2":"What do you have to work with now?","question3":"What would a successful result look like?","question4":"Is there a deadline or budget to work within?","email":"Email KSecure","emailNote":"Opens your email app.","backTop":"Back to top ↑","footerServices":"Websites · Tools · Automation · Practical IT","brandHome":"KSecure home","navigation":"Main navigation","menuOpen":"Open navigation","menuClose":"Close navigation","carouselLabel":"KSecure services","carouselRole":"carousel","slideRole":"slide","slideInstructions":"Service slides. Use left and right arrow keys.","previous":"Previous service","next":"Next service","choose":"Choose a service","pageTitle":"Websites, tools & IT support · KSecure","metaDescription":"Freelance websites, custom tools, automation and IT support. Agree the scope, price and timeline before work starts.","slide1":"1 of 6: Websites","dot1":"Show Websites","slide2":"2 of 6: Custom tools","dot2":"Show Custom tools","slide3":"3 of 6: Automation & integrations","dot3":"Show Automation & integrations","slide4":"4 of 6: Data & spreadsheets","dot4":"Show Data & spreadsheets","slide5":"5 of 6: Practical IT support","dot5":"Show Practical IT support","slide6":"6 of 6: Documentation & handover","dot6":"Show Documentation & handover","errorTitle":"Page not found · KSecure","errorEyebrow":"404 / A DIFFERENT DIRECTION","errorHeading":"Let’s find<br>the right page.","errorDescription":"This address may have changed. Explore KSecure’s services or start a project conversation.","backHome":"Back to home ↗","errorExplore":"Explore services ↗","errorHeadingLine1":"Let’s find","errorHeadingLine2":"the right page."},"da":{"skip":"Gå til indhold","home":"Forside","services":"Ydelser","eyebrow":"SELVSTÆNDIGE DIGITALE YDELSER","heroWeb":"Hjemmesider.","heroTools":"Værktøjer.","heroIt":"IT-support.","heroDescription":"KSecure bygger hjemmesider og værktøjer, automatiserer rutineopgaver og hjælper med IT-opsætning.","explore":"Se ydelser","capabilities":"DET KAN KSECURE HJÆLPE MED","websites":"Hjemmesider","webDescription":"Virksomhedshjemmesider, landingssider og porteføljer.","tools":"Skræddersyede værktøjer","toolDescription":"Browserværktøjer, scripts og små dashboards.","automation":"Automatisering og integrationer","automationDescription":"Filbehandling, tilbagevendende rapporter og dataoverførsel.","data":"Data og regneark","dataDescription":"Datarensning, validering og rapportering.","it":"Praktisk IT-support","itDescription":"Windows, Linux, virtuelle maskiner og netværk.","documentation":"Dokumentation og overdragelse","docDescription":"Opsætningsvejledninger, brugervejledninger og systemnoter.","processEyebrow":"SÅDAN FOREGÅR DET","processTitle":"Sådan arbejder vi","step1":"01 / OPGAVEN","step2":"02 / AFTALE OG UDVIKLING","step3":"03 / GENNEMGANG OG OVERDRAGELSE","step1Title":"Beskriv opgaven.","step1Description":"Beskriv dit behov, og del relevante filer eller krav.","step2Title":"Aftal rammerne først.","step2Description":"Aftal leverancer, pris og tidsplan, før arbejdet begynder.","step3Title":"Gennemgang og overdragelse.","step3Description":"Gennemgå resultatet, og få de færdige filer og opsætningsnoter.","contactEyebrow":"KONTAKT","contactTitle":"Kontakt KSecure","contactDescription":"Send en kort beskrivelse af opgaven, din deadline og eventuelle krav.","include":"DET MÅ DU GERNE OPLYSE","question1":"Hvad vil du gerne bygge eller forbedre?","question2":"Hvad har du at arbejde med i dag?","question3":"Hvad skal resultatet kunne?","question4":"Er der en deadline eller et budget?","email":"Skriv til KSecure","emailNote":"Åbner dit mailprogram.","backTop":"Til toppen ↑","footerServices":"Hjemmesider · Værktøjer · Automatisering · Praktisk IT","brandHome":"KSecure forside","navigation":"Hovednavigation","menuOpen":"Åbn menu","menuClose":"Luk menu","carouselLabel":"KSecures ydelser","carouselRole":"karrusel","slideRole":"dias","slideInstructions":"Ydelser. Brug venstre og højre piletast.","previous":"Forrige ydelse","next":"Næste ydelse","choose":"Vælg en ydelse","pageTitle":"Hjemmesider, værktøjer og IT-support · KSecure","metaDescription":"Freelance hjemmesider, skræddersyede værktøjer, automatisering og IT-support. Omfang, pris og tidsplan aftales før opstart.","slide1":"1 af 6: Hjemmesider","dot1":"Vis hjemmesider","slide2":"2 af 6: Skræddersyede værktøjer","dot2":"Vis skræddersyede værktøjer","slide3":"3 af 6: Automatisering og integrationer","dot3":"Vis automatisering og integrationer","slide4":"4 af 6: Data og regneark","dot4":"Vis data og regneark","slide5":"5 af 6: Praktisk IT-support","dot5":"Vis praktisk it-support","slide6":"6 af 6: Dokumentation og overdragelse","dot6":"Vis dokumentation og overdragelse","errorTitle":"Siden blev ikke fundet · KSecure","errorEyebrow":"404 / SIDEN FINDES IKKE","errorHeading":"Find den<br>rigtige side.","errorDescription":"Adressen kan være ændret. Se KSecures ydelser, eller kontakt os om en opgave.","backHome":"Til forsiden ↗","errorExplore":"Se ydelser ↗","errorHeadingLine1":"Find den","errorHeadingLine2":"rigtige side."}};
  let language = 'en';
  try {
    const requested = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('ksecure-language');
    language = ['en', 'da'].includes(requested) ? requested : (['en', 'da'].includes(saved) ? saved : 'en');
  } catch {}
  const t = key => translations[language][key] || translations.en[key] || key;
  const applyLanguage = () => {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t(element.dataset.i18n); });
    document.querySelectorAll('[data-i18n-content]').forEach(element => { element.setAttribute('content', t(element.dataset.i18nContent)); });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => { element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel)); });
    document.querySelectorAll('[data-i18n-aria-roledescription]').forEach(element => { element.setAttribute('aria-roledescription', t(element.dataset.i18nAriaRoledescription)); });
    document.querySelectorAll('[data-language-toggle]').forEach(button => {
      button.hidden = false;
      button.textContent = language === 'en' ? 'Dansk' : 'English';
      button.lang = language === 'en' ? 'da' : 'en';
      button.setAttribute('aria-label', language === 'en' ? 'Switch to Danish' : 'Skift til engelsk');
    });
    const navigationButton = document.querySelector('.menu-toggle');
    if (navigationButton) navigationButton.setAttribute('aria-label', t(navigationButton.getAttribute('aria-expanded') === 'true' ? 'menuClose' : 'menuOpen'));
  };
  document.querySelectorAll('[data-language-toggle]').forEach(button => button.addEventListener('click', () => {
    language = language === 'en' ? 'da' : 'en';
    try { localStorage.setItem('ksecure-language', language); } catch {}
    applyLanguage();
  }));
  applyLanguage();

  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (menu && navigation) {
    const closeMenu = () => {
      navigation.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', t('menuOpen'));
    };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      navigation.classList.toggle('open', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', t(open ? 'menuClose' : 'menuOpen'));
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
      '#projects': 'index.html#services', '#solutions': 'index.html#services',
      '#skills': 'index.html#services'
    };
    if (oldRoutes[location.hash]) location.replace(oldRoutes[location.hash]);
  }


  document.querySelectorAll('[data-feature-carousel]').forEach(root => {
    const viewport = root.querySelector('.feature-viewport');
    const track = root.querySelector('.feature-track');
    const slides = Array.from(track.children);
    const dots = Array.from(root.querySelectorAll('[data-feature-dot]'));
    const controls = root.querySelector('.feature-controls');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const total = slides.length;
    if (total < 2) return;
    let current = 1, timer, focused = false, inView = false, moving = false;
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
      if (!reduced.matches && !focused && inView && !document.hidden) timer = setTimeout(() => go(current + 1, false), 2500);
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
      root.dataset.activeSlide = String(index + 1);
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
    root.addEventListener('focusin', () => { focused = document.activeElement.matches(':focus-visible'); schedule(); });
    root.addEventListener('focusout', () => { requestAnimationFrame(() => { focused = root.contains(document.activeElement) && document.activeElement.matches(':focus-visible'); schedule(); }); });
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
    reduced.addEventListener('change', () => { if (reduced.matches) settle(); update(false); schedule(); });
    new ResizeObserver(() => { position(true); moving = false; }).observe(viewport);
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, {threshold: .25}).observe(root);
    position(true);
    update(false);
  });
})();
