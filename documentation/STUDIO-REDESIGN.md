# KSecure freelance studio redesign

Prepared for publication on 9 November 2026. This revision follows the owner's request to present KSecure as a freelance brand focused on what it can do, rather than a personal biography or collection of example projects.

## Current visitor experience

| File | Purpose |
| --- | --- |
| [index.html](../index.html) | Brand introduction, six capabilities, working principles, three-step process and contact calls to action |
| [solutions.html](../solutions.html) | Detailed service sections, potential deliverables, scope boundaries and service anchor navigation |
| [info.html](../info.html) | About KSecure, working principles, four-step project process and `#contact` |
| [projects.html](../projects.html) | Meta-refresh redirect and fallback link to Services, retaining the old URL |
| [404.html](../404.html) | Missing-page recovery through Home, Services and Contact |
| [assets/site.css](../assets/site.css) | New responsive blue, ink and pale-background visual system |
| [assets/site.js](../assets/site.js) | Mobile menu, Escape handling, desktop reset and old homepage fragment redirects |

Main navigation is Home, Services, About KSecure and Let's talk. The main pages contain no personal biography, sample-project cards, report previews or PDF portfolio promotions. Earlier PDF, demo and report files are retained in Git and at their existing paths for reference; they are not linked from the main visitor pages.

## Services and scope

The service areas remain grounded in the previous site's stated capabilities: websites and digital presence, custom tools and applications, automation and integrations, data and spreadsheets, practical IT support, and documentation and handover. Descriptions explain what work can include without inventing completed customers, testimonials, certifications, pricing, team size or guaranteed availability. Each project requires agreement about deliverables, constraints and access.

KSecure is described as an independent freelance practice. It does not claim to be a multi-person agency. The public enquiry destination is [khavenko@gmail.com](mailto:khavenko@gmail.com), supplied by the owner on 9 November 2026. The Email KSecure button uses a standard `mailto:` link and opens the visitor's email app. No contact form or submission backend is required.

## Styling and behavior

System fonts, large editorial headings, numbered services and custom inline SVG artwork provide the brand presentation. There are no external font or image dependencies. The main stylesheet replaces the old stylesheet; it no longer contains historical project search, file-sort illustrations or guide-page components.

The main pages share duplicated header/footer markup. Update all three when changing navigation, contact labels or shared destinations. The service sections use IDs `websites`, `tools`, `automation`, `data`, `it` and `documentation`; homepage service links and the service index rely on them. `info.html#contact` is the shared enquiry destination.

At widths up to 800px, JavaScript enables an expandable mobile menu. Without JavaScript the mobile navigation remains visible. Menu actions update the label and expanded state. Escape closes the menu and returns focus. Switching to desktop width clears an open mobile state. The stylesheet includes visible keyboard focus and reduced-motion overrides. Content is visible without reveal-animation dependencies.

Legacy homepage fragments `#projects`, `#solutions` and `#skills` point to Services. `#contact` points to `info.html#contact`. The old `projects.html` URL redirects to `solutions.html`. The historical `/docs/` redirect pages still point to the existing PDF and were not changed by this revision.

## Maintenance and hosting

The site remains buildless HTML/CSS/JavaScript in the existing GitHub repository. There is no framework migration, new backend, environment variable, contact-submission service or new hosting provider. `CNAME`, `.nojekyll`, archived documents and earlier source appendices are preserved. Publication uses the repository's existing branch and hosting process.

JavaScript syntax, relative navigation/asset destinations, fragment targets, page landmarks, service coverage and intended file changes are checked before the GitHub commit. Browser visual verification was unavailable because the local preview timed out and Computer Use stopped when it could not reliably identify the browser URL. This revision therefore does not claim a completed visual browser audit or live deployment verification. Review the live site at desktop and mobile widths once the existing hosting deployment finishes.

The [previous architecture](ARCHITECTURE.md), [operations guide](OPERATIONS.md) and [source snapshots](SOURCE-CURRENT.md) remain historical records with explicit baseline commit IDs. Use this note and the linked current source files when maintaining the redesigned site. Git history preserves the exact redesign and its predecessor for comparison and recovery.
