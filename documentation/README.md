# KSecure — complete project documentation

Recorded on **8 November 2026** for [kira-sup/ksecure.dk](https://github.com/kira-sup/ksecure.dk).

This is the maintainer's memory of the project: what exists, how it works, how to change and recover it, and the complete text source of both the current website and an earlier tool bundle. It documents repository evidence; it does not assume that project descriptions are deployed services or that an example report proves a real system works.

## Documentation map

| Document | Contents |
| --- | --- |
| [Architecture](ARCHITECTURE.md) | Pages, assets, JavaScript behavior, styling, redirects and technical limitations |
| [Operations](OPERATIONS.md) | Local preview, editing, release checks, hosting, troubleshooting, recovery and documentation updates |
| [Archived tools](ARCHIVED-TOOLS.md) | Earlier Python tools, commands, input formats, results, tests and limitations |
| [History](HISTORY.md) | Recorded commits and the change from downloadable demos to customer-facing project briefs |
| [Current source](SOURCE-CURRENT.md) | Complete contents of every current text file at the recorded source commit |
| [Historical source](SOURCE-HISTORICAL.md) | Complete earlier text source, including Python, tests, samples, reports and guides |
| [Source manifest](SOURCE-MANIFEST.json) | All paths, Git blob hashes, byte sizes, immutable source links and binary-file references |

## Project in one page

KSecure is Kyrylo's independent IT project website. The current copy describes an IT student offering to discuss websites, custom tools, automation, data work and practical IT help. Its six examples are personal learning projects using synthetic data, not customer case studies. Scope and feasibility are agreed for each request. The public contact is the [GitHub profile](https://github.com/kira-sup).

The production-facing repository consists of plain HTML, CSS, JavaScript and a PDF portfolio. There is no package manager, framework, build command, database, server application, API integration, payment flow, booking flow or configured environment variable in the recorded tree. Python is useful for a local preview server; it is not required by the deployed website. The older Python automation examples are preserved in this documentation as historical source and are not restored as active website downloads.

The existing README identifies GitHub Pages as hosting at [ksecure.dk](https://ksecure.dk). `CNAME` contains `ksecure.dk` and `.nojekyll` is present. Account-level Pages settings, DNS records, TLS state and the current live deployment were not inspected for this documentation. See Operations before changing hosting.

## Pages and project examples

| Page or artifact | Role |
| --- | --- |
| `index.html` | Short introduction, decorative file/data illustration and links to the three main sections |
| `solutions.html` | Six areas: websites, tools, automation, data, practical IT and documentation |
| `projects.html` | Six project cards with PDF briefs and four available visual previews |
| `info.html#contact` | Background, three-step working process and GitHub contact |
| `documents/KSecure_Project_Portfolio.pdf` | Existing downloadable project portfolio, retained as a binary document |
| `web/lab.html` | Dark home-lab website concept with working category buttons |
| `web/support.html` | Fictional light IT service website concept with expandable questions |
| `examples/inventory/report.html` | Static synthetic inventory result |
| `examples/backups/report.html` | Static synthetic backup result |
| `404.html` | Recovery links for unknown URLs |

The six cards are file organiser, network export archive, device inventory, backup reporting, home-lab portfolio and IT service website. PDF page fragments currently point organisation examples to page 2, data examples to page 3 and website examples to page 4. These fragments are references in HTML; the PDF's contents and rendering were not independently reviewed in this documentation pass.

## Scope of the source archive

The current snapshot is commit [`4dd5c471f42034f57809305a910d8c93890773da`](https://github.com/kira-sup/ksecure.dk/tree/4dd5c471f42034f57809305a910d8c93890773da): **28 files, including 27 text files and one PDF**. The historical snapshot is [`c0c143657a82c1fda5a6253e419825b4df5bf8bc`](https://github.com/kira-sup/ksecure.dk/tree/c0c143657a82c1fda5a6253e419825b4df5bf8bc): **63 files, including 62 text files and one ZIP**. Both snapshots include dotfiles, empty files, configuration files, CSS, inline code, sample data and existing documentation.

The appendices contain literal file contents in code fences, not shortened examples. Binary files are indexed by immutable GitHub link and hash rather than represented as source code. All 89 text-file entries were checked against their Git blob SHA-1 values before publication. Identical files appearing in both snapshots are deliberately included twice so each snapshot can be understood independently.

These are two complete snapshots, not a copy of every file revision from every commit. The full revision history remains in Git. The history page links the recorded commits, including the earlier redesigns. This documentation commit itself is not recursively embedded in its own source appendix. Later changes require a new snapshot or an explicit update; see Operations.

## Important things to remember

- The website examples and reports do not connect to equipment, customer data or live backup systems.
- The current branch has no Python tools, input CSVs, tests or downloadable demo ZIP outside these archived code blocks. Commands in Archived tools require the historical checkout first.
- Old `/docs/*.html` routes now redirect to the PDF. The new maintainer documentation lives in `documentation/` to preserve those public routes.
- Shared navigation and footers are duplicated across the four main HTML files. Keep them in sync when editing.
- `assets/site.js` and parts of `assets/site.css` retain behavior and styling from older pages. A function remaining in an asset does not mean its control appears on a current page.
- `web/support.html` still refers to included Python scripts, and `web/lab.html` has source-download wording in its description, although current main no longer carries that bundle. Treat these as stale demo copy to review in a future website change.
- No license file appears in either recorded snapshot. This documentation does not grant a new software license.

## Validation record

The documentation pass inventories both source trees, verifies all fetched text against Git blob hashes, and checks generated appendix coverage and documentation links. It preserves the site's existing files and the PDF. It does not claim a browser accessibility audit, live-domain test, DNS audit or a fresh execution of the historical Python test suite. Original historical guides include their own earlier test claims; those are preserved as historical statements.
