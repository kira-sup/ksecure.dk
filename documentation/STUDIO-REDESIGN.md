# KSecure freelance studio redesign

Prepared for publication on 9 November 2026. This revision follows the owner's request to present KSecure as a freelance brand focused on what it can do, rather than a personal biography or collection of example projects.

## Current visitor experience

| File | Purpose |
| --- | --- |
| [index.html](../index.html) | Direct service introduction, six capabilities, three-step process and the retained project button |
| [solutions.html](../solutions.html) | Legacy redirect to the homepage service carousel |
| [info.html](../info.html) | Brief business description, three project expectations and `#contact` |
| [projects.html](../projects.html) | Legacy redirect to the homepage service carousel |
| [404.html](../404.html) | Missing-page recovery through Home, Services and Contact |
| [assets/site.css](../assets/site.css) | New responsive blue, ink and pale-background visual system |
| [assets/site.js](../assets/site.js) | Mobile menu, Escape handling, desktop reset and old homepage fragment redirects |

Main navigation is Home, Services and About KSecure. Repeated contact calls to action were removed at the owner's request; the circular “Discuss a project” buttons on Home and Services are retained, together with the contact section's email link. The main pages contain no personal biography, sample-project cards, report previews or PDF portfolio promotions. Earlier PDF, demo and report files are retained in Git and at their existing paths for reference; they are not linked from the main visitor pages.

## Services and scope

The service areas remain grounded in the previous site's stated capabilities: websites and digital presence, custom tools and applications, automation and integrations, data and spreadsheets, practical IT support, and documentation and handover. Descriptions explain what work can include without inventing completed customers, testimonials, certifications, pricing, team size or guaranteed availability. Each project requires agreement about deliverables, constraints and access.

KSecure is described as an independent freelance practice. It does not claim to be a multi-person agency. The public enquiry destination is [khavenko@gmail.com](mailto:khavenko@gmail.com), supplied by the owner on 9 November 2026. The Email KSecure button uses a standard `mailto:` link and opens the visitor's email app. No contact form or submission backend is required.

## Styling and behavior

System fonts, large editorial headings, numbered services and custom inline SVG artwork provide the brand presentation. There are no external font or image dependencies. The main stylesheet replaces the old stylesheet; it no longer contains historical project search, file-sort illustrations or guide-page components.

The main pages share duplicated header/footer markup. Update all three when changing navigation, contact labels or shared destinations. The service sections use IDs `websites`, `tools`, `automation`, `data`, `it` and `documentation`; homepage service links and the service index rely on them. `info.html#contact` is the destination of the retained circular “Discuss a project” buttons.

At widths up to 800px, JavaScript enables an expandable mobile menu. Without JavaScript the mobile navigation remains visible. Menu actions update the label and expanded state. Escape closes the menu and returns focus. Switching to desktop width clears an open mobile state. The stylesheet includes visible keyboard focus and reduced-motion overrides. Content is visible without reveal-animation dependencies.

Legacy homepage fragments `#projects`, `#solutions` and `#skills` point to Services. `#contact` points to `info.html#contact`. The old `projects.html` URL redirects to `solutions.html`. The historical `/docs/` redirect pages still point to the existing PDF and were not changed by this revision.

## Maintenance and hosting

The site remains buildless HTML/CSS/JavaScript in the existing GitHub repository. There is no framework migration, new backend, environment variable, contact-submission service or new hosting provider. `CNAME`, `.nojekyll`, archived documents and earlier source appendices are preserved. Publication uses the repository's existing branch and hosting process.

JavaScript syntax, relative navigation/asset destinations, fragment targets, page landmarks, service coverage and intended file changes are checked before the GitHub commit. Browser visual verification was unavailable because the local preview timed out and Computer Use stopped when it could not reliably identify the browser URL. This revision therefore does not claim a completed visual browser audit or live deployment verification. Review the live site at desktop and mobile widths once the existing hosting deployment finishes.

The [previous architecture](ARCHITECTURE.md), [operations guide](OPERATIONS.md) and [source snapshots](SOURCE-CURRENT.md) remain historical records with explicit baseline commit IDs. Use this note and the linked current source files when maintaining the redesigned site. Git history preserves the exact redesign and its predecessor for comparison and recovery.

## Plain-language copy update — 9 November 2026

At the owner’s request, the main pages use short, factual service descriptions. The decorative slogans, capability strip, blue statement band, repeated values section and long introductory paragraphs were removed. Services keep one description and a deliverables list each. Trust is supported by explaining scope, price and timing before work, review against requirements, and files with usage notes at handover. No testimonials, customer counts, credentials or guarantees were added. The two “Discuss a project” buttons and the supplied email address remain.

## Horizontal services slider — 9 November 2026

The homepage service grid is now a single horizontal row of scroll-snap cards. It supports native touch/trackpad scrolling, previous/next buttons, a visible-range counter, and arrow keys when the track has focus. Controls appear only with JavaScript; native scrolling remains available without it. No slides advance automatically. Reduced-motion preferences disable smooth programmatic scrolling. The detailed Services page and its six fragment destinations remain unchanged. Homepage asset links include a version query so returning visitors receive the matching CSS and JavaScript.

## Centered feature carousel — 9 November 2026

The service row is replaced by a centered, large-slide carousel with partially visible neighbours, service-specific vector artwork, dot navigation and previous/next controls. Slides change every 5.5 seconds only while the carousel is in view; playback pauses on hover, keyboard focus and hidden tabs. A play/pause button is provided. Reduced-motion users start paused. Manual arrows, dots, keyboard navigation and swipe gestures remain available. Cloned end slides create a continuous loop and are hidden from accessibility APIs. Without JavaScript, the six original slides remain horizontally scrollable. This supersedes the earlier horizontal-card implementation.

## Carousel controls update — 9 November 2026

At the owner’s request, the numerical slide counter and visible play/pause toggle are removed. Previous and next arrows sit at the left and right edges of the slide area, with selection dots centered below. Automatic cycling still pauses for hover, keyboard focus, hidden tabs and reduced-motion preferences. Using an arrow, dot, keyboard action or swipe stops automatic cycling for the rest of that page visit.

## Separate Services page removed — 9 November 2026

The owner removed the repeated Services detail page. The six service slides on the homepage are now the sole main service presentation, at `index.html#services`. Navigation, footer and recovery links point there. The six “View service” links were removed from the slides because there is no longer a separate detail destination. `solutions.html` and `projects.html` are minimal redirects to the homepage carousel, preserving old URLs without the deleted content. Earlier descriptions in this history record the previous implementation.

## Smooth automatic service transitions — 9 November 2026

Service slides advance every 4.5 seconds with a 1.1-second eased transition and a seamless loop. Mouse hover and manual arrow/dot/swipe actions no longer permanently stop playback. Autoplay restarts its delay after navigation and pauses while the carousel is outside the viewport, the tab is hidden, or a keyboard-focused control is being used. Reduced-motion preferences continue to disable automatic movement. Counter and playback buttons remain removed, and arrows retain their opposite-side positions.
