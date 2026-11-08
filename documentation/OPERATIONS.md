# Setup, maintenance, publishing and recovery

These instructions describe the recorded static website. Historical Python commands are in [Archived tools](ARCHIVED-TOOLS.md).

## Get and preview the current website

Clone the repository and run a local static server from its root:

```powershell
git clone https://github.com/kira-sup/ksecure.dk.git
cd ksecure.dk
py -m http.server 8000
```

Open `http://localhost:8000/`. On systems without the Windows `py` launcher, use `python -m http.server 8000` or `python3 -m http.server 8000`. Stop the server with Ctrl+C. No `npm install`, package download, build command or `.env` setup is required. Opening HTML files directly is useful for a quick look, but the server better represents normal URL resolution. This command is a local preview method, not a production server recommendation.

For an editable local copy while offline, keep the full clone including `.git`; a source appendix alone is less convenient for browsing binary files and earlier revisions.

## Where to make changes

| Desired change | Edit and related checks |
| --- | --- |
| Main introduction | `index.html`; check its title, description, main copy and navigation |
| Service areas | `solutions.html`; check all six cards and contact destination |
| Project descriptions | `projects.html`; keep synthetic-learning-work wording and verify preview/PDF page links |
| Background, process, contact | `info.html`; update repeated footer/contact links if destinations change |
| Shared navigation/footer | All four main pages; retain the correct active `aria-current` per page |
| Main styling | `assets/site.css`; inspect desktop, mobile and later overrides |
| Main interactive behavior | `assets/site.js`; review every expected selector and optional branch |
| Lab/service visual concepts | `web/lab.html`, `web/support.html`, `web/styles.css`; lab filtering is inline JavaScript |
| Sample reports | `examples/*/report.html`; these are static output artifacts, not editable source datasets |
| Portfolio | `documents/KSecure_Project_Portfolio.pdf`; confirm all linked page numbers after replacement |
| Domain | `CNAME` plus external hosting/DNS configuration; changing the file alone is not a complete domain migration |
| Legacy routes | Existing redirect HTML in `docs/` and `demo-guide.html`; preserve old links where possible |
| Maintainer notes | `documentation/`; keep source snapshot IDs and validation claims accurate |

Use a branch for normal changes, review the diff, and publish through the repository's agreed process. Do not infer that a service mentioned in marketing copy has already been implemented. Keep personal learning examples separate from claims about customers, certifications or paid projects.

## Review before publishing a website change

1. Open Home, Projects, Solutions and Info at desktop and narrow mobile widths. Check headings, wrapping, spacing and overflow.
2. Use the mobile menu, every main navigation link and the contact link. Check Escape and keyboard focus. Confirm the active-page announcement is correct.
3. Follow all six PDF brief links, both report links and both website-concept previews. Confirm the PDF opens and its page order still matches the fragments.
4. Open old documentation routes and `demo-guide.html`; confirm their intended production destination and fallback link. Preview `404.html` directly and test a missing URL on the deployed host, since a simple local server does not automatically serve the custom file for every error.
5. On the lab concept, test each filter and its pressed state. On the service concept, expand the questions. Confirm fictional-service labels remain clear.
6. Check keyboard access, visible focus, zoomed text and reduced motion. Inspect the browser console for unexpected errors.
7. Inspect the diff for unintended changes and for private material in examples, metadata or documents. Record what was actually checked.

There is no current automated test suite or CI workflow in the recorded source tree. Documentation-only changes need source, link and diff validation; historical tests are not tests of today's website. A website change should receive browser checks appropriate to the behavior changed.

## Hosting and deployment

Repository evidence identifies GitHub Pages and `ksecure.dk`; `.nojekyll` allows the source to be treated as a plain static site. There is no checked-in GitHub Actions workflow, build configuration or deployment script. Do not assume a workflow exists because the site is on GitHub.

Before changing publication, inspect the repository's Pages settings for the selected publishing branch/folder or workflow, the custom domain and HTTPS configuration. Inspect the actual DNS provider separately. These settings are outside the recorded files and were not captured by this documentation pass. The repository must publish the directory containing the root `index.html` and its matching relative assets. Publishing only the existing `docs/` folder would expose redirect pages rather than the current website.

If Pages is configured to publish `main` at the repository root, a commit there can trigger a deployment; confirm that setting instead of treating it as verified. After the deployment completes, verify the custom domain, HTTPS, main pages, PDF and legacy routes. Retain `CNAME` and `.nojekyll` unless deliberately changing hosting. Check browser caching if an asset appears stale.

## Common problems

| Symptom | What to check |
| --- | --- |
| Main pages have no styling | Confirm `assets/site.css` exists beside the root pages and the server root is correct; inspect the asset URL and response |
| Mobile menu does not open | Confirm deferred `assets/site.js` loads, `#navigation` and `.menu-toggle` match, and the console is clear |
| Documentation immediately leaves localhost | Expected for old PDF redirect pages, which use an absolute production URL; use `documentation/*.md` on GitHub for maintainer notes |
| Old homepage anchor goes to another page | Expected mapping in `assets/site.js`; `#contact` currently maps to Info without a contact fragment |
| A current project card cannot be filtered | Current Projects has no filter/search controls; older filtering code remains in the shared asset |
| A report never updates | It is static HTML. Historical tools and new input are needed to generate a new report |
| Demo says scripts are included but they are absent | Stale text remains in the website concepts; read the historical appendix rather than assuming tools exist on main |
| Downloaded ZIP/Python command is missing | The current published tree deliberately removed the old demo bundle; use a separate historical checkout |
| Custom 404 links break under a subpath | `404.html` assumes a domain root; review path strategy for subpath deployment |
| Changes appear on GitHub but not the site | Inspect actual Pages source, deployment result, domain and caching before editing files again |

## Recover an older version safely

Inspect history and one file without modifying the working tree:

```powershell
git log --oneline --all
git show 4dd5c471f42034f57809305a910d8c93890773da:index.html
git show c0c143657a82c1fda5a6253e419825b4df5bf8bc:tools/tables.py
```

For the old runnable bundle, create a separate directory so current work remains intact:

```powershell
git clone https://github.com/kira-sup/ksecure.dk.git ksecure-historical
cd ksecure-historical
git switch --detach c0c143657a82c1fda5a6253e419825b4df5bf8bc
```

Read its files before running commands. Detached mode is useful for inspection; create a named branch before making changes intended to keep. Avoid resetting the live branch to an old commit just to read an old file. For a bad published change, review a normal revert commit and redeploy through the existing publishing process. Verify production after recovery.

## Keep this memory current

After meaningful changes, update Architecture and the relevant operations/tool notes, add the reason and commit link to History, and record actual validation. To create a new complete snapshot:

1. Choose a committed source baseline; record its full commit SHA and date.
2. Enumerate all tracked files at that commit with `git ls-tree -r --long <commit>`.
3. Read each text file with `git show <commit>:<path>` and place its full contents in a sufficiently long Markdown code fence. Include dotfiles and record empty files explicitly. Preserve the source rather than reformatting it.
4. Index binary files with immutable source links, byte sizes and blob hashes. Preserve those files in Git or a separate backup; a text manifest is not their byte-level backup.
5. Verify each copied text payload by computing its Git blob hash: SHA-1 of the bytes `blob `, decimal UTF-8 byte length, a zero byte, then the original file bytes. Compare with Git's recorded object ID.
6. Check that every tracked baseline file appears once in the relevant appendix or binary inventory. Check every documentation link and review the resulting diff.

The published appendices are snapshots and intentionally do not include their own documentation commit recursively. Keep previous snapshot identifiers if replacing an appendix so readers know which state was preserved. For a complete repository backup, use a Git mirror, for example `git clone --mirror https://github.com/kira-sup/ksecure.dk.git ksecure-backup.git`, and store it independently. A mirror preserves Git objects and refs; it does not capture Pages settings, DNS, account permissions or hosting-provider state.
